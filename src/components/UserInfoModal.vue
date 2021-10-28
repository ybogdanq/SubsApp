<template>
  <div class="user-modal">
    <form ref="userInfoForm" class="user-info-form">
      <div class="close-modal__button" @click.prevent="closeModal">
        <font-awesome-icon icon="times" />
      </div>
      <header class="user-form-header">
        <h3>User info</h3>
      </header>
      <main class="user-form-body">
        <div class="userinfo-name user-form-item">
          <label>Name</label>
          <input
            type="text"
            v-model="userInfoForm.userName"
            placeholder="Enter name"
          />
        </div>
        <div class="userinfo-profit user-form-item">
          <label>Profit (USD/Month)</label>
          <input
            type="number"
            v-model="userInfoForm.userProfit"
            placeholder="0"
          />
        </div>
        <div class="userinfo-gender user-form-item">
          <label>Gender</label>
          <select type="number" v-model="userInfoForm.userGender">
            <option disabled value="">Chose gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </main>
      <footer class="user-form-footer btn-field">
        <button @click.prevent="onSubmit">
          <font-awesome-icon icon="check" />
        </button>
        <button @click.prevent="resetForm">
          <font-awesome-icon icon="times" />
        </button>
      </footer>
      <h5 v-show="isShowErr" class="form-err">Oops something went wrong</h5>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import validation from "../plugins/validations";
export default {
  name: "UserInfoModal",
  data: () => ({
    isShow: true,
    isShowErr: false,
    userInfoForm: {
      userName: "",
      userProfit: 0,
      userGender: "",
    },
  }),
  computed: {
    ...mapGetters("subscriptions", ["user"]),
  },
  methods: {
    ...mapActions("subscriptions", ["changeUserInfo"]),
    closeModal() {
      if (Object.keys(this.user).length !== 0) {
        this.$emit("closeModal", false);
      }
    },
    onSubmit() {
      let isValidate = this.checkValidation();
      if (isValidate) {
        this.changeUserInfo(this.userInfoForm);
        this.$emit("closeModal", false);
        localStorage.setItem("user", JSON.stringify(this.userInfoForm));
        this.resetForm();
        this.isShowErr = false;
      } else {
        this.isShowErr = true;
      }
    },
    resetForm() {
      this.$refs.userInfoForm.reset();
      Object.keys(this.userInfoForm).forEach((key) => {
        if (typeof this.userInfoForm[key] === "number")
          this.userInfoForm[key] = 0;
        else this.userInfoForm[key] = "";
      });
    },
    checkValidation() {
      let validate = true;
      Object.keys(this.userInfoForm).forEach((key) => {
        if (validate && key === "userProfit" && +this.userInfoForm[key] !== 0) {
          validate = validation.number.test(this.userInfoForm[key]);
        } else if (
          validate &&
          key === "userProfit" &&
          +this.userInfoForm[key] === 0
        ) {
          validate = false;
        } else if (
          validate &&
          key === "userName" &&
          this.userInfoForm[key].length !== 0
        ) {
          validate = true;
        } else if (validate && key === "userGender") {
          validate = this.userInfoForm[key] ? true : false;
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
.add-button {
  color: rgba(0, 0, 0, 1);
}
.form-err {
  color: red;
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
}
.user-modal {
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
.user-info-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  background-color: #fff;
  max-width: 400px;
  width: 100%;
}
.user-form-header {
  width: 100%;
  border-bottom: 2px solid #000;
  padding: 0px 10px 10px;
}
.user-form-header {
  text-align: center;
}
.user-form-header h3 {
  font-weight: 500;
}
/* user-form-body user-form-item */
.user-form-body {
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
}
.user-form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  margin-bottom: 15px;
}
.user-form-item input,
select {
  width: 100%;
  max-width: 180px;
  border: 2px solid #000;
  border-radius: 7px;
  padding: 5px 10px;
  font-size: 13px;
}
.user-form-item input:focus {
  outline: none;
}
.user-form-footer button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 15px 25px;
  background-color: #fff;
  color: #000;
  transition: all 0.3s ease;
}
.user-form-footer button:hover {
  background-color: #000;
  color: #fff;
}
.user-form-footer button {
  margin: 0px 5px;
}
.user-form-footer {
  display: flex !important;
  align-items: center !important;
}
.user-form-item label {
  margin-bottom: 5px;
}

@media screen and (max-width: 768px) {
  .user-form-item label {
    font-size: 15px;
  }
}

@media screen and (max-width: 425px) {
  .user-info-form {
    margin: 0px 10px;
    padding: 10px 20px;
  }
  .user-form-item input,
  select {
    max-width: 160px;
    padding: 5px 10px;
    border: 2px solid #000;
    font-size: 11px;
  }
  .user-form-footer button {
    margin: 0px 5px;
    padding: 13px 20px;
  }
  .user-form-body {
    padding: 10px;
  }
  .userinfo-gender {
    margin-bottom: 10px;
  }
  .user-form-item label {
    font-size: 13px;
    margin-bottom: 3px;
  }
}
</style>
