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
        </div>
      </div>
      <div class="bottom-section">
        <el-table :data="tableData">
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="value" label="Value"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clanValue: "동백꽃단",
      ctValue: "동백의 명예",
      titleValue: "명예의 정점",
      tableData: [
        { name: "w", value: "무기" },
        { name: "a", value: "강화" },
        { name: "s", value: "보석" },
        { name: "h", value: "무슨" },
        { name: "l", value: "원소" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
.container {
  padding: 20px;
}
.card {
  width: 350px;
  padding: 10px;
  /* border-radius: 50% 50% 0 0; */
  background: #ccc;
  .top-section {
    height: 155px;
    position: relative;

    .arch {
      position: absolute;
      background: #fff;
      height: 150px;
      width: 100%;
      border: 1px solid #fff;
      border-radius: 50% 50% 0 0;
    }
    .clan {
      background: #fff;
      width: 100%;
      position: absolute;
      top: 75px;
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
    .role {
      background: #fff;
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
}
</style>