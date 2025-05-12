<template>
  <div class="bg">
    <div class="content">
      <div class="contmark">
        <div class="card">
          <router-view></router-view>
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
  background-image: url("img/loginBg.jpg");
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
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(1px);
        padding: 20px;
        box-shadow: 0 0px 25px rgba(255, 255, 255, 0.8);
        width: 800px;
        height: 65%;
        /* background: red; */
        border-radius: 25px;
        /* padding: 20px; */
        overflow: hidden;
        display: flex;
        .leftCard {
          width: 50%;
          height: 100%;
        }
        .rightCard {
          padding: 20px;
          flex-shrink: 0;
          width: 50%;
          height: 100%;
          background: #000;
        }
      }
    }
  }
}
</style>
