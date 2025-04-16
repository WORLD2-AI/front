<template>
  <div class="app-container">
    <!-- sidebar -->
    <el-aside class="sidebar">
      <div class="user-info">
        <el-avatar :size="80" :src="user.avatar" class="user-avatar" />
        <h1 class="user-name">{{ user.name }}</h1>
        <p class="user-phone">{{ user.phone }}</p>
        <p class="user-quote">{{ user.signature }}</p>
      </div>

      <el-menu class="nav-menu" :default-active="activeMenu">
        <el-menu-item index="personal" @click="activeMenu = 'personal'">
          <el-icon><User /></el-icon>
          <span>Personal Center</span>
        </el-menu-item>
        <el-menu-item index="roles" @click="activeMenu = 'roles'">
          <el-icon><Avatar /></el-icon>
          <span>Character Settings</span>
        </el-menu-item>
        <el-menu-item index="recharge" @click="activeMenu = 'recharge'">
          <el-icon><Wallet /></el-icon>
          <span>Recharge Account</span>
        </el-menu-item>
        <el-menu-item index="about" @click="activeMenu = 'about'">
          <el-icon><InfoFilled /></el-icon>
          <span>About Us</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- main-content -->
    <el-main class="main-content">
      <h2 class="content-title">Personal Center</h2>
      <div class="content-card">
        <div class="content-header">
          <div class="header-left" @click="editAvatar">
            <el-avatar :size="60" :src="user.avatar" />
            <span class="edit">edit</span>
          </div>
        </div>
        <div class="main">
          <!-- Personal Information Section -->
          <div v-show="activeMenu === 'personal'" class="info-section">
            <div class="info-grid">
              <div class="info-item">
                <label class="info-label">phone</label>
                <div class="info-value">
                  {{ user.phone }}<el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <el-divider />
              <div class="info-item">
                <label class="info-label">username</label>
                <div class="info-value">
                  {{ user.name }}<el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <el-divider />
              <div class="info-item">
                <label class="info-label">email</label>
                <div class="info-value">
                  {{ user.email }}<el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <el-divider />
              <div class="info-item">
                <label class="info-label">gender</label>
                <div class="info-value">
                  {{ user.gender }}<el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <el-divider />
              <div class="full-width">
                <div class="info-item">
                  <label class="info-label">signature</label>
                  <el-icon><ArrowRight /></el-icon>
                </div>
                <div class="info-value">
                  {{ user.signature }}
                </div>
              </div>
            </div>
            <div class="operation-grid">
              <el-divider />
              <div class="info-item">
                <label class="info-label">changePassword</label>
                <div class="info-value">
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <el-divider />
              <div class="logOut">
                <el-button class="logout-btn" @click="handleLogout">
                  <span>Log Out</span>
                </el-button>
              </div>
            </div>
            <div class="action-buttons">
              <el-button type="primary" plain @click="changePassword">
                <el-icon><Edit /></el-icon>
                <span>changePassword</span>
              </el-button>
            </div>
          </div>

          <!-- Role setting section -->
          <div v-show="activeMenu === 'roles'" class="roles-section">
            <el-table :data="roles" style="width: 100%">
              <el-table-column prop="name" label="name" width="180" />
              <el-table-column prop="level" label="level" width="100" />
              <el-table-column prop="createTime" label="createTime" />
              <el-table-column label="actions">
                <template #default="scope">
                  <el-button size="small" @click="editRole(scope.row)"
                    >edit</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(scope.row)"
                    >delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <div class="table-actions">
              <el-button type="primary" @click="addRole">
                <el-icon><Plus /></el-icon>
                <span>Register Role</span>
              </el-button>
            </div>
          </div>

          <!-- Recharge section -->
          <div v-show="activeMenu === 'recharge'" class="recharge-section">
            <div class="balance-info">
              <h3>
                current balance:
                <span class="balance-amount"
                  >¥{{ user.balance.toFixed(2) }}</span
                >
              </h3>
            </div>

            <div class="recharge-options">
              <el-radio-group v-model="rechargeAmount" class="recharge-amounts">
                <el-radio-button :label="10">¥10</el-radio-button>
                <el-radio-button :label="30">¥30</el-radio-button>
                <el-radio-button :label="50">¥50</el-radio-button>
                <el-radio-button :label="100">¥100</el-radio-button>
                <el-radio-button :label="200">¥200</el-radio-button>
              </el-radio-group>

              <el-input-number
                v-model="customAmount"
                :min="1"
                :max="10000"
                :precision="2"
                controls-position="right"
                class="custom-amount-input"
                placeholder="Custom amount"
              />
            </div>

            <div class="payment-methods">
              <h4>Payment method</h4>
              <el-radio-group v-model="paymentMethod">
                <el-radio label="alipay">
                  <span>PayPal</span>
                </el-radio>
                <el-radio label="wechat">
                  <span>Visa</span>
                </el-radio>
                <el-radio label="bank">
                  <span>Mastercard</span>
                </el-radio>
              </el-radio-group>
            </div>

            <div class="recharge-actions">
              <el-button type="primary" size="large" @click="handleRecharge">
                <span>Recharge now</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <!-- Avatar Editing Dialogue Box -->
    <el-dialog v-model="avatarDialogVisible" title="Avatar Editing" width="30%">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="avatarTempUrl" :src="avatarTempUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="avatarDialogVisible = false">cancel</el-button>
          <el-button type="primary" @click="saveAvatar">save</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Character Editing Dialogue Box -->
    <el-dialog v-model="roleDialogVisible" :title="roleDialogTitle" width="40%">
      <el-form :model="roleForm" label-width="100px">
        <el-form-item label="first_name">
          <el-input
            v-model="roleForm.first_name"
            placeholder="Please enter the role first_name"
          />
        </el-form-item>
        <el-form-item label="last_name">
          <el-input
            v-model="roleForm.last_name"
            placeholder="Please enter the role last_name"
          />
        </el-form-item>
        <el-form-item label="age" :min="1" :max="120">
          <el-input
            v-model.number="roleForm.age"
            placeholder="Please enter the role age"
          />
        </el-form-item>
        <el-form-item label="sex">
          <el-select
            v-model="roleForm.sex"
            placeholder="Please select the role sex"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="learned">
          <el-select
            v-model="roleForm.learned"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your article"
            style="width: 240px"
          >
            <el-option
              v-for="item in learnedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
            <template #footer>
              <el-button
                v-if="!isAdding"
                text
                bg
                size="small"
                @click="onAddOption"
              >
                Add an option
              </el-button>
              <template v-else>
                <el-input
                  v-model="optionName"
                  class="option-input"
                  placeholder="input option name"
                  size="small"
                />
                <el-button type="primary" size="small" @click="onConfirm">
                  confirm
                </el-button>
                <el-button size="small" @click="clear">cancel</el-button>
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="currently">
          <el-input v-model="roleForm.currently" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="lifestyle">
          <el-select
            v-model="roleForm.lifestyle"
            placeholder="Please select the role lifestyle"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in lifestyleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="roleDialogVisible = false">cancel</el-button>
          <el-button type="primary" @click="saveRole">Register</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  User,
  Avatar,
  Wallet,
  InfoFilled,
  SwitchButton,
  Document,
  Edit,
  Plus,
  ArrowRight,
} from "@element-plus/icons-vue";

