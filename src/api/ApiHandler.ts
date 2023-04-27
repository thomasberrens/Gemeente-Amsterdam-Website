import axios, {AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from "axios";
import ApiRoutes from "@/api/ApiRoutes";
import Choice from "@/api/records/Choice";
import AuthenticationToken from "@/api/records/AuthenticationToken";
import {useAuthStore} from "@/store/AuthStore";

interface UrlParameter {
    name: string;
    value: any
}

const urlEncodedHeader = 'application/x-www-form-urlencoded';
const jsonHeader = 'application/json';

const ApiHandler = new class {
    constructor() {
        axios.interceptors.request.use(
            async config => {
                if (!config.headers)
                    config.headers = this.createContentTypeRequestHeader(true);

                if (!config.headers['Accept'])
                    config.headers['Accept'] = 'application/json';

                config.headers['Access-Control-Allow-Origin'] = '*';

                const authStore = useAuthStore();

                if (authStore.isAuthenticated)
                    config.headers['Authorization'] = `Bearer ${authStore.getAccessToken}`;

                return config;
            }
        )
    }

    private createContentTypeRequestHeader(urlEncoded = false): AxiosRequestHeaders {
        return {
            "Content-Type": urlEncoded ? urlEncodedHeader : jsonHeader,
        };
    }

    public async getChoicesMade(): Promise<Choice[]> {
        return this.sendGetRequest<Choice[]>(ApiRoutes.GET_ALL_CHOICES)
    }

    async postLogin(email: string, password: string): Promise<AuthenticationToken> {
        return this.sendPostRequest<AuthenticationToken>(ApiRoutes.LOGIN,{username: email, password: password}, true);
    }

    public async getAllUsersChoicesMade(): Promise<Map<string, Choice[]>> {
        return this.sendGetRequest<Map<string, Choice[]>>(ApiRoutes.GET_ALL_USERS_CHOICES)
    }

    public async handleAuthentication(onSuccesfull: any, onError: any): Promise<void> {
        const authStore = useAuthStore();

        const isAuthorized = authStore.isAuthenticated;

        const localStorageToken = localStorage.getItem('accessToken');
        const localStorageRefreshToken = localStorage.getItem('refreshToken');

        const hasLocalAccesTokens = localStorageToken && localStorageRefreshToken;

        console.log("going to check auth: " + localStorageToken + " : " + localStorageRefreshToken);

        if (!isAuthorized && hasLocalAccesTokens) {
            authStore.setTokenFromAuth(new AuthenticationToken(localStorageToken, localStorageRefreshToken));
            console.log("no auth but has local tokens")

            this.refreshTokens().then((response) => {
                authStore.setTokenFromAuth(response);
                onSuccesfull();
            }).catch((error) => {
                authStore.resetToken();
                onError();
            });
        } else if (isAuthorized) {
            this.refreshTokens().then((response) => {
                authStore.setTokenFromAuth(response);
                onSuccesfull();
            }).catch((error) => {
                authStore.resetToken();
                onError();
            });
        } else if (!isAuthorized && !hasLocalAccesTokens) {

            console.log("no auth and no local tokens")
            onError();
        }
    }

    public async refreshTokens(): Promise<AuthenticationToken> {
        return this.sendGetRequest<AuthenticationToken>(ApiRoutes.REFRESH_TOKEN);
    }

    public async sendPostRequest<R = void, D = any>(route: string, data?: D, urlEncoded = false): Promise<R> {
        const response = await axios.post(this.getBaseUrl() + route, data, { headers: this.createContentTypeRequestHeader(urlEncoded) })
        return Promise.resolve(response.data);
    }

    public async sendGetRequest<T = any>(route: string, parameters?: UrlParameter[]): Promise<T> {
        const response = await this.sendGetRequestWithResponse(route, parameters)
        return Promise.resolve(response.data);
    }

    protected async sendGetRequestWithResponse<T = any>(route: string, parameters?: UrlParameter[], config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const parametersUrl = parameters?.map(parameter => parameter.name + "=" + parameter.value)?.join("&")
        const response = await axios.get(this.getBaseUrl() + route + (!!parametersUrl ? "?" + parametersUrl : ""), config)
        return Promise.resolve(response);
    }




    public getBaseUrl () {
        return "http://localhost:8080/"
    }
}

export default ApiHandler