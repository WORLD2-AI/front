<template>
  <div class="loginView">
    <div class="title">登录</div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="0px"
    >
      <div class="phone">
        <el-form-item label="" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入账号"
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
            placeholder="请输入密码"
            type="password"
            clearable
            prefix-icon="el-icon-key"
            show-password
            :style="{ width: '100%' }"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remember" label="记住密码" />
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" round @click="submitForm"
          >登录</el-button
        >
        <!-- <el-button @click="resetForm">注册</el-button> -->
      </el-form-item>
    </el-form>
    <div class="bottom">
      <a href="/register">注册账号</a>
      <span>忘记密码</span>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "../../store/user.ts";
import user from "../../api/user.js";
export default {
  components: {},
  data() {
    return {
      remember: false,
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      if (this.formData.username === "" || this.formData.password === "") {
        this.$message.error("账号或密码不能为空");
        return;
      }
      user.login(this.formData).then((res) => {
        console.log(res);
        if (res.status == 200 && res.data) {
          this.$message.success("登录成功");
          useUserStore().login(this.formData.username, this.formData.password);
          setTimeout(() => {
            this.$router.push("/dist");
          }, 500);
        }
      });
    },
    resetForm() {
      // this.$refs['elForm'].resetFields()
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="scss">
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
      text-decoration: none;
    }
  }
}
</style>