// Role registration information
let sexOptions = [
  {
    label: "male",
    value: 0,
  },
  {
    label: "female",
    value: 1,
  },
  {
    label: "other",
    value: 2,
  },
];
let learnedOptions = ref([
  {
    label: "fishing",
    value: 0,
  },
  {
    label: "cooking",
    value: 1,
  },
  {
    label: "programming",
    value: 2,
  },
]);
let lifestyleOptions = ref([
  {
    label: "earlyRiser",
    value: 0,
  },
  {
    label: "Neutral",
    value: 1,
  },
  {
    label: "nightOwl",
    value: 2,
  },
]);
const isAdding = ref(false);
const optionName = ref("");
const onAddOption = () => {
  isAdding.value = true;
};

const onConfirm = () => {
  if (optionName.value) {
    learnedOptions.value.push({
      label: optionName.value,
      value: learnedOptions.value.length,
    });
    clear();
  }
};

const clear = () => {
  optionName.value = "";
  isAdding.value = false;
};

// userData

const user = ref({
  name: "Danny",
  phone: "133****1573",
  email: "example@example.com",
  gender: "male",
  quote:
    "Buddha never forced others to do things he didn't like, he just told sentient beings.",
  signature:
    "Buddha never forced others to do things he didn't like. Buddha only told sentient beings what is good? What is evil? Good and evil still need to be chosen by oneself, and life still needs to be controlled by oneself",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  balance: 123.45,
});

