import { createApp } from 'vue/dist/vue.esm-bundler';
import { createRouter, createWebHistory } from "vue-router";
import App from "./src/App.vue";
import Home from "./src/Home.vue";
import Salt from "./src/Salt.vue";
import TheCity from "./src/TheCity.vue";
import EventHorizon from "./src/EventHorizon.vue";
import Worship from "./src/Worship.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/salt', component: Salt },
    { path: '/the-city', component: TheCity },
    { path: '/event-horizon', component: EventHorizon },
    { path: '/worship', component: Worship },
  ]
})

const app = createApp(App);
app.use(router)

app.mount("#app");
