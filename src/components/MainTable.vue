<template>
  <ul class="main-table">
    <li class="main-table-child" v-for="item in subsData" :key="item.id">
      <MainTableItem @onDeleteItem="deleteItem" :item="item" />
    </li>
  </ul>
</template>

<script>
import MainTableItem from "./MainTableItem.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainTable",
  components: {
    MainTableItem,
  },
  props: {
    dataItems: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters("subscriptions", ["subsData"]),
    getSubsData() {
      return this.subsData ? this.subsData : {};
    },
  },
  methods: {
    ...mapActions("subscriptions", ["deleteService"]),
    deleteItem(item) {
      const index = this.subsData.indexOf(item);
      this.deleteService(index);
    },
  },
};
</script>

<style scoped>
.main-table {
  padding: 0;
  list-style: none;
}
.main-table-child {
  border-radius: 15px;
  transition: all 0.2s ease-in;
  padding: 10px 20px;
}
.main-table-child:nth-child(even) {
  background-color: #dde5fa;
}
.main-table-child:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.main-table-child:hover >>> .btn-field {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .main-table-child {
    padding: 10px 10px;
  }
}
</style>
