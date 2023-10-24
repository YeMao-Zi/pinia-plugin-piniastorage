import { createApp } from "vue";
import { createPinia } from "pinia";
import { piniaStorage } from "../dist";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaStorage());
const app = createApp(App);
app.use(pinia);
app.mount("#app");
