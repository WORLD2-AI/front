<template>
  <div class="container">
    <el-card class="card">
      <div class="top-section">
        <div class="arch"></div>
        <div class="clan">
          <el-row>
            <el-col :span="6">CLAN</el-col>
            <el-col :span="18">{{ clanValue }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">C.T.</el-col>
            <el-col :span="18">{{ ctValue }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">TITLE</el-col>
            <el-col :span="18">{{ titleValue }}</el-col>
          </el-row>
        </div>
      </div>
      <div class="middle-section">
        <div class="name">
          <div class="first_name">danny</div>
          <div class="last_name">Smith</div>
        </div>
        <div class="characterDressUp">
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
        </div>
      </div>
      <div class="bottom-section">
        <el-table
          :show-header="false"
          scrollbar-always-on
          :data="role"
          max-height="130"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="name"
            width="80"
            show-overflow-tooltip
          />
          <el-table-column
            prop="value"
            label="value"
            width="80"
            show-overflow-tooltip
          />
        </el-table>
      </div>
    </el-card>
    <div class="timeLine">
      <div class="card">
        <div class="name">Carmen Oritz</div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item center>
            <el-card>
              <p>Morning exercise</p>
            </el-card>
            <template #dot>
              <el-icon><Sunny /></el-icon>
            </template>
          </el-timeline-item>
          <el-timeline-item center>
            <el-card><p>Morning exercise</p> </el-card>
            <template #dot>
              <div>6:00</div>
            </template>
          </el-timeline-item>
          <el-timeline-item center>
            <el-card><p>Morning exercise</p> </el-card>
            <template #dot>
              <div>9:00</div>
            </template>
          </el-timeline-item>
          <el-timeline-item center>
            <el-card><p>Morning exercise</p> </el-card>
            <template #dot>
              <div>15:00</div>
            </template>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Sunny } from "@element-plus/icons-vue";
import characters from "../../api/characters.js";
const roles = ref([]);
const role = ref([]);
const clanValue = ref("동백꽃단");
const ctValue = ref("동백의");
const titleValue = ref("명예의");
onMounted(() => {
  characters.getRoles().then((res) => {
    roles.value = res.data.data;
    let object = roles.value[0];
    console.log(object, "object");
    for (const key in object) {
      let obj = {};
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        obj.name = key;
        obj.value = element;
        role.value.push(obj);
      }
    }
  });
});
</script>

<style lang="scss" scoped>
$shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
.container {
  padding: 20px;
}
.card {
  width: 216px;
  height: 400px;
  padding: 5px;
  :deep(.el-card__body) {
    padding: 0;
  }
  /* border-radius: 50% 50% 0 0; */
  background: #ccc;
  .top-section {
    height: 110px;
    position: relative;
    overflow: hidden;
    .arch {
      position: absolute;
      background: #fff;
      height: 110px;
      left: -6%;
      width: 113%;
      border: 1px solid #fff;
      border-radius: 50% 50% 0 0;
    }
    .clan {
      background: #fff;
      width: 100%;
      position: absolute;
      top: 50px;
      padding: 0 10px;
      .el-row {
        .el-col {
          height: 18px;
          &:nth-child(1) {
            height: 100%;
            line-height: 18px;
            font-size: 14px;
            text-align: center;
            background: #ccc;
          }
          &:nth-child(2) {
            font-size: 14px;
            box-shadow: $shadow;
            height: 100%;
            line-height: 18px;
            text-align: right;
          }
        }
      }
    }
  }
}
.middle-section {
  .name {
    background: #fff;
    display: flex;
    height: 15px;
    padding: 0 10px;
    font-size: 100px;
    div {
      font-size: 0.1em;
      box-shadow: $shadow;
      padding-right: 10px;
      height: 100%;
      flex: 1;
      line-height: 12px;
      text-align: right;
    }
  }
  .characterDressUp {
    background: #fff;
    padding: 2px 10px;
    display: flex;
    .role {
      flex: 1;
      padding: 2px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .head {
        width: 25px;
        height: 25px;
        transform: translateY(10px);
        background: #ccc;
        box-shadow: $shadow;
      }
      .body {
        width: 50px;
        height: 65px;
        background: #ccc;
        box-shadow: $shadow;
      }
      .replacement {
        transform: translateY(-20px);
        width: 75px;
        display: flex;
        justify-content: space-between;
        span {
          background: #ccc;
          box-shadow: $shadow;
          width: 25px;
          height: 25px;
        }
      }
    }
    .skill {
      display: flex;
      flex-direction: column;
      width: 25px;
      div {
        width: 25px;
        height: 25px;
        background: #ccc;
        box-shadow: $shadow;
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
  background: #fff;
  font-size: 12px;
  padding: 0 10px;
  :deep(.el-table__inner-wrapper) {
    .el-table__body-wrapper {
      .el-scrollbar {
        .el-scrollbar__bar .is-vertical {
          width: 10px;
          .el-scrollbar__thumb {
          }
        }
      }
    }
  }
}
.timeLine {
  width: 214px;
  height: 255px;
  padding: 5px 10px;
  background: #ccc;
  .card {
    height: 100%;
    width: auto;
    padding: 2px 10px;
    background: #fff;
    .name {
      background: #000;
      color: #fff;
      height: 25px;
      border-radius: 5px;
      width: 100%;
      line-height: 25px;
      text-align: center;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .el-timeline {
      border-radius: 5px;

      :deep(.el-timeline-item) {
        height: 40px;
        padding-bottom: 0;
        margin-top: 5px;
        .el-timeline-item__tail {
          height: 80%;
          margin-left: 11px;
          border-left: 2px solid #ccc;
          top: 27px;
        }
        .el-timeline-item__dot {
          width: 35px;
          height: 35px;
          font-size: 12px;
        }
        .el-timeline-item__wrapper {
          height: 100%;
          line-height: 40px;
          padding-left: 50px;
        }
      }
    }
    :deep(.el-timeline) {
      .el-timeline-item__center {
        &:first-child {
          height: 40px;
          padding: 0;
          background: #fff;
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
          .el-timeline-item__tail {
            top: 40px;
            height: 95%;
          }
          .el-timeline-item__dot {
            font-size: 20px;
          }
          .el-timeline-item {
            background: #fff;
          }
          .el-timeline-item__wrapper {
            .el-timeline-item__content {
              .el-card {
                box-shadow: none;
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>