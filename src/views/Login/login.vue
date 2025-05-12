<template>
  <div class="loginView">
    <div class="formCont">
      <div class="title">Login</div>
      <el-form
        @keydown.enter="submitForm"
        ref="elFormRef"
        :model="formData"
        :rules="rules"
        label-width="0px"
        label-position="top"
      >
        <div class="username">
          <el-form-item prop="username" label="">
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
        <el-form-item prop="password" label="">
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
            <!-- <span>
              <a>Forget password</a>?&nbsp;/&nbsp;
              <a @click="goRegister">Register</a>
            </span> -->
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="BtnCont">
      <el-button class="loginBtn" round @click="submitForm">Login</el-button>
      <p>
        Don`t have an account?<a class="link" @click="goRegister">Register</a>
      </p>
      <p :style="{ textAlign: 'center' }">Or</p>
      <el-button round @click="user.twitter">Twitter</el-button>
    </div>

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
formData.value.username = route.query.email !== "null" ? route.query.email : "";
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
              message: res.data.message,
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
            message: req.data.message,
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
  .username 
} */
.loginView {
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  display: flex;
  .formCont {
  }
  .BtnCont {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin: 10px auto;
      font-size: 20px;
    }
    .link {
      font-weight: 600;
      cursor: pointer;
    }
  }
  .title {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 80px;
    margin-top: 30px;
  }
  &:deep(.el-input__wrapper) {
    border-radius: 40px;
    width: 400px;
    height: 45px;
  }
  .el-form-item {
    margin-bottom: 30px;
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
  .username {
    width: 100%;
    .el-form-item__content {
      .el-input__wrapper {
        border-radius: 20px;
        width: 400px;
      }
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
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 60px;
    border: none;
    background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
    backdrop-filter: blur(1px); /* 关键属性 - 背景模糊 */
    margin: 10px auto;
    &:hover {
      background-color: rgb(52, 48, 48);
    }
  }
  .checkout {
    width: 100%;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
  }
  .loginBtn {
    background: #000;
    color: #fff;
    letter-spacing: 3px;

    .bottom {
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
