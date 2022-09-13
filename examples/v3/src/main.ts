import { createApp } from "vue";
import App from "./App.vue";
import MsbUiLab from "../../../dist/v3/msb-ui.es";
import "../../../dist/v3/style.css";
createApp(App).use(MsbUiLab).mount("#app");
