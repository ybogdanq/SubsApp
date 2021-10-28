<template>
  <div id="app">
    <UserInfoModal v-show="isShowen" @closeModal="changeModalInstance" />
    <MainSide @toggleBurgerMenu="onToggleBM" @showModal="changeModalInstance" />
    <SideBar :toggleBM="toggleBM" @onCloseBM="onCloseBM" />
  </div>
</template>

<script>
import MainSide from "./components/MainSide.vue";
import SideBar from "./components/SideBar.vue";
import UserInfoModal from "./components/UserInfoModal.vue";
export default {
  name: "App",
  components: {
    MainSide,
    SideBar,
    UserInfoModal,
  },
  data: () => ({
    isShowen: JSON.parse(localStorage.getItem("user")) ? false : true,
    toggleBM: false,
    toggleCM: false,
  }),
  methods: {
    changeModalInstance(bool) {
      this.isShowen = bool;
    },
    onToggleBM(bool) {
      this.toggleBM = bool;
    },
    onCloseBM(bool) {
      this.toggleBM = bool;
    },
    onToggleCM({ bool, id }) {
      this.toggleCM = bool;
      console.log(id);
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #e8edfb;
  min-height: 100vh;
}
#app {
  padding: 20px 50px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.mr-a {
  margin-right: auto;
}
.ml-a {
  margin-left: auto;
}
.mx-a {
  margin: 0 auto;
}

@media screen and (max-width: 1024px) {
  #app {
    padding: 20px 20px;
  }
}
@media screen and (max-width: 575px) {
  #app {
    padding: 15px 15px;
  }
}
input,
select {
  outline: none;
}
</style>
