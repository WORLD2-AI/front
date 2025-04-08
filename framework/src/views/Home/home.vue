<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background: #000"
        >Header
        <ul class="container">
          <li>
            <img class="media-object" src="/logo.jpg" alt="" />
          </li>
          <li class="navbar-nav">
            <img src="/github.jpg" alt="" />
            <a href="/login">Login In</a>
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
import { ref, reactive } from "vue";
import Map from "./Map.vue";
import BarOntainer from "./barOntainer.vue";
</script>

<style lang="scss" scoped>
.el-container {
  background: #212529;
  height: 100vh;
  .el-header {
    position: relative;
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
