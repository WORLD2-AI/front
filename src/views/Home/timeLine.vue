<template>
  <div class="timeLine">
    <div class="card">
      <div class="name">{{ name }}</div>
      <div class="ScrollBox">
        <el-scrollbar
          height="250px"
          class="timeline-container"
          ref="containerRef"
          :style="{
            scrollTop: `500px`,
          }"
        >
          <!-- @scroll="handleScroll" -->
          <!-- :style="{ height: `${totalHeight}px` }" -->

          <el-timeline class="timeline-content">
            <el-timeline-item
              center
              v-for="(item, index) in allItems"
              :key="item.start_minute"
            >
              <el-card>
                <div class="icon">
                  <!-- <el-icon><Sunny /></el-icon> -->
                  <img :src="item.icon_path" alt="" />
                </div>
                <div class="content">
                  <p>{{ item.action }}</p>
                </div>
              </el-card>
              <template #dot>
                <template v-if="index === allItems.length - 1">
                  <el-icon><CaretRight /></el-icon>
                </template>
                <div>{{ Toformatted(item.start_minute) }}</div>
              </template>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
        <!-- <div class="loading-indicator">
          <el-icon v-show="loadingBottom" class="is-loading"
            ><Loading
          /></el-icon>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from "vue";
import { CaretRight } from "@element-plus/icons-vue";
import characterApi from "../../api/characters";
const props = defineProps({
  focusId: {
    type: Number,
    required: true,
  },
});
const containerRef = ref(null);

// Data status
const allItems = ref([]);
const allItemsLength = ref(0);
const name = ref("");
const loadingTop = ref(false);
const loadingBottom = ref(false);
const scrollTop = ref(0);
const hasMore = ref(true);

const ITEM_HEIGHT = 70; // Estimate the height of each timeline item
const BUFFER_SIZE = 6; // Number of buffer items
const PAGE_SIZE = 15; // Number of loads per page
let PAGE = 1;
let timeInterval;
const offset = ref(0);

const containerHeight = computed(
  () => containerRef.value?.wrapRef?.clientHeight || 0
);
const totalHeight = computed(() => allItemsLength.value * ITEM_HEIGHT);
const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER_SIZE)
);
const endIndex = computed(() => {
  const visibleCount = Math.ceil(containerHeight.value / ITEM_HEIGHT);
  return Math.min(
    startIndex.value + visibleCount + BUFFER_SIZE * 2,
    allItems.value.length - 1
  );
});
const visibleItems = computed(() =>
  allItems.value.slice(startIndex.value, endIndex.value + 1)
);
const Toformatted = (start_minute) => {
  let startHour = Math.floor(start_minute / 60);
  const startMinute = start_minute % 60;
  const formattedStartTime = `${startHour
    .toString()
    .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;
  return formattedStartTime;
};
// Load new data (scroll down)
const loadMoreNewer = async (focusId) => {
  let isLoading = false;
  const now = Date.now();
  loadingBottom.value = true;
  try {
    const data = await characterApi.getTimeLine({
      characterId: focusId,
      page_size: PAGE_SIZE,
      page: PAGE,
    });
    name.value = data.data.name;
    const items = data.data.activities;
    // if (items.length > 0) {
    allItems.value = items;
    nextTick(() => {
      allItemsLength.value = allItems.value.length;
    });
    // }
  } finally {
    loadingBottom.value = false;
  }
};
watch(
  () => props.focusId,
  (newVal, oldVal) => {
    console.log("props.focusId:", props.focusId);
    timeInterval && clearInterval(timeInterval);
    props.focusId && loadMoreNewer(props.focusId);
    timeInterval = setInterval(() => {
      props.focusId && loadMoreNewer(props.focusId);
    }, 60 * 60);
  },
  { immediate: true }
);

// initialization
onMounted(() => {
  watch(
    () => allItemsLength.value,
    (newVal, oldVal) => {
      containerRef.value?.scrollTo({
        top: allItemsLength.value * ITEM_HEIGHT,
        behavior: "smooth", // smooth scrolling
      });
    },
    { immediate: true }
  );
  timeInterval = setInterval(() => {
    props.focusId && loadMoreNewer(props.focusId);
  }, 60 * 60);
});
onUnmounted(() => {
  clearInterval(timeInterval);
});
</script>
<style lang="scss" scoped>
.ScrollBox {
  overflow: hidden;
  position: relative;
  .loading-indicator {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    color: var(--el-color-primary);
  }
}
.timeline-container {
  overflow: auto;
  position: relative;
}

.virtual-scroller {
  position: relative;
}

.timeline-content {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.el-timeline-item {
  padding-bottom: 20px;
}

.el-card {
  margin-bottom: 10px;
}
.timeLine {
  /* width: 290px; */
  /* border: 2px solid #c9a769; */
  background: linear-gradient(to right, #1a2a1a, #0d1f0d);
  .card {
    width: auto;
    padding: 5px 15px;
    background: linear-gradient(to right, #1a2a1a, #0d1f0d);
    color: #8d9e8d;
    .name {
      background: #000;
      height: 40px;
      border-radius: 5px;
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .el-timeline {
      width: 100%;
      :deep(.el-timeline-item) {
        border-radius: 10px;
        height: 60px;
        /* width: 260px; */
        margin-top: 10px;
        padding: 0;
        .el-timeline-item__tail {
          left: 0;
          margin-left: 30px;
          height: 56px;
          border-left: 3px solid #c9a769;
          top: 37px;
        }
        &:last-child {
          .el-timeline-item__dot {
            div {
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
            .el-icon {
              font-size: 18px;
              position: absolute;
              left: -8px;
              top: 20px;
            }
          }
        }
        .el-timeline-item__dot {
          width: 60px;
          height: 100%;
          display: block;
          text-align: center;
          line-height: 60px;
          position: relative;
          .el-icon {
            font-size: 18px;
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
        .el-timeline-item__wrapper {
          height: 100%;
          .el-card__body {
            background: #c9a769;
            opacity: 0.8;
            display: flex;
            .icon {
              flex-shrink: 0;
              width: 60px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 45px;
                height: 45px;
              }
              .el-icon {
                font-size: 45px;
              }
            }
            .content {
              p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
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
        /* &:first-child {
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
        } */
      }
    }
  }
}
</style>