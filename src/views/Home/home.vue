<template>
  <div class="common-layout">
    <!-- <div class="w1"></div>
    <div class="w2"></div>
    <div class="w3"></div>
    <button id="start-tour">开始引导</button> -->
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
              <li class="nav-item" style="padding-left: 40px">
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
import * as DriverModule from "driver.js";
import "driver.js/dist/driver.css";
// 正确提取构造函数
const Driver = DriverModule.driver;
console.log(Driver);
// import "driver.js/dist/driver.min.css";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Map from "./Map.vue";
import BarOntainer from "./barOntainer.vue";
const router = useRouter();
const loginStatus = ref(false);
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

onMounted(() => {
  const driver = new Driver();
  // console.log(document.getElementById("start-tour"));
  // document.getElementById("start-tour").addEventListener("click", function () {
  //   console.log("开始引导");
  //   driver.defineSteps([
  //     {
  //       element: ".w1", // 第一步目标元素
  //       popover: {
  //         title: "第一步",
  //         description: "这是第一个引导步骤",
  //         position: "bottom",
  //       },
  //     },
  //     {
  //       element: ".w2", // 第二步目标元素
  //       popover: {
  //         title: "第二步",
  //         description: "请点击这里继续",
  //         position: "right",
  //       },
  //     },
  //     {
  //       element: ".w3", // 第三步目标元素
  //       popover: {
  //         title: "最后一步",
  //         description: "完成所有引导",
  //         position: "top",
  //       },
  //     },
  //   ]);
  // });
  userApi.profile().then((res) => {
    loginStatus.value = true;
    let url = res.data.data?.avatar_url;
    url &&
      userApi.downLoad(url).then((res) => {
        user.value.avatar = URL.createObjectURL(new Blob([res.data]));
      });
  });
  document
    .querySelector(".user-avatar")
    .addEventListener("mouseenter", function () {
      if (!localStorage.getItem("profileGuideShown")) {
        showTooltip(this, "点击查看个人资料和设置");
        localStorage.setItem("profileGuideShown", "true");
      }
    });

  function showTooltip(target, text) {
    // 动态创建提示元素并定位
  }
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
.w1,
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
</style>
