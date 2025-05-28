<template>
  <div class="common-layout">
    <div
      class="Stepelements"
      :style="{
        display: profileGuideShown ? 'none' : 'flex',
      }"
    >
      <div class="w1"></div>
    </div>
    <el-container>
      <el-header style="background: #000">
        <ul class="container">
          <li class="logo">
            <img
              class="media-object"
              src="/img/logo.jpg"
              @click="goLogin"
              alt=""
            />
          </li>
          <li class="navbar-nav">
            <ul class="navbar-list">
              <li class="nav-item" style="width: 45px">
                <a
                  class="nav-link nav-link-custom"
                  href="https://github.com/AI-HelloWorld/AI-HelloWorld"
                  target="_blank"
                >
                  <img
                    src="/img/github.jpg"
                    style="width: 30px; height: auto"
                  />
                </a>
              </li>
              <li class="nav-item" style="width: 45px">
                <a
                  class="nav-link nav-link-custom"
                  href="https://t.me/AIHelloWorld"
                  target="_blank"
                >
                  <img
                    src="/img/telegram.png"
                    style="width: 30px; height: auto"
                  />
                </a>
              </li>
              <li class="nav-item" style="width: 45px">
                <a
                  class="nav-link nav-link-custom"
                  href="https://twitter.com/E3A_EternalAI"
                  target="_blank"
                  ><img src="/img/x.png" style="width: 30px; height: auto"
                /></a>
              </li>
              <li class="nav-item" style="width: 45px">
                <a
                  class="nav-link nav-link-custom"
                  href="https://discord.gg/ZM7EdkCHZP"
                  target="_blank"
                  ><img
                    src="/img/discord.jpg"
                    style="width: 30px; height: auto"
                /></a>
              </li>
              <li class="nav-item" style="padding-left: 40px">
                <a
                  class="nav-link nav-link-custom"
                  target="_blank"
                  href="/Helloworld.pdf"
                  >White Paper</a
                >
              </li>
              <li class="nav-item user-avatarBox" style="padding-left: 40px">
                <div v-show="!loginStatus">
                  <div class="user-auto">
                    <img src="/img/github.jpg" @click="goLogin" alt="" />
                  </div>
                </div>
                <div v-show="loginStatus">
                  <el-dropdown @command="handleCommand" trigger="click">
                    <div class="user-avatar">
                      <el-avatar :size="40" :src="user.avatar" />
                      <span class="user-name">{{ user.name }}</span>
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="profile">
                          <el-icon><User /></el-icon>
                          <span>Profile</span>
                        </el-dropdown-item>
                        <!-- <el-dropdown-item command="settings">
                      <el-icon><Setting /></el-icon>
                      <span>Settings</span>
                    </el-dropdown-item> -->
                        <el-dropdown-item divided command="logout">
                          <el-icon><SwitchButton /></el-icon>
                          <span>Logout</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </li>
              <!-- <li class="nav-item">
                <a
                  class="nav-link nav-link-custom"
                  href="#"
                  onclick="alert('please wait...')"
                  ><span style="color: rgba(87, 89, 89 0.2)">Login In</span></a
                >
              </li> -->
            </ul>
          </li>
        </ul>
      </el-header>
      <el-main>
        <Map></Map>
        <!-- <BarOntainer></BarOntainer> -->
      </el-main>
    </el-container>
  </div>
  <!-- HTML示例 -->
  <!-- <div class="zoom-guide" id="zoomGuide">
    <div class="arrow"></div>
    <p>按住 <kbd>Ctrl</kbd> + <kbd>鼠标滚轮</kbd> 缩放</p>
    <button class="close-btn">×</button>
  </div> -->
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import intro from "intro.js"; // introjs库
import "intro.js/introjs.css"; // introjs默认css样式
import Map from "./Map.vue";
import BarOntainer from "./barOntainer.vue";
const router = useRouter();
const loginStatus = ref(false);
const introOption = ref();
import {
  ArrowDown,
  User,
  Setting,
  SwitchButton,
} from "@element-plus/icons-vue";
import userApi from "../../api/user";
const user = ref({
  name: "user",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const goLogin = () => {
  router.push("/login");
};
const profileGuideShown = ref(true);
profileGuideShown.value = localStorage.getItem("profileGuideShown");
introOption.value = [
  {
    element: ".w1",
    title: "The first step",
    intro: "Ctrl+'scroll wheel'/keyboard input 'x/z' to zoom in and out",
  },
  {
    element: ".w1",
    title: "The second step",
    intro:
      "Click on the character to switch perspectives and then click unfocus again",
  },
  {
    element: ".game-controls",
    title: "The third step",
    intro:
      "One click to return to your character, click again to unfocus the perspective",
  },
  {
    element: ".tab-container",
    title: "The fourth step",
    intro: "Here is the daily schedule of the character",
  },
  {
    element: ".el-card__body",
    title: "The fifth step",
    intro: "Here is the basic information of the character",
  },
  {
    element: ".user-avatarBox",
    title: "The sixth step",
    intro: "This is the personal center, you can register your own character",
  },
];
const initGuide = () => {
  console.log("initGuide");
  console.log(introOption.value);
  intro()
    .setOptions({
      steps: introOption.value,
      showBullets: false,
      skipLabel: "skip",
    })
    .oncomplete(() => {
      console.log("引导完成");
      localStorage.setItem("profileGuideShown", true);
      profileGuideShown.value = true;
    })
    .onexit(() => {
      console.log("用户退出了引导");
      localStorage.setItem("profileGuideShown", true);
      profileGuideShown.value = true;
    })
    .start();
};
onMounted(() => {
  if (profileGuideShown.value === null) {
    initGuide();
  }
  // const originalMoveNext = driver.moveNext.bind(driver);
  // driver.moveNext = function () {
  //   console.log("开始下一步");
  //   const isLastStepBeforeMove = this.isLastStep();
  //   originalMoveNext(); // 执行原方法

  //   if (isLastStepBeforeMove) {
  //     console.log("导览已结束（最后一步）");
  //     // 执行你的回调逻辑
  //   }
  // };

  // document.getElementById("start-tour").addEventListener("click", function () {
  //   console.log("开始引导");
  //   driver.drive();
  // });
  userApi.profile().then((res) => {
    loginStatus.value = true;
    let url = res.data.data?.avatar_url;
    url &&
      userApi.downLoad(url).then((res) => {
        user.value.avatar = URL.createObjectURL(new Blob([res.data]));
      });
  });
});

const handleCommand = (command) => {
  switch (command) {
    case "profile":
      router.push("/profile");
      break;
    case "settings":
      router.push("/settings");
      break;
    case "logout":
      logout();
      break;
  }
};
const logout = () => {
  userApi.logout().then(() => {
    router.go();
  });
};
</script>

<style lang="scss" scoped>
.common-layout {
  position: relative;
  .Stepelements {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    .w1 {
      /* display: none; */
      /* opacity: 0; */
      /* width: 10px;
      height: 10px;
      background: rgb(0, 0, 0); */
    }
  }
}
.w2,
.w3 {
  width: 200px;
  height: 100px;
  background: #f0f0f0;
  margin: 50px;
  padding: 20px;
}
.zoom-guide {
  position: absolute;
  top: 60px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 4px;
  animation: pulse 2s infinite; /* 呼吸动画吸引注意 */
}
.arrow {
  position: absolute;
  top: -10px;
  right: 30px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(0, 0, 0, 0.8);
}
.el-container {
  background: #212529;
  height: 100vh;

  :deep(.el-header) {
    height: auto;
  }
  .container {
    .logo {
      height: 50px;
      /* line-height: 34px; */
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-header {
    height: auto;
    position: relative;
    box-sizing: content-box;
    padding: 15px 13.5px;

    border-bottom: 1px solid rgba(55, 16, 16, 0.1);

    .user-info {
      cursor: pointer;
    }

    .user-avatar {
      display: flex;
      align-items: center;
    }

    .user-name {
      margin: 0 10px;
      color: white;
    }

    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #f5f7fa;
    }

    .el-dropdown-menu__item {
      display: flex;
      align-items: center;
    }

    .el-dropdown-menu__item .el-icon {
      margin-right: 8px;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        to right,
        transparent,
        #6a0000,
        #f63434,
        transparent
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .container {
      margin-left: 10%;
      margin-right: 10%;
      display: flex;
      flex: inherit;
      justify-content: space-between;
      .media-object {
        width: 225px;
        height: 85px;
        margin-left: 2px;
      }
      .navbar-nav {
        li {
          list-style: none;
        }
        height: 47px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        position: relative;
        .navbar-list {
          display: flex;
        }
        .user-auto {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          padding: 0;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .userA {
          height: 100%;
          position: relative;
          top: 0;
          left: 0;
          padding: 10px 0;
          .class-moren {
            position: absolute;
          }
        }
        img {
          width: 30px;
          height: auto;
        }
        a {
          font-size: 20px;
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
  .el-main {
    padding: 0;
  }
}
:deep(.introjs-tooltipReferenceLayer) {
  background-color: red;
}
:deep(.introjs-tooltip) {
  background-color: red; /* 背景颜色 */
  color: #333; /* 文字颜色 */
  border-radius: 8px; /* 圆角 */

  .introjs-button {
    background-color: #007bff; /* 按钮背景颜色 */
    color: #fff; /* 按钮文字颜色 */
  }

  .introjs-arrow {
    border-color: rgba(255, 255, 255, 0.95); /* 箭头颜色 */
  }
  .introjs-arrow.top {
    border-bottom-color: #f7f7f7; /* 上箭头颜色 */
  }
  .introjs-arrow.bottom {
    border-top-color: #f7f7f7; /* 下箭头颜色 */
  }
  .introjs-arrow.left {
    border-right-color: #f7f7f7; /* 左箭头颜色 */
  }
  .introjs-arrow.right {
    border-left-color: #f7f7f7; /* 右箭头颜色 */
  }
  .introjs-button {
    padding: 10px 20px; /* 内边距 */
    border: none; /* 无边框 */
    border-radius: 5px; /* 圆角 */
    cursor: pointer; /* 鼠标指针 */
    transition: background-color 0.3s ease; /* 过渡效果 */
  }
  .introjs-button:hover {
    background-color: #0056b3; /* 鼠标悬停时的背景颜色 */
  }
}
</style>
