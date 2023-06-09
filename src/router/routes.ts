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
    path: RouteTypes.GAME.path,
    name: RouteTypes.GAME.name,
    component: () => import("@/views/game/GameView.vue"),
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
  },
  {
    path: RouteTypes.PLAYER.path,
    name: RouteTypes.PLAYER.name,
    component: () => import("@/views/PlayerView.vue"),
    meta: {
        auth: true
    }
  }
]
