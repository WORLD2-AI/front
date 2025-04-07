<template>
  <div class="registerView">
    <div class="title">注册</div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="0px"
    >
      <!-- <el-form-item label="账号"
                    prop="username">
        <el-input v-model="formData.username"
                  placeholder="请输入账号"
                  clearable
                  prefix-icon='el-icon-user-solid'
                  :style="{width: '80%'}"></el-input>
      </el-form-item> -->
      <div class="email">
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            clearable
            prefix-icon="el-icon-key"
          >
            <!-- :style="{ width: '100%' }" -->
            <template #prefix>+86</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="code">
        <el-form-item prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入验证码"
            clearable
            prefix-icon="el-icon-key"
            :style="{ width: '90%' }"
          ></el-input>
        </el-form-item>
        <el-button round class="getCode" @click="resetForm"
          >获取验证码</el-button
        >
      </div>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          clearable
          prefix-icon="el-icon-key"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          v-model="formData.repassword"
          placeholder="确认密码"
          clearable
          prefix-icon="el-icon-key"
          show-password
        ></el-input>
      </el-form-item>
      <div class="agree">
        <el-form-item>
          <el-checkbox
            :style="{ paddingRight: '10px' }"
            v-model="agree"
            text-color="red"
          >
          </el-checkbox>
          注册即代表您已阅读并同意
          <a href="">《服务协议》</a>及
          <a href="">《隐私政策》</a>
        </el-form-item>
      </div>
      <!-- <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="formData.email"
                  placeholder="请输入邮箱"
                  clearable
                  prefix-icon='el-icon-key'
                  :style="{width: '80%'}"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="" prop="codeimage">
        <span
          ><img
            :src="imageUrl"
            alt=""
            @click="chageImage"
            :style="{ with: '20%', height: '100%' }"
        /></span>
      </el-form-item> -->
      <el-form-item size="large">
        <el-button
          round
          type="primary"
          @click="submitForm"
          :loading="loading"
          :disabled="loading"
          >注册</el-button
        >
        <!-- <el-button round @click="resetForm">重置</el-button> -->
      </el-form-item>
      <div class="bottom">
        已有账号，立即
        <a href="/login">登录</a>
      </div>
    </el-form>
  </div>
</template>
<script>
//   import { useUserStore } from '../../store/user.ts'
import userapi from "../../api/user.js";
import { ElNotification } from "element-plus";
export default {
  components: {},
  data() {
    return {
      imageUrl: "//localhost/limit/register/get_code_image?" + Math.random(),
      agree: false,
      formData: {
        username: "",
        password: "",
        repassword: "",
        code: "",
        email: "",
        loading: false,
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
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
        repassword: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      console.log(
        this.agree,
        !this.checkValueNotNull(),
        "!this.checkValueNotNull()"
      );
      if (!this.checkValueNotNull() || !this.agree) {
        ElNotification({
          title: "警告",
          message: "请完成表单信息之后再做提交",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      console.log(this.formData);
      userapi
        .register(this.formData)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.$message.success("注册成功");
            setTimeout(() => {
              this.$router.push("/dist/login");
            }, 2000);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error("注册失败:" + err.data.message);
          this.chageImage();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    checkValueNotNull() {
      if (this.formData.email === "") {
        this.$message.error("邮箱不能为空");
        return false;
      }
      if (this.formData.code === "") {
        this.$message.error("验证码不能为空");
        return false;
      }
      if (this.formData.password === "") {
        this.$message.error("密码不能为空");
        return false;
      }
      if (this.formData.repassword === "") {
        this.$message.error("确认密码不能为空");
        return false;
      }

      return true;
    },
    chageImage() {
      this.imageUrl =
        "//localhost/limit/register/get_code_image?t=" +
        new Date().getTime() +
        Math.random();
    },
  },
};
</script>
<style lang="scss">
.registerView {
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
  .email {
    width: 100%;
    .el-input__wrapper {
      border-radius: 20px;
    }
  }
  .code {
    width: 100%;
    display: flex;
    .el-button {
      width: 100px;
      height: 32px;
      background-color: rgb(0, 196, 175);
      color: #fff;
      font-size: 14px;
      &:hover {
        background-color: rgba(0, 196, 175, 0.5);
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
    height: 32px;
    background-color: rgb(0, 196, 175);
    color: #fff;
    font-size: 17px;
    &:hover {
      background-color: rgba(0, 196, 175, 0.5);
    }
  }
  .agree {
    font-size: 14px;
    white-space: nowrap;
    a {
      text-decoration: none;
      color: rgb(0, 196, 175);
      font-weight: 600;
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
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
