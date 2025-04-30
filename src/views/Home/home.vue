<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background: #000">
        <ul class="container">
          <li>
            <img class="media-object" src="/static/logo.jpg" alt="" />
          </li>
          <li class="navbar-nav">
            <template v-if="loginStatus">
              <!-- <img src="/static/github.jpg" alt="" /> -->
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
            </template>
            <template>
              <img src="/static/github.jpg" alt="" />
              <a href="/">Login In</a>
            </template>
          </li>
        </ul>
      </el-header>
      <el-main>
        <Map></Map>
        <BarOntainer></BarOntainer>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Map from "./Map.vue";
import BarOntainer from "./barOntainer.vue";
const router = useRouter();
const loginStatus = true;
import {
  ArrowDown,
  User,
  Setting,
  SwitchButton,
} from "@element-plus/icons-vue";
import userApi from "../../api/user";
onMounted(() => {
  userApi.profile().then((res) => {
    let url = res.data.data.avatar_url;
    url &&
      userApi.downLoad(url).then((res) => {
        user.value.avatar = URL.createObjectURL(new Blob([res.data]));
      });
  });
});
const user = ref({
  name: "user",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
.el-container {
  background: #212529;
  height: 100vh;
  .el-header {
    position: relative;

    .user-info {
      cursor: pointer;
    }

    .user-avatar {
      display: flex;
      align-items: center;
      padding: 10px 0;
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
    box-sizing: content-box;
    height: 116px;
    padding: 15px 13.5px;

    border-bottom: 1px solid rgba(55, 16, 16, 0.1);
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
        width: 150px;
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
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
