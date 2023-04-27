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
  {
    path: RouteTypes.DASHBOARD.path,
    name: RouteTypes.DASHBOARD.name,
    component: () => import("@/views/DashboardView.vue"),
    meta: {
        auth: true
    }
  },
  {
    path: RouteTypes.LOGIN.path,
    name: RouteTypes.LOGIN.name,
    component: () => import("@/views/LoginView.vue"),
    meta: {
        auth: false
    }
  }
]
