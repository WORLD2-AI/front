<template>
  <div class="dialog-container">
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
      </div>
      <div class="bottom-section">
        <el-table
          :show-header="false"
          scrollbar-always-on
          :data="roleForm"
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
    <div class="tab-container">
      <div class="tabs">
        <button
          data-tab="schedule"
          class="tab-button active"
          @click="props.switchTab('schedule')"
        >
          Daily
        </button>
        <!-- <button
          data-tab="dialogue"
          class="tab-button"
          @click="props.switchTab('dialogue')"
        >
          Chat
        </button> -->
        <!-- <button
          data-tab="attributes"
          class="tab-button"
          @click="props.switchTab('attributes')"
        >
          Character
        </button> -->
      </div>
    </div>

    <div id="schedule" class="tab-content">
      <div class="schedule-content" id="character_schedule">
        <time-line :focusId="props.focusId"></time-line>
      </div>
    </div>

    <!-- <div id="dialogue" class="tab-content">
      <div class="chat-content">
        <div class="user_action" style="display: inline-block; color: #ebe7e7">
          Chat:
        </div>
        <div class="user_action" style="overflow-y: auto; height: 176px">
          <p id="dialog_content">None</p>
        </div>
      </div>
      <div class="input-section">
        <input
          type="text"
          class="chat-input"
          placeholder="input chat content..."
        />
        <button
          style="
            background-color: #c9a769;
            color: #1a2a1a;
            padding: 8px 4px;
            border: none;
            border-radius: 4px;
            margin-left: 10px;
          "
          @click="alert('Sorry, It will be ok as soon as possible.')"
        >
          Send
        </button>
      </div>
    </div> -->

    <div id="attributes" class="tab-content">
      <div class="schedule-content" id="character_info"></div>
    </div>

    <!-- <time-line :focusId="props.focusId"></time-line> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, defineAsyncComponent } from "vue";
import { Sunny } from "@element-plus/icons-vue";
import characters from "../../api/characters.js";
import userStore from "../../store/user.js";
// import TimeLine from "./timeLine.vue";
const userState = userStore();
const TimeLine = defineAsyncComponent(() => import("./timeLine.vue"));
const props = defineProps({
  focusId: {
    type: Number,
    required: true,
  },
  personNames: {
    type: Array,
    required: true,
  },
  displayMainBox: {
    type: Function,
  },
  displayGameDialog: {
    type: Function,
  },
  switchTab: {
    type: Function,
  },
});
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
watchEffect(() => {
  if (roles.value.length > 0) {
    let object = {};
    roles.value.forEach((element) => {
      if (element.id === props.focusId) {
        role.value = element;
        object = element;
      } else if (props.focusId) {
        roleForm.value = [];
      }
    });
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
}, [props.focusId]);
onMounted(() => {
  characters.getAllRoles().then((res) => {
    res.data.data && (roles.value = res.data.data);
  });
  props.switchTab("schedule");
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
  border: none;
  /* width: 290px; */
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
    height: 163px;
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
.dialog-container {
  width: 60%;
  height: 720px;
  background: linear-gradient(145deg, #0d1f0d 30%, #1a2a1a 100%);
  border: 2px solid #c9a769;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(201, 167, 105, 0.3);
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.header-section {
  padding: 16px;
  border-bottom: 1px solid #c9a76933;
  background: linear-gradient(to right, #1a2a1a, #0d1f0d);
}
.character-name {
  color: #c9a769;
  font-size: 18px;
  margin-bottom: 8px;
}

.character-info {
  display: flex;
  overflow-x: auto;
  height: 100px;
  white-space: nowrap;
  color: #c9a769;
  font-size: 18px;
  margin-bottom: 8px;
}

.location-info,
.user_action {
  color: #8d9e8d;
  font-size: 14px;
  margin-bottom: 4px;
}

.chat-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: rgba(13, 31, 13, 0.9);
  color: #8d9e8d;
}

.story-content {
  flex: 1;
  padding: 16px;
  background: rgba(13, 31, 13, 0.9);
  color: #8d9e8d;
  height: 400px;
}
.input-section {
  padding: 16px;
  border-top: 1px solid #c9a76933;
  display: flex;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 12px;
  background: #0d1f0d;
  border: 1px solid #c9a769;
  border-radius: 4px;
  color: #c9a769;
  font-family: inherit;
}

.chat-input:focus {
  outline: none;
  border-color: #9c7d4a;
  box-shadow: 0 0 8px rgba(201, 167, 105, 0.3);
}

.input-section button {
  background-color: #c9a769;
  color: #1a2a1a;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-section button:hover {
  background-color: #9c7d4a;
}

.tab-container {
  height: 30px;
  background-color: #1a2a1a;
  padding: 2px;
  border-bottom: 1px solid #c9a76933;
}

.tabs {
  display: flex;
  justify-content: space-around;
}

.tab-button {
  background-color: #1a2a1a;
  color: #c9a769;
  border: none;
  padding: 1px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 2px;
}

.tab-button.active {
  background-color: #c9a769;
  color: #1a2a1a;
}

.tab-content {
  display: none;
  padding: 16px;
  background: rgba(13, 31, 13, 0.9);
  color: #8d9e8d;
}

.tab-content.active {
  display: block;
}

/* .schedule-content {
  overflow-y: auto;
  max-height: 390px;
} */
</style>