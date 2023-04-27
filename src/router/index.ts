import {createRouter, createWebHashHistory} from 'vue-router'
import routes from "@/router/routes";
const router = createRouter({
  history: createWebHashHistory('gemeente-amsterdam'),
  routes,
})



export default router
