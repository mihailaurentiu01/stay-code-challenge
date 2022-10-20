import { createApp } from "vue";
import { createPinia } from "pinia";

// libs
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "./lang/i18n";
import helpers from "./js/helpers";

import App from "./App.vue";
import "./assets/main.css";

import router from "./js/routes";

const app = createApp(App);

app.provide("$helpers", helpers);

app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.use(i18n);

app.mount("#app");
