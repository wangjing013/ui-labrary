import Live from "./components/Live/index.js";
import Button from "./components/Button/index.js";

export { Live, Button };
export default {
  install(Vue: any) {
    Vue.use(Live);
    Vue.use(Button);
  },
};
