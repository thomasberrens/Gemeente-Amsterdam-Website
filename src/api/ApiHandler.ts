import axios, {AxiosHeaders, AxiosRequestConfig, AxiosResponse} from "axios";
import ApiRoutes from "@/api/ApiRoutes";
import Choice from "@/api/records/Choice";

interface UrlParameter {
    name: string;
    value: any
}

const ApiHandler = new class {
    constructor() {
        axios.interceptors.request.use(
            async config => {
                config.headers = new AxiosHeaders({
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                })

                return config;
            })
    }

    public async getChoicesMade(): Promise<Choice[]> {
        return this.sendGetRequest<Choice[]>(ApiRoutes.GET_ALL_CHOICES)
    }

    public async getAllUsersChoicesMade(): Promise<Map<string, Choice[]>> {
        return this.sendGetRequest<Map<string, Choice[]>>(ApiRoutes.GET_ALL_USERS_CHOICES)
    }

    public async sendPostRequest<R = void, D = any>(route: string, data?: D): Promise<R> {
        const response = await axios.post(this.getBaseUrl() + route, data)
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