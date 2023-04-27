export type Route = {
    name: string;
    path: string;
}

const RouteTypes = new class {
    HOME_PAGE: Route = {
        name: "Home",
        path: ""
    };

    DASHBOARD: Route = {
        name: "Dashboard",
        path: "/dashboard"
    };

    LOGIN: Route = {
        name: "Login",
        path: "/login"
    }
}

export {RouteTypes};
