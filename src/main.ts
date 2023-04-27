import { createApp } from 'vue'
import HomeView from "@/views/HomeView.vue";
import router from '@/router'

const app = createApp(HomeView)

app.use(router)

app.mount('#app')