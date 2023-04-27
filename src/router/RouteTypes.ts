export type Route = {
    name: string;
    path: string;
}

const RouteTypes = new class {
    HOME_PAGE: Route = {
        name: "Home",
        path: ""
    };
}

export {RouteTypes};
