<template>
  <div class="loginView">
    <div class="formCont">
      <div class="title">Sign Up</div>
      <el-form
        ref="elFormRef"
        label-position="top"
        :model="formData"
        :rules="rules"
        label-width="0px"
      >
        <el-form-item label="" prop="username">
          <div class="username">
            <el-input
              v-model.number="formData.username"
              placeholder="Please enter your account number"
              clearable
              prefix-icon="el-icon-user-solid"
              :style="{ width: '100%' }"
            >
              <!-- <template #prefix>+86</template> -->
            </el-input>
          </div>
        </el-form-item>
        <div class="password">
          <el-form-item label="" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="Please enter your password"
              type="password"
              clearable
              prefix-icon="el-icon-key"
              show-password
              :style="{ width: '100%' }"
              @input="checkPasswordStrength"
            ></el-input>
          </el-form-item>

          <div
            class="strengthBox"
            :style="{
              opacity: formData.password.length > 0 ? 1 : 0,
            }"
          >
            <div class="strength-meter">
              <div
                v-for="(level, index) in strengthLevels"
                :key="index"
                :class="[
                  'strength-segment',
                  activeLevel > index ? 'active-' + activeLevel : '',
                ]"
              ></div>
            </div>
            <div class="strength-feedback" :class="'level-' + activeLevel">
              {{ strengthFeedback }}
            </div>
          </div>
        </div>

        <el-form-item>
          <div class="checkout">
            <el-checkbox v-model="remember" label="Remember" />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="BtnCont">
      <el-button class="loginBtn" round @click="submitForm">Sign Up</el-button>
      <p>Already have an account?<a class="link" @click="goLogin">Log in</a></p>
      <p :style="{ textAlign: 'center' }">Or</p>
      <el-button round>GitHub</el-button>
      <el-button round>Twitter</el-button>
    </div>
    <!-- <div class="bottom">Existing accounts</div> -->
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user.ts";
import user from "../../api/user.js";
import { ElNotification } from "element-plus";

const router = useRouter();
const remember = ref(false);
const elFormRef = ref();
const formData = ref({
  username: null,
  password: "",
});
const strengthLevels = [
  { text: "Poor", minScore: 0, class: "level-1" },
  { text: "Fair", minScore: 25, class: "level-2" },
  { text: "Good", minScore: 50, class: "level-3" },
  { text: "Excellent", minScore: 75, class: "level-4" },
  { text: "Exceptional", minScore: 90, class: "level-5" },
];
const activeLevel = ref(0);
const commonPasswords = ["123456", "password", "qwerty", "111111"]; // 常见弱密码列表
const strengthFeedback = computed(() => {
  return strengthLevels[activeLevel.value].text;
});
const hasMinLength = computed(() => {
  return formData.value.password.length >= 8;
});
const hasUppercase = computed(() => {
  return /[A-Z]/.test(formData.value.password);
});
const hasLowercase = computed(() => {
  return /[a-z]/.test(formData.value.password);
});
const hasNumber = computed(() => {
  return /[0-9]/.test(formData.value.password);
});
const hasSpecialChar = computed(() => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(formData.value.password);
});
const checkPasswordStrength = () => {
  let score = 0;
  let password = formData.value.password;
  // 长度评分
  score += Math.min(password.length * 3, 30); // 最多30分

  // 字符多样性评分
  if (/[A-Z]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  // 重复字符和连续字符惩罚
  if (/(.)\1{2,}/.test(password)) score -= 15;
  if (/(123|abc|qwe|asd|zxc)/i.test(password)) score -= 10;

  // 常见密码检查
  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0;
  }

  // 确定强度等级
  activeLevel.value = strengthLevels.reduce((acc, level, index) => {
    return score >= level.minScore ? index : acc;
  }, 0);
};
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
const goLogin = () => {
  router.push("/login");
};
const submitForm = () => {
  elFormRef.value?.validate((valid) => {
    console.log(valid, "valid");
    if (valid) {
      if (activeLevel.value > 2) {
        user
          .register(formData.value)
          .then((res) => {
            if (res.status == 200 && res.data) {
              ElNotification({
                title: "success",
                message: "register Successful",
                type: "success",
              });

              setTimeout(() => {
                router.push("/login");
              }, 500);
            }
          })
          .catch((req) => {
            ElNotification({
              title: "prompt",
              message: req?.data,
              type: "warning",
            });
          });
      } else {
        ElNotification({
          title: "prompt",
          message: "The password is too low.",
          type: "warning",
        });
      }
    }
  });
};
</script>
<style lang="scss" scoped>
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
      font-size: 12px;
    }
    .link {
      font-weight: 600;
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

    .strength-meter {
      width: 80%;
      margin-left: 10px;
      margin-top: 20px;
      display: flex;
      height: 8px;
      margin-bottom: 10px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .strength-segment {
      flex: 1;
      margin-right: 2px;
      background: #e0e0e0;
    }

    .strength-segment:last-child {
      margin-right: 0;
    }

    .active-1 {
      background: #ff4d4d;
    } /* 非常弱 */
    .active-2 {
      background: #ff9966;
    } /* 弱 */
    .active-3 {
      background: #ffcc00;
    } /* 中等 */
    .active-4 {
      background: #99cc33;
    } /* 强 */
    .active-5 {
      background: #22bb33;
    } /* 非常强 */

    .strength-feedback {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .strength-feedback.level-1 {
      color: #ff4d4d;
    }
    .strength-feedback.level-2 {
      color: #ff9966;
    }
    .strength-feedback.level-3 {
      color: #ffcc00;
    }
    .strength-feedback.level-4 {
      color: #99cc33;
    }
    .strength-feedback.level-5 {
      color: #22bb33;
    }

    .password-requirements {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: #666;
    }

    .password-requirements li {
      margin-bottom: 5px;
      position: relative;
      padding-left: 20px;
    }

    .password-requirements li:before {
      content: "✗";
      position: absolute;
      left: 0;
      color: #ff4d4d;
    }

    .password-requirements li.satisfied:before {
      content: "✓";
      color: #22bb33;
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
