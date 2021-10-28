<template>
  <div class="side-bar" :class="toggleBMInstance">
    <div class="side-bar-header">
      <div class="user_wrapper">
        <div class="user-avatar"></div>
        <h3 class="user-name">{{ getUserName }}</h3>
      </div>
      <div class="burger-close" @click="onCloseBM">
        <font-awesome-icon icon="times" />
      </div>
    </div>
    <div class="user-balance">
      <div class="user-profit-wrapper user-balance-wrapper">
        <h3>Your Profit</h3>
        <h1 class="user-profit">{{ getUsersProfit }}</h1>
        <h3>USD/Month</h3>
      </div>
      <div class="user-spend-wrapper user-balance-wrapper">
        <h3>Subscription</h3>
        <h1 class="user-spend">{{ getUsersSpend }}</h1>
        <h3>USD/Month</h3>
      </div>
    </div>
    <div class="sidebar-footer">
      <SidebarCircle :spend="getUsersSpend" :profit="getUsersProfit" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SidebarCircle from "./SidebarCircle.vue";
export default {
  name: "SideBar",
  props: {
    toggleBM: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SidebarCircle,
  },
  computed: {
    ...mapGetters("subscriptions", ["subsData", "user"]),
    getUserName() {
      let name = "User";
      if (this.user.userName) {
        name =
          this.user.userName[0].toUpperCase() + this.user.userName.slice(1);
      }
      return name;
    },
    getUsersProfit() {
      let profit = 0;
      if (this.user.userProfit) {
        profit = this.user.userProfit;
      }
      return +profit;
    },
    getUsersSpend() {
      let total = 0;
      if (this.subsData.length != 0) {
        total = this.subsData.reduce((acc, prev) => {
          return (acc += prev.servicePrice);
        }, 0);
      }
      return +total.toFixed(2);
    },
    toggleBMInstance() {
      return this.toggleBM ? "active" : "";
    },
  },
  methods: {
    onCloseBM() {
      this.$emit("onCloseBM", false);
    },
  },
};
</script>

<style scoped>
.some-obj {
  width: 100px;
  height: 100px;
  position: relative;
  border: 4px solid transparent;
  border-radius: 50%;
  background-color: #e8edfb;
  background-clip: padding-box;
  padding: 10px;
}
.some-obj::after {
  position: absolute;
  top: -4px;
  bottom: -4px;
  left: -4px;
  right: -4px;
  background: linear-gradient(
    90deg,
    rgba(255, 139, 0, 1) 50%,
    rgba(0, 212, 255, 1) 50%
  );
  content: "";
  z-index: -1;

  border-radius: 50%;
}

.side-bar {
  max-width: 25%;
  width: 100%;
  border-left: 1px solid #bdd1ff;
  padding: 0px 0px 0px 20px;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.side-bar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-balance {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}
.user-balance-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.user-balance-wrapper + .user-balance-wrapper {
  margin-top: 20px;
}
.side-bar-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-footer >>> .ep-container {
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
}
.sidebar-footer >>> .ep-legend--value {
  font-weight: 500;
  font-size: 20px;
}
.burger-close {
  display: none;
}
.user-name {
  max-width: 200px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.user-profit,
.user-spend {
  max-width: 130px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@media screen and (max-width: 1024px) {
  .side-bar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translateX(100%);
    background-color: #fff;
    border: none;
    padding: 20px 20px;
    transition: transform 0.3s ease-in;
    min-width: fit-content;
    max-width: 320px;
    width: auto;
    overflow-y: scroll;
  }
  .side-bar.active {
    transform: translateX(0%);
  }
  .burger-close {
    display: block;
  }
  .user-balance h3 {
    font-size: 17px;
  }
  .user-balance h1 {
    font-size: 25px;
  }
  .side-bar-header .user_wrapper {
    font-size: 14px;
  }
}
</style>
