<template>
  <div class="loginView">
    <div class="title">Login</div>
    <el-form ref="elFormRef" :model="formData" :rules="rules" label-width="0px">
      <div class="phone">
        <el-form-item label="" prop="username">
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
      <el-form-item label="" prop="password">
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
        <el-checkbox v-model="remember" label="memorize passwords" />
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" round @click="submitForm"
          >login</el-button
        >
      </el-form-item>
    </el-form>
    <div class="bottom">
      <a @click="goRegister">create account</a>
      <a>forgotten password</a>
    </div>
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
.loginView {
  width: 100%;
  height: 100%;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  .title {
    color: rgb(0, 196, 175);
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .el-input__wrapper {
    border-radius: 20px;
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
    width: 100%;
    height: 32px;
    background-color: rgb(0, 196, 175);
    color: #fff;
    font-size: 17px;
    &:hover {
      background-color: rgba(0, 196, 175, 0.5);
    }
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
