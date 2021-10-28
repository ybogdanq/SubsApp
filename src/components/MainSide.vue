<template>
  <div class="main-bar">
    <header class="main-bar__header header">
      <h1>Subscriptions</h1>
      <button class="ml-a add-button" @click.prevent="changeUserInfo">
        <font-awesome-icon icon="user-cog" />
        User info
      </button>
      <div class="header__burger" @click="onBurgerClick">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <MainBarForm @onSubmitHandler="onSubmitEvent" />
    <MainTable :dataItems="pushServiceData"></MainTable>
  </div>
</template>

<script>
import MainTable from "./MainTable.vue";
import MainBarForm from "./MainBarForm.vue";
import { mapActions } from "vuex";

export default {
  data: () => ({
    serviceData: [],
  }),
  components: {
    MainBarForm,
    MainTable,
  },
  methods: {
    ...mapActions("subscriptions", ["addService"]),
    onSubmitEvent(data) {
      this.addService(data);
    },
    changeUserInfo() {
      this.$emit("showModal", true);
    },
    onBurgerClick() {
      this.$emit("toggleBurgerMenu", true);
    },
  },
  computed: {
    pushServiceData() {
      return this.serviceData ? this.serviceData : [];
    },
  },
};
</script>

<style scoped>
.main-bar {
  max-width: 65%;
  width: 100%;
}
.header {
  margin-bottom: 10px;
}
.header .add-button {
  border: 1px solid #cfdcfd;
  border-radius: 5px;
  background-color: #fff;
  padding: 6px 13px;
  font-size: 15px;
}
.main-bar__header {
  display: flex;
  align-items: center;
}
.header__burger span {
  display: block;
  width: 20px;
  height: 3px;
  background-color: #000;
  margin: 3px 0px;
}
.header__burger {
  display: none;
  padding: 10px 0px 10px 10px;
}

@media screen and (max-width: 1024px) {
  .header__burger {
    display: block;
  }
  .main-bar {
    max-width: 100%;
  }
  .main-bar__header h1 {
    font-size: 26px;
  }
  .header .add-button {
    border-radius: 5px;
    padding: 5px 13px;
    font-size: 13px;
  }
}
@media screen and (max-width: 768px) {
  .main-bar__header h1 {
    font-size: 23px;
  }
  .header .add-button {
    border-radius: 5px;
    padding: 5px 11px;
    font-size: 12px;
  }
}
</style>
