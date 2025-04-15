<template>
  <div class="bg">
    <div class="content">
      <div class="contmark">
        <div class="card">
          <div class="rightCard">
            <router-view></router-view>
          </div>
          <div class="leftCard"></div>
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
  background: #000;
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
        height: 65%;
        border: 1px solid #6c6968;
        /* background: red; */
        border-radius: 20px;
        /* padding: 20px; */
        overflow: hidden;
        display: flex;
        .leftCard {
          width: 50%;
          height: 100%;
          background-image: url("/static/BG.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
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
