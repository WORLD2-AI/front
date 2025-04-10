<template>
  <div class="loginView">
    <div class="title">Login</div>
    <el-form
      ref="elFormRef"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="0px"
    >
      <div class="phone">
        <el-form-item label="" prop="username">
          <el-input
            v-model.number="formData.username"
            placeholder="Please enter your account number"
            clearable
            prefix-icon="el-icon-user-solid"
            :style="{ width: '100%' }"
          >
            <template #prefix>+86</template>
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
            show-password
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
        <!-- <el-button @click="resetForm">注册</el-button> -->
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
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user.ts";
import user from "../../api/user.js";
import { ElNotification } from "element-plus";
const router = useRouter();
const remember = ref(false);
const elFormRef = ref();
const formData = ref({
  username: "",
  password: "",
});
const rules = ref({
  username: [
    {
      required: true,
      message: "username is required",
      trigger: "blur",
    },
    { type: "number", message: "username must be a number" },
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
  console.log(router, "goRegister");
};
const submitForm = () => {
  // if (this.formData.username === "" || this.formData.password === "") {
  //   this.$message.error("账号或密码不能为空");
  //   console.log("账号密码");
  //   return;
  // }
  elFormRef.value?.validate((valid) => {
    // 使用可选链 ?. 避免报错
    console.log(valid, "valid");
    if (valid) {
      user.login(formData.value).then((res) => {
        console.log(res);
        if (res.status == 200 && res.data) {
          this.$message.success("登录成功");
          //     ElNotification({
          //   title: "success",
          //   message: req.data,
          //   type: "success",
          // });

          useUserStore().login(this.formData.username, this.formData.password);
          setTimeout(() => {
            this.$router.push("/dist");
          }, 500);
        }
      });
    } else {
    }
  });
};
const resetForm = () => {
  // this.$refs['elForm'].resetFields()
  this.$router.push("/register");
};
// export default {
//   components: {},
//   data() {
//     return {
//       remember: false,
//       formData: {
//         username: "",
//         password: "",
//       },
//       rules: {
//         username: [
//           {
//             required: true,
//             message: "请输入账号",
//             trigger: "blur",
//           },
//         ],
//         password: [
//           {
//             required: true,
//             message: "请输入密码",
//             trigger: "blur",
//           },
//         ],
//       },
//     };
//   },
//   methods: {},
// };
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
