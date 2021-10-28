<template>
  <div class="main-table-item">
    <ChangeItem
      v-show="isShowCM"
      @closeModal="toggleCM"
      :itemToChange="itemToChange"
    />
    <div class="service-name-wrapper table-item">
      <div class="service-name-capital" :style="getCapitalColor">
        <h1>
          {{ getFirstLetter }}
        </h1>
      </div>
      <h3 class="service-name">
        {{ getServiceName }}
      </h3>
    </div>
    <div class="service-price table-item">
      <h3>$ {{ item.servicePrice.toFixed(2) }}</h3>
    </div>
    <div class="service-date table-item">
      <h3>{{ item.serviceDate }}th</h3>
      <div class="btn-field form-field">
        <button @click.prevent="changeItem(item)">
          <font-awesome-icon icon="pen" />
        </button>
        <button @click.prevent="deleteDataItem(item)">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeItem from "./ChangeItem.vue";
// import α from "color-alpha";
export default {
  name: "MainTableItem",
  components: {
    ChangeItem,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    isShowCM: false,
    itemToChange: {},
  }),
  computed: {
    getFirstLetter() {
      const mainTable = document.querySelector(".main-table");
      return this.item.serviceName
        ? this.item.serviceName[0].toUpperCase()
        : mainTable.children.length + 1;
    },
    getCapitalColor() {
      return this.item.bgColor
        ? {
            "background-color": this.item.bgColor,
            color: "rgba(255, 255, 255, 0.8)",
          }
        : "background-color: #cfdcfd";
    },
    getServiceName() {
      return this.item.serviceName
        ? this.getFirstLetter + this.item.serviceName.slice(1)
        : "Unnamed service";
    },
  },
  methods: {
    deleteDataItem(item) {
      this.$emit("onDeleteItem", item);
    },
    changeItem(item) {
      this.toggleCM(true);
      this.itemToChange = item;
    },
    toggleCM(bool) {
      this.isShowCM = bool;
    },
  },
};
</script>

<style scoped>
.main-table-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table-item {
  flex: 0 1 33.333%;
  max-width: 300px;
  min-width: 120px;
  text-overflow: ellipsis;
}
.service-price {
  text-align: center;
}
.service-date {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.service-name-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}
.service-name-wrapper h1 {
  margin: 0;
}
.service-name-capital {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  min-width: 40px;
  height: 40px;
  text-align: center;
  line-height: 20px;
}
.service-name {
  margin-left: 10px;
  max-width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.btn-field {
  transition: opacity 0.2s ease-in;
  opacity: 0;
}
.service-price h3 {
  margin: 0 auto;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media screen and (max-width: 768px) {
  .service-name-capital {
    font-size: 13px;
  }
  .main-table-item h3 {
    font-size: 16px;
  }
}
@media screen and (max-width: 425px) {
  .service-name-capital {
    min-width: 35px;
    height: 35px;
    line-height: 15px;
    font-size: 12px;
  }
  .main-table-item h3 {
    font-size: 16px;
  }
  .service-name {
    margin-left: 5px;
  }
  .table-item {
    max-width: auto;
    min-width: auto;
    text-overflow: ellipsis;
  }
  .service-name {
    max-width: 70px;
  }

  .btn-field {
    opacity: 1;
  }
}
@media screen and (max-width: 375px) {
  .service-name-capital {
    display: none;
  }
  .service-name {
    max-width: 80px;
  }
}
</style>
