import {RouteTypes} from "@/router/RouteTypes";

export default [
  {
    path: RouteTypes.HOME_PAGE.path,
    name: RouteTypes.HOME_PAGE.name,
    component: () => import("@/views/HomeView.vue"),
    meta: {
      auth: false
    }
  },
]
