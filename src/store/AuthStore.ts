import { defineStore } from 'pinia';
import AuthenticationToken from "@/api/records/AuthenticationToken";

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthenticationToken => ({
        accessToken: null,
        refreshToken: null
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.accessToken && !!this.refreshToken;
        },
        getAccessToken(): string | null {
            return this.accessToken;
        }
    },
    actions: {
        setToken(accesToken: string, refreshToken: string) {
            this.accessToken = accesToken;
            this.refreshToken = refreshToken;

            localStorage.setItem("accessToken", accesToken);
            localStorage.setItem("refreshToken", refreshToken);

            console.log("set token", localStorage.getItem("accessToken"), " : ", localStorage.getItem("refreshToken"));
        },
        setTokenFromAuth(authenticationToken: AuthenticationToken) {

            const accesToken = authenticationToken.accessToken as string;
            const refreshToken = authenticationToken.refreshToken as string;

            this.setToken(accesToken, refreshToken);
        },
        resetToken() {
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
});