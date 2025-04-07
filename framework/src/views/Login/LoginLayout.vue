<template>
  <div class="bg">
    <div class="content">
      <div class="contmark">
        <div class="card">
          <div class="leftCard"></div>
          <div class="rightCard">
            <router-view></router-view>
          </div>
          <div class="viewCont"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  background: red;
  background-image: url("loginBg.jpg");
  background-size: cover;
  .content {
    width: 100%;
    height: 100%;
    .contmark {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      .card {
        width: 60%;
        height: 75%;
        /* background: red; */
        border-radius: 20px;
        /* padding: 20px; */
        overflow: hidden;
        display: flex;
        .leftCard {
          width: 50%;
          height: 100%;
          background-image: url("loginBg.jpg");
          background-size: cover;
        }
        .rightCard {
          flex-shrink: 0;
          width: 50%;
          height: 100%;
          background: #fff;
        }
      }
    }
  }
}
</style>
