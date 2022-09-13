import Vue from "vue";
import App from "./App.vue";
import { Live } from "../../../dist/v2/msb-ui.es";
Vue.config.productionTip = false;
Vue.use(Live);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
