import mutations from "../mutations";
import Vue from "vue";

const { ADD_DATA, DELETE_DATA, CHANGE_USER, CHANGE_SERVICE_DATA } = mutations;

const subscriptions = {
  namespaced: true,
  state: {
    subsData: JSON.parse(localStorage.getItem("subsData"))
      ? JSON.parse(localStorage.getItem("subsData"))
      : [],
    user: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {},
  },
  getters: {
    subsData: ({ subsData }) => subsData,
    user: ({ user }) => user,
  },
  mutations: {
    [ADD_DATA]({ subsData }, data) {
      const newObj = {
        id: Math.floor(Math.random() * 100000),
        ...data,
      };
      Vue.set(subsData, subsData.length, newObj);
      localStorage.setItem("subsData", JSON.stringify(subsData));
    },
    [DELETE_DATA]({ subsData }, id) {
      subsData.splice(id, 1);
      localStorage.setItem("subsData", JSON.stringify(subsData));
    },
    [CHANGE_USER](state, info) {
      state.user = { ...info };
    },
    [CHANGE_SERVICE_DATA]({ subsData }, item) {
      // const previousId = subsData[item.index].id;
      const previousBG = subsData[item.index].bgColor;

      const newObj = {
        id: Math.floor(Math.random() * 10000),
        bgColor: previousBG,
        serviceName: item.serviceName,
        servicePrice: +item.servicePrice,
        serviceDate: +item.serviceDate,
      };
      Vue.set(subsData, item.index, newObj);
      localStorage.setItem("subsData", JSON.stringify(subsData));
    },
  },
  actions: {
    addService(store, data) {
      store.commit(ADD_DATA, data);
    },
    deleteService({ commit }, id) {
      commit(DELETE_DATA, id);
    },
    changeUserInfo({ commit }, info) {
      commit(CHANGE_USER, info);
    },
    changeDataItem({ commit }, item) {
      commit(CHANGE_SERVICE_DATA, item);
    },
  },
};
export default subscriptions;
