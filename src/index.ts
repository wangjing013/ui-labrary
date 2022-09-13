import Live from "./components/Live/index";
import Button from "./components/Button/index";

export { Live, Button };
export default {
  install(Vue: any) {
    Vue.use(Live);
    Vue.use(Button);
  },
};
