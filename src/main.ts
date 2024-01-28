import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/router.ts";
import vuetify from "./plugins/vuetify.ts";
import Vue3Toastify from "vue3-toastify";
import "normalize.css";
import "./style.css";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(Vue3Toastify);
app.use(router);
app.use(vuetify);
app.mount("#app");