// rolesDate
const roles = ref([
  {
    id: 1,
    name: "administrators",
    level: 99,
    createTime: "2023-01-15",
    description: "System administrator role",
  },
  {
    id: 2,
    name: "Ordinary users",
    level: 1,
    createTime: "2023-02-20",
    description: "Ordinary user role",
  },
  {
    id: 3,
    name: "VIP Member",
    level: 50,
    createTime: "2023-03-10",
    description: "VIP member role",
  },
]);

// Current activation menu
const activeMenu = ref("personal");

// Recharge related
const rechargeAmount = ref(10);
const customAmount = ref(null);
const paymentMethod = ref("alipay");

// Avatar Editing
const avatarDialogVisible = ref(false);
const avatarTempUrl = ref("");

// Character Editing
const roleDialogVisible = ref(false);
const roleForm = ref({
  first_name: "",
  last_name: "",
  age: null,
  sex: null,
  innate: "",
  learned: null,
  currently: "",
  lifestyle: null,
});
const isEditRole = ref(false);

// computed
const roleDialogTitle = computed(() =>
  isEditRole.value ? "Edit Role" : "Register  Role"
);
const finalRechargeAmount = computed(
  () => customAmount.value || rechargeAmount.value
);

// Function
const handleLogout = () => {
  console.log("handleLogout");
};

const changePassword = () => {
  console.log("changePassword");
};

const editAvatar = () => {
  avatarTempUrl.value = user.value.avatar;
  avatarDialogVisible.value = true;
};

const handleAvatarSuccess = (response, file) => {
  avatarTempUrl.value = URL.createObjectURL(file.raw);
};

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    ElMessage.error("Avatar images can only be in JPG/PNG format");
    return false;
  }
  if (!isLt2M) {
    ElMessage.error("The size of the avatar image cannot exceed 2MB!");
    return false;
  }
  return true;
};

const saveAvatar = () => {
  user.value.avatar = avatarTempUrl.value;
  avatarDialogVisible.value = false;
  ElMessage.success("Avatar updated successfully");
};

const addRole = () => {
  isEditRole.value = false;
  roleForm.value = {
    id: null,
    name: "",
    level: 1,
    description: "",
  };
  roleDialogVisible.value = true;
};

const editRole = (role) => {
  isEditRole.value = true;
  roleForm.value = { ...role };
  roleDialogVisible.value = true;
};

