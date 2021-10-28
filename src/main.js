import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/fontawesome/index";
import "./plugins/colorPicker/index";
import "./plugins/circleProgress/index";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
