<template>
  <div class="container">
    <el-card class="card">
      <div class="top-section">
        <div class="arch"></div>
        <div class="clan">
          <el-row>
            <el-col :span="6">Age:</el-col>
            <el-col :span="18">{{ role.age }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Sex:</el-col>
            <el-col :span="18">{{ role.sex }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Name:</el-col>
            <el-col :span="18">{{ role.name }}</el-col>
          </el-row>
        </div>
      </div>
      <div class="middle-section">
        <div class="name">
          <div class="first_name">{{ role.first_name }}</div>
          <div class="last_name">{{ role.last_name }}</div>
        </div>
        <!-- <div class="characterDressUp">
          <div class="role">
            <div class="head"></div>
            <div class="body"></div>
            <div class="replacement">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="skill">
            <div></div>
            <div></div>
          </div>
        </div> -->
      </div>
      <div class="bottom-section">
        <el-table
          :show-header="false"
          scrollbar-always-on
          :data="roleForm"
          height="200"
          max-height="200"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="name"
            width="100"
            show-overflow-tooltip
          />
          <el-table-column prop="value" label="value" show-overflow-tooltip />
        </el-table>
      </div>
    </el-card>
    <time-line></time-line>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Sunny } from "@element-plus/icons-vue";
import characters from "../../api/characters.js";
import Text from "./text.vue";
import TimeLine from "./timeLine.vue";
const roles = ref([]);
const role = ref({
  age: "",
  name: "",
  first_name: "",
  last_name: "",
  sex: "",
});
const roleForm = ref([]);

const rolelist = {
  currently: "",
  innate: "",
  learned: "",
  lifestyle: "",
  sleep_time: "",
  wake_time: "",
};
onMounted(() => {
  characters.getAllRoles().then((res) => {
    res.data.data && (roles.value = res.data.data);
    if (roles.value.length > 0) {
      role.value = roles.value[0];
      let object = roles.value[0];
      for (const key in rolelist) {
        let obj = {};
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          obj.name = key;
          obj.value = element;
          roleForm.value.push(obj);
        }
      }
    }
  });
});
</script>

<style lang="scss" scoped>
$shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
$background: rgba(13, 31, 13, 0.9);
$backgroundHover: rgba(13, 31, 13, 0.7);
.container {
  padding: 20px;
  /* display: flex; */
}
.card {
  color: #ebe7e7;
  border: 2px solid #c9a769;
  width: 290px;
  height: auto;
  padding: 5px;
  padding-bottom: 0px;
  background: linear-gradient(to right, #1a2a1a, #0d1f0d);
  :deep(.el-card__body) {
    padding: 0;
  }
  /* border-radius: 50% 50% 0 0; */
  /* background: #ccc; */
  .top-section {
    height: 130px;
    position: relative;
    overflow: hidden;
    .arch {
      position: absolute;
      height: 130px;
      left: -6%;
      width: 113%;
      border-top: 1px solid #fff;
      border-radius: 50% 50% 0 0;
      box-shadow: $shadow;
    }
    .clan {
      width: 100%;
      position: absolute;
      top: 48px;
      padding: 0 20px;
      .el-row {
        .el-col {
          &:nth-child(1) {
            height: 27px;
            line-height: 27px;
            font-size: 14px;
            text-align: center;
            /* background: #ccc; */
          }
          &:nth-child(2) {
            border-bottom: #ccc 1px solid;
            /* box-shadow: $shadow; */
            height: 27px;
            line-height: 27px;
            text-align: left;
          }
        }
      }
    }
  }
}
.middle-section {
  height: 40px;
  .name {
    display: flex;
    height: 27px;
    padding: 0 20px;
    div {
      /* box-shadow: $shadow; */
      border-bottom: #ccc 1px solid;
      padding-right: 10px;
      height: 100%;
      flex: 1;
      margin: 0 20px;
      line-height: 27px;
      text-align: right;
    }
  }
  .characterDressUp {
    background: #fff;
    padding: 5px 20px;
    display: flex;
    .role {
      flex: 1;
      padding: 2px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .head {
        width: 35px;
        height: 35px;
        transform: translateY(10px);
        background: #ccc;
        /* box-shadow: $shadow; */
      }
      .body {
        width: 68px;
        height: 87px;
        background: #ccc;
        /* box-shadow: $shadow; */
      }
      .replacement {
        transform: translateY(-30px);
        width: 103px;
        display: flex;
        justify-content: space-between;
        span {
          background: #ccc;
          /* box-shadow: $shadow; */
          width: 35px;
          height: 35px;
        }
      }
    }
    .skill {
      display: flex;
      flex-direction: column;
      width: 35px;
      div {
        width: 35px;
        height: 35px;
        background: #ccc;
        /* box-shadow: $shadow; */
      }
    }
  }
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}
.bottom-section {
  font-size: 12px;
  padding: 0 20px;
  .el-table--fit {
    border: 1px solid #ccc;
  }
  :deep(.el-table__inner-wrapper) {
    color: #ebe7e7;
    background-color: $background;
    .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
      background-color: red;
    }
    tr {
      background-color: $background;
      &:hover {
        .el-table__cell {
          background-color: $backgroundHover;
        }
      }
    }
  }
}
</style>