const deleteRole = (role) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete the role "${role.name}" ?`,
    "prompt",
    {
      confirmButtonText: "sure",
      cancelButtonText: "cancel",
      type: "warning",
    }
  )
    .then(() => {
      roles.value = roles.value.filter((r) => r.id !== role.id);
      ElMessage.success("Delete successfully");
    })
    .catch(() => {});
};

const saveRole = () => {
  console.log(roleForm.value);
  if (isEditRole.value) {
    // Update Role
    const index = roles.value.findIndex((r) => r.id === roleForm.value.id);
    if (index !== -1) {
      roles.value[index] = { ...roleForm.value };
    }
    ElMessage.success("Role update successful");
  } else {
    // New Role
    const newRole = {
      ...roleForm.value,
      id: roles.value.length
        ? Math.max(...roles.value.map((r) => r.id)) + 1
        : 1,
      createTime: new Date().toISOString().split("T")[0],
    };
    roles.value.push(newRole);
    ElMessage.success("Role added successfully");
  }
  // roleDialogVisible.value = false;
};

const handleRecharge = () => {
  ElMessageBox.confirm(
    `Are you sure you want to recharge ¥${finalRechargeAmount.value} ?`,
    "Confirm recharge",
    {
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      user.value.balance += finalRechargeAmount.value;
      ElMessage.success(
        `Recharge successful! current balance: ¥${user.value.balance.toFixed(
          2
        )}`
      );
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #e5e6e7;

  .sidebar {
    width: 280px;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: all 0.3s;

    .user-info {
      padding: 24px 20px;
      border-bottom: 1px solid #eee;
      text-align: center;

      .user-avatar {
        margin-bottom: 16px;
        cursor: pointer;
        border: 2px solid #eee;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }
      }

      .user-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
        color: #333;
      }

      .user-phone {
        font-size: 14px;
        color: #666;
        margin-bottom: 12px;
      }

      .user-quote {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        font-size: 12px;
        color: #999;
        font-style: italic;
        line-height: 1.5;
      }
    }

    .nav-menu {
      flex: 1;
      border-right: none;
      padding: 0 10px;

      :deep(.el-menu-item) {
        height: 48px;
        line-height: 48px;
        margin: 4px 0;
        border-radius: 6px;

        &.is-active {
          background-color: #ecf5ff;
          color: #409eff;
        }

        &:hover {
          background-color: #f5f7fa;
        }

        .el-icon {
          font-size: 18px;
          margin-right: 8px;
        }
      }
    }
  }
  .el-main {
    padding: 0;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .content-title {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      color: #333;
      background: #fff;
    }

    .content-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #e5e6e7;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
      padding: 24px;
      .content-header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;

        .header-left {
          position: relative;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 50%;
          overflow: hidden;
          .edit {
            opacity: 0;
            font-size: 12px;
            width: 100%;
            text-align: center;
            position: absolute;
            background: #333;
            color: #fff;
            bottom: 0;
            left: 0;
          }
          &:hover {
            .edit {
              opacity: 1;
            }
            transform: scale(1.05);
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

            .header-avatar {
            }
          }
        }

        .logout-btn {
          .el-icon {
            margin-right: 6px;
          }
        }
      }
      .main {
        flex: 1;
        padding: 5px 0px;
        background: #fff;
        .info-section {
          .info-grid {
            padding: 0 20px;
            /* display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px; */
            margin: 24px 0;
            .el-divider {
              margin: 0px;
              border-top: 3px solid #fcfcfc;
            }
            .info-item {
              min-height: 50px;
              margin-bottom: 12x;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .info-label {
                font-size: 20px;
                /* color: #888; */
                margin-bottom: 8px;
              }

              .info-value {
                font-size: 18px;
                color: #333;
                display: flex;
                align-items: center;
              }
            }
            .full-width {
              display: flex;
              flex-direction: column;
              .info-item {
                min-height: 40px;
                margin-bottom: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 18px;
                .info-label {
                  font-size: 20px;
                  margin-bottom: 8px;
                }
              }
              .info-value {
                font-size: 12px;
                color: #666;
                font-style: italic;
                padding: 12px;
                background-color: #fff;
                border-radius: 4px;
              }
            }
          }
          .operation-grid {
            .logout-btn {
              width: 100%;
              height: 50px;
              color: red;
              font-weight: 600;
            }
            .el-divider {
              margin: 0px;
              border-top: 10px solid #e6e6e6;
            }
            .info-item {
              min-height: 50px;
              margin-bottom: 12x;
              padding: 0 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .info-label {
                font-size: 20px;
                /* color: #888; */
                margin-bottom: 8px;
              }

              .info-value {
                font-size: 18px;
                color: #333;
                display: flex;
                align-items: center;
              }
            }
          }
          .action-buttons {
            margin-top: 32px;
            text-align: center;

            .el-button {
              margin: 0 12px;

              .el-icon {
                margin-right: 6px;
              }
            }
          }
        }

        .roles-section {
          .table-actions {
            margin-top: 20px;
            text-align: right;

            .el-button {
              .el-icon {
                margin-right: 6px;
              }
            }
          }
        }

        .recharge-section {
          .balance-info {
            margin-bottom: 24px;
            text-align: center;

            .balance-amount {
              font-size: 24px;
              color: #f56c6c;
              font-weight: bold;
            }
          }

          .recharge-options {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;

            .recharge-amounts {
              margin-bottom: 10px;
            }

            .custom-amount-input {
              width: 200px;
            }
          }

          .payment-methods {
            margin-bottom: 30px;
            text-align: center;

            h4 {
              margin-bottom: 16px;
              color: #666;
            }

            .el-radio-group {
              display: flex;
              justify-content: center;
              gap: 30px;

              .el-radio {
                display: flex;
                align-items: center;

                .el-icon {
                  font-size: 24px;
                  margin-right: 6px;
                }
              }
            }
          }

          .recharge-actions {
            text-align: center;

            .el-button {
              width: 200px;
              height: 48px;
              font-size: 16px;

              .el-icon {
                font-size: 20px;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
}

// Avatar upload style
:deep(.avatar-uploader) {
  .avatar {
    width: 100%;
    height: auto;
    display: block;
  }

  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-color: var(--el-color-primary);
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }
}

/* @media (max-width: 768px) {
  .app-container {
    flex-direction: column;

    .sidebar {
      width: 100%;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .main-content {
      padding: 16px;

      .content-card {
        padding: 16px;

        .info-grid {
          grid-template-columns: 1fr;

          .info-item.full-width {
            grid-column: span 1;
          }
        }

        .recharge-section {
          .payment-methods {
            .el-radio-group {
              flex-direction: column;
              gap: 10px;
            }
          }
        }
      }
    }
  }
} */
</style>