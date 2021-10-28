<template>
  <div class="change-item-modal">
    <form
      class="change-item__form"
      ref="changeItemForm"
      name="change-item-form"
    >
      <div class="close-modal__button" @click.prevent="closeModal">
        <font-awesome-icon icon="times" />
      </div>
      <div class="change-form__header">
        <h3>Change service data</h3>
      </div>
      <div class="change-form__body">
        <div class="change-form-item service-name">
          <label>Name</label>
          <input
            class="change-form__input"
            type="text"
            v-model="changeForm.serviceName"
          />
        </div>
        <div class="change-form-item service-price">
          <label>Price</label>
          <input
            class="change-form__input"
            type="number"
            v-model="changeForm.servicePrice"
          />
        </div>
        <div class="change-form-item service-date">
          <label>Date</label>
          <input
            class="change-form__input"
            type="number"
            v-model="changeForm.serviceDate"
          />
        </div>
      </div>
      <div class="change-form__footer btn-field">
        <button @click.prevent="onSubmit">
          <font-awesome-icon icon="check" />
        </button>
        <button @click.prevent="resetForm">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </form>
    <div v-show="isShowErr" class="form-error">Oops something went wrong</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import validation from "../plugins/validations";

export default {
  name: "ChangeItem",
  props: {
    itemToChange: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data: () => ({
    changeForm: {
      serviceName: "",
      servicePrice: 0,
      serviceDate: 0,
    },
    isShowErr: false,
  }),
  computed: {
    ...mapGetters("subscriptions", ["subsData"]),
  },
  methods: {
    ...mapActions("subscriptions", ["changeDataItem"]),
    closeModal() {
      this.$emit("closeModal", false);
    },
    onSubmit() {
      // const newObj = { ...this.changeForm };
      const isValid = this.checkValidation(this.changeForm);
      if (isValid) {
        let index = this.subsData.indexOf(this.itemToChange);
        this.changeDataItem({ ...this.changeForm, index });
        this.closeModal();
        this.resetForm();
      } else {
        this.isShowErr = true;
        setTimeout(() => {
          this.isShowErr = false;
        }, 5000);
      }
    },
    resetForm() {
      this.$refs.changeItemForm.reset();
      Object.keys(this.changeItemForm).forEach((key) => {
        if (typeof this.changeItemForm[key] === "number")
          this.changeItemForm[key] = 0;
        else this.changeItemForm[key] = "";
      });
    },
    checkValidation(form) {
      let validate = true;
      Object.keys(form).forEach((key) => {
        if (
          validate &&
          key === "servicePrice" &&
          +form[key] !== 0 &&
          !(+form[key] <= 0)
        ) {
          validate = validation.numberF.test(form[key]);
        } else if (validate && key === "servicePrice" && +form[key] === 0) {
          validate = false;
        } else if (
          validate &&
          key === "serviceName" &&
          form[key].length !== 0
        ) {
          let length = form[key].split("").length;
          validate = length > 20 ? false : true;
        } else if (validate && key === "bgColor") {
          validate = true;
        } else if (
          validate &&
          key === "serviceDate" &&
          Math.floor(form[key]) <= 31 &&
          Math.floor(form[key]) != 0
        ) {
          validate = validation.number.test(form[key]);
        } else {
          validate = false;
        }
      });

      return validate;
    },
  },
};
</script>

<style scoped>
.change-item-modal {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.change-item__form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  background-color: #fff;
  max-width: 400px;
  width: 100%;
}
.change-form__header {
  border-bottom: 2px solid #000;
  width: 100%;
  text-align: center;
  padding: 0px 0px 10px;
}
.change-form__body {
  padding: 20px;
}
.change-form-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 500;
}
.change-form-item + .change-form-item {
  margin-top: 10px;
}
.change-form__input {
  border: 2px solid #000;
  border-radius: 10px;
  padding: 4px 10px;
}
.change-form__footer button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
  transition: all 0.3s ease;
  margin-left: 0px;
}
.change-form__footer button + button {
  margin-left: 5px;
}
.change-form__footer button:hover {
  background-color: #000;
  color: #fff;
}
@media screen and (max-width: 425px) {
  .change-item__form {
    margin: 0px 10px;
    padding: 20px 20px;
  }
  .change-form-item input {
    max-width: 160px;
    padding: 4px 10px;
    border: 2px solid #000;
    font-size: 11px;
  }
  .change-form__footer button {
    margin: 0px 5px;
    padding: 13px 23px;
  }
  .change-form__body {
    padding: 10px 10px 15px;
  }
}
</style>
<style>
.close-modal__button {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px;
}
</style>
