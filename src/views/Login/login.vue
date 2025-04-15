<template>
  <div class="loginView">
    <div class="title">Login</div>
    <el-form
      ref="elFormRef"
      :model="formData"
      :rules="rules"
      label-width="0px"
      label-position="top"
    >
      <div class="phone">
        <el-form-item prop="username" label="Username">
          <el-input
            v-model.number="formData.username"
            placeholder="Please enter your account number"
            clearable
            prefix-icon="el-icon-user-solid"
            :style="{ width: '100%' }"
          >
            <!-- <template #prefix>+86</template> -->
          </el-input>
        </el-form-item>
      </div>
      <el-form-item prop="password" label="Password">
        <div class="password">
          <el-input
            v-model="formData.password"
            placeholder="Please enter your password"
            type="password"
            clearable
            prefix-icon="el-icon-key"
            :style="{ width: '100%' }"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="checkout">
          <el-checkbox v-model="remember" label="Remember" />
          <span>
            <a>Forget password</a>?&nbsp;/&nbsp;
            <a @click="goRegister">Register</a>
          </span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" round @click="submitForm"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
    <!-- <div class="bottom">
      <a @click="goRegister">create account</a>
      <a>forgotten password</a>
    </div> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../../store/user.ts";
import user from "../../api/user.js";
import { ElNotification } from "element-plus";
const router = useRouter();
const route = useRoute();
const remember = ref(false);
const elFormRef = ref();
const formData = ref({
  username: "",
  password: "",
});
console.log(typeof route.query.email);
formData.value.username = route.query.email !== "null" ? route.query.email : "";
console.log(route.query, "route.query.email");
const rules = ref({
  username: [
    {
      required: true,
      message: "username is required",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "username is required",
      trigger: "blur",
    },
  ],
});
const goRegister = () => {
  router.push("/register");
};
const submitForm = () => {
  elFormRef.value?.validate((valid) => {
    if (valid) {
      user
        .login(formData.value)
        .then((res) => {
          if (res.status == 200 && res.data) {
            ElNotification({
              title: "success",
              message: "Login Successful",
              type: "success",
            });
            setTimeout(() => {
              router.push("/home");
            }, 500);
          }
        })
        .catch((req) => {
          ElNotification({
            title: "prompt",
            message: req.data,
            type: "warning",
          });
        });
    } else {
    }
  });
};
</script>
<style lang="scss" scoped>
/* .el-form {
  .phone 
} */
.loginView {
  background: #000;
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 50px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  &:deep(.el-input__wrapper) {
    border-radius: 40px;
  }
  .el-form-item {
    &:deep(.el-checkbox__label) {
      color: #fff;
    }
    &:deep(.el-form-item__label) {
      color: #fff;
      font-size: 20px;
      &::before {
        content: "" !important;
      }
    }
  }
  .phone {
    width: 100%;

    .el-input__wrapper {
      border-radius: 20px;
    }
  }
  .password {
    width: 100%;
    .el-input__wrapper {
      border-radius: 20px;
    }
  }
  .el-button {
    width: 75%;
    height: 50px;
    letter-spacing: 10px;
    font-weight: 600;
    background-color: #fff;
    color: #000;
    font-size: 30px;
    border-radius: 60px;
    /* &:hover {
      background-color: rgba(0, 196, 175, 0.5);
    } */
  }
  .checkout {
    width: 100%;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
  }
  .loginBtn {
    margin-top: 20px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 15px;
    a {
      font-weight: 600;
      text-decoration: none;
      color: rgb(0, 196, 175);
    }
  }
}
</style>
