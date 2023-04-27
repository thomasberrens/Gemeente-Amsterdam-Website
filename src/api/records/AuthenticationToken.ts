class AuthenticationToken {
    accessToken: string | null;
    refreshToken: string | null;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export default AuthenticationToken;