import Vue from "vue";
import Vuex from "vuex";
import subscriptions from "./modules/subscriptions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    subscriptions,
  },
});
