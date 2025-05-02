<template>
  <div class="container">
    <el-card class="card">
      <div class="top-section">
        <div class="arch"></div>
        <div class="clan">
          <el-row>
            <el-col :span="6">Age</el-col>
            <el-col :span="18">{{ role.age }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Sex</el-col>
            <el-col :span="18">{{ role.sex }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">Name</el-col>
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
    <div class="timeLine">
      <div class="card">
        <div class="name">Carmen Oritz</div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item center>
            <el-card>
              <div class="content">
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/12 20:46</p>
              </div>
            </el-card>
            <template #dot>
              <el-icon><Sunny /></el-icon>
            </template>
          </el-timeline-item>
          <el-timeline-item center>
            <el-card>
              <div class="icon">
                <el-icon><Sunny /></el-icon>
              </div>
              <div class="content">
                <h4>Update Github template</h4>
              </div>
            </el-card>
            <template #dot>
              <div>6:00</div>
            </template>
          </el-timeline-item>
          <el-timeline-item center>
            <el-card>
              <div class="icon">
                <el-icon><Sunny /></el-icon>
              </div>
              <div class="content">
                <h4>Update Github template</h4>
              </div>
            </el-card>
            <template #dot>
              <div>9:00</div>
            </template>
          </el-timeline-item>
          <el-timeline-item placement="top" center>
            <el-card>
              <div class="icon">
                <el-icon><Sunny /></el-icon>
              </div>
              <div class="content">
                <h4>Update Github template</h4>
              </div>
            </el-card>
            <template #dot>
              <div>15:00</div>
            </template>
          </el-timeline-item>
          <el-timeline-item placement="top" center>
            <el-card>
              <div class="icon">
                <el-icon><Sunny /></el-icon>
              </div>
              <div class="content">
                <h4>Update Github template</h4>
              </div>
            </el-card>
            <template #dot>
              <div>21:00</div>
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
  characters.getRoles().then((res) => {
    roles.value = res.data;
    role.value = roles.value[0];
    let object = roles.value[0];
    if (roles.value.length > 0) {
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
.container {
  padding: 20px;
  /* display: flex; */
}
.card {
  width: 290px;
  height: auto;
  padding: 5px;
  :deep(.el-card__body) {
    padding: 0;
  }
  /* border-radius: 50% 50% 0 0; */
  background: #ccc;
  .top-section {
    height: 130px;
    position: relative;
    overflow: hidden;
    .arch {
      position: absolute;
      background: #fff;
      height: 130px;
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
      padding: 0 20px;
      .el-row {
        .el-col {
          &:nth-child(1) {
            height: 27px;
            line-height: 27px;
            font-size: 14px;
            text-align: center;
            background: #ccc;
          }
          &:nth-child(2) {
            box-shadow: $shadow;
            height: 27px;
            line-height: 27px;
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
    height: 27px;
    padding: 0 20px;
    div {
      box-shadow: $shadow;
      padding-right: 10px;
      height: 100%;
      flex: 1;
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
        box-shadow: $shadow;
      }
      .body {
        width: 68px;
        height: 87px;
        background: #ccc;
        box-shadow: $shadow;
      }
      .replacement {
        transform: translateY(-30px);
        width: 103px;
        display: flex;
        justify-content: space-between;
        span {
          background: #ccc;
          box-shadow: $shadow;
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
  padding: 0 20px;
  .el-table--fit {
    border: 2px solid #ccc;
  }
  :deep(.el-table__inner-wrapper) {
    .el-table__body-wrapper {
      .el-scrollbar {
        .el-scrollbar__bar.is-vertical {
          width: 10px;
          .el-scrollbar__thumb {
          }
        }
      }
    }
  }
}
.timeLine {
  width: 290px;
  background: #ccc;
  .card {
    width: auto;
    padding: 5px 15px;
    background: #fff;
    .name {
      background: #000;
      color: #fff;
      height: 40px;
      border-radius: 5px;
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .el-timeline {
      :deep(.el-timeline-item) {
        border-radius: 10px;
        height: 60px;
        width: 260px;
        margin-top: 10px;
        padding: 0;
        .el-timeline-item__tail {
          left: 0;
          margin-left: 30px;
          height: 56px;
          border-left: 3px solid #ccc;
          top: 37px;
        }
        .el-timeline-item__dot {
          width: 60px;
          height: 100%;
          .el-icon {
            font-size: 45px;
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
        .el-timeline-item__wrapper {
          height: 100%;
          padding-left: 60px;
          .el-card__body {
            display: flex;
            .icon {
              flex-shrink: 0;
              width: 60px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              .el-icon {
                font-size: 45px;
              }
            }
            padding: 5px;
          }
          .el-timeline-item__content {
            .el-card {
              border-radius: 10px;
              border: none;
            }
          }
        }
        .el-timeline-item__timestamp {
          margin-bottom: 0;
          padding: 0;
        }
      }
    }
    :deep(.el-timeline) {
      .el-timeline-item__center {
        &:last-child {
          overflow: hidden;
        }
        &:first-child {
          padding: 0;
          background: #fff;
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
          .el-timeline-item__tail {
            top: 60px;
            height: 33px;
          }
          .el-timeline-item__dot {
            z-index: 100;
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