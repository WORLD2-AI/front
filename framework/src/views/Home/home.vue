<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <div class="map">
          <Map />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import Map from "./Map.vue";
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  .el-main {
    padding: 0;
  }
  .el-header {
    padding: 0;
  }
}
</style>
