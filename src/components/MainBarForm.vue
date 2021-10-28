<template>
  <form class="main-form" ref="mainForm">
    <div class="service-form-field form-field">
      <VSwatches v-model="mainForm.bgColor" class="color-picker" />
      <div class="service-wrapper">
        <label>Service</label>
        <input
          v-model.trim="mainForm.serviceName"
          type="text"
          name="service-field"
          class="service-field from-input-field"
          autocomplete="off"
          placeholder="Enter service"
        />
      </div>
    </div>
    <div class="form-field">
      <label
        >Price <br />
        (USD/Month)</label
      >
      <input
        v-model.number="mainForm.servicePrice"
        type="number"
        name="price-field"
        class="price-field from-input-field"
        placeholder="0"
      />
    </div>
    <div class="form-field payment-form-field">
      <div class="payment-wrapper">
        <label for="payment-field"
          >Day of <br />
          the payment</label
        >
        <input
          placeholder="0"
          v-model.number="mainForm.serviceDate"
          type="number"
          name="payment-field"
          class="payment-field from-input-field"
        />
      </div>
      <div class="btn-field">
        <button @click.prevent="onSubmit">
          <font-awesome-icon icon="check" />
        </button>
        <button @click.prevent="resetForm">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>
    <div v-show="isShowErr" class="form-error">Oops something went wrong</div>
  </form>
</template>

<script>
import VSwatches from "vue-swatches";
import validation from "../plugins/validations";
// Import the styles too, globally
import "vue-swatches/dist/vue-swatches.css";
export default {
  components: {
    VSwatches,
  },
  data: () => ({
    mainForm: {
      bgColor: "",
      serviceName: "",
      servicePrice: 0,
      serviceDate: 0,
    },
    isShowErr: false,
  }),
  computed: {},
  methods: {
    onSubmit() {
      let isValid = this.checkValidation(this.mainForm);
      if (isValid) {
        this.$emit("onSubmitHandler", { ...this.mainForm });
        this.resetForm();
      } else {
        this.isShowErr = true;
        setTimeout(() => {
          this.isShowErr = false;
        }, 5000);
      }
    },
    resetForm() {
      this.$refs.mainForm.reset();
      Object.keys(this.mainForm).forEach((key) => {
        if (typeof this.mainForm[key] === "number") this.mainForm[key] = 0;
        else this.mainForm[key] = "";
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
.main-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 20px 20px;
  border-bottom: 1px solid #bdd1ff;
  min-width: fit-content;
}
.form-field {
  flex: 0 1 33.333%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  margin-right: 10px;
}
.form-field:last-child {
  margin-right: 0px !important;
}
.form-field label {
  margin: 0px 0px 5px 0px;
}
.service-form-field {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: row;
}
.service-wrapper {
  text-align: left;
}
.from-input-field {
  display: block;
  max-width: 100px;
  border: 1px solid #cfdcfd;
  border-radius: 5px;
  padding: 5px 10px;
}
.from-input-field:focus {
  outline-color: #bdd1ff;
}
.service-field {
  width: 100%;
  max-width: 80%;
  min-width: 120px;
}
.payment-form-field {
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
  margin-right: 0 !important;
}
.color-picker {
  margin: 0;
  padding: 0;
}
.color-picker >>> .vue-swatches__trigger__wrapper {
  display: block;
  margin-right: 10px;
}
@media screen and (max-width: 1024px) {
  .main-form {
    padding: 20px 20px 20px;
  }
  .form-field:last-child {
    margin-right: 0px;
  }
  .form-field {
    margin-right: 5px;
  }
  .form-field label {
    margin: 0px 0px 5px 0px;
    font-size: 15px;
    line-height: 17px;
  }
  .service-wrapper {
    text-align: left;
  }
  .from-input-field {
    max-width: 100px;
    border-radius: 5px;
    padding: 4px 8px;
    font-size: 12px;
  }
  .color-picker >>> .vue-swatches__trigger__wrapper {
    margin-right: 5px;
  }
  .color-picker >>> .vue-swatches__trigger {
    width: 37px !important;
    height: 37px !important;
  }
}
@media screen and (max-width: 768px) {
  .main-form {
    padding: 20px 10px 20px;
  }
}
@media screen and (max-width: 575px) {
  .main-form {
    padding: 10px 10px;
  }
  .form-field label {
    margin: 0px 0px 5px 0px;
    font-size: 13px;
    line-height: 15px;
  }
  .from-input-field {
    font-size: 12px;
    min-width: auto;
  }
}
@media screen and (max-width: 425px) {
  .main-form {
    flex-direction: column;
    align-items: center;
  }
  .form-field label {
    margin: 0px 0px 5px 0px;
    font-size: 13px;
    line-height: 15px;
  }
  .from-input-field {
    font-size: 13px;
    min-width: auto;
    width: 100%;
    margin-bottom: 10px;
  }
  .form-field {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0px 0px 0px 0px;
  }
  .service-wrapper {
    text-align: center;
  }
  .from-input-field {
    text-align: center;
    min-width: 200px;
  }
  .color-picker >>> .vue-swatches__trigger {
    width: 40px !important;
    height: 40px !important;
  }
  .color-picker >>> .vue-swatches__container {
    inset: 45px -70px auto auto !important;
  }
}
</style>
<style>
.btn-field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.btn-field button {
  display: inline-block;
  font-size: 9px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #bdd1ff;
  color: #fff;
  background-color: #0a0b1f;
}
.btn-field button {
  margin-left: 15px;
}
.btn-field button + button {
  margin-left: 5px;
}
.form-error {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
  font-weight: 500;
  border: 1px solid #eee;
  color: rgb(255, 125, 125);
}

@media screen and (max-width: 575px) {
  .btn-field button {
    margin-left: 5px;
  }
}

@media screen and (max-width: 1024px) {
  .form-error {
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 15px;
  }
}
</style>
