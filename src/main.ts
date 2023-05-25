import { createApp } from 'vue'
import App from "@/views/App.vue";
import router from '@/router'
import {createPinia} from "pinia";
import {RouteTypes} from "@/router/RouteTypes";
import ApiHandler from "@/api/ApiHandler";

const pinia = createPinia();

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')


router.beforeEach((to, from, next) => {

    if (to.meta.auth) {
        const onSuccesfullAuth = () => {
            console.log("succesfull auth")
            next();
        }

        const onFailedAuth = () => {
            next({name: RouteTypes.LOGIN.name});
        }

        ApiHandler.handleAuthentication(onSuccesfullAuth, onFailedAuth);
        return;
    }

    if (to.name === RouteTypes.HOME_PAGE.name) {
        console.log("home page path")

        const onSuccesfullAuth = () => {
            console.log("succesfull auth home page")
            next();
        }

        const onFailedAuth = () => {
            next();
        }

        ApiHandler.handleAuthentication(onSuccesfullAuth, onFailedAuth);
        return;
    }

    next();

});