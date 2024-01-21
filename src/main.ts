import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.ts";
import vuetify from "./plugins/vuetify.ts";
import "normalize.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(Vue3Toastify);
app.use(router);
app.use(vuetify);
app.mount("#app");
