<template>
  <div class="timeLine">
    <div class="card">
      <div class="name">{{ name }}</div>
      <div class="ScrollBox">
        <el-scrollbar
          height="420px"
          class="timeline-container"
          ref="containerRef"
          @scroll="handleScroll"
          :style="{ height: `${totalHeight}px` }"
        >
          <el-timeline
            class="timeline-content"
            :style="{
              transform: `translateY(${offset}px)`,
            }"
          >
            <el-timeline-item
              center
              v-for="item in visibleItems"
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
                <div>{{ Toformatted(item.start_minute) }}</div>
              </template>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
        <div class="loading-indicator">
          <el-icon v-show="loadingBottom" class="is-loading"
            ><Loading
          /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { Loading } from "@element-plus/icons-vue";
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
const offset = computed(() => {
  console.log(startIndex.value, "startIndex.valuestartIndex.value");
  return startIndex.value * ITEM_HEIGHT;
});
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
  let lastLoadTime = 0;
  const now = Date.now();
  if (loadingBottom.value || now - lastLoadTime < 500) return;
  loadingBottom.value = true;
  lastLoadTime = now;
  try {
    const data = await characterApi.getTimeLine({
      characterId: focusId,
      page_size: PAGE_SIZE,
      page: PAGE,
    });
    name.value = data.data.name;
    const items = data.data.activities;
    // console.log(items.reverse(), "items.reverse()items.reverse()");

    // const items = await fetchTimelineItems({
    //   lastId: allItems.value[0]?.id,
    //   direction: "newer",
    //   pageSize: PAGE_SIZE,
    // });
    if (items.length > 0) {
      allItems.value = [...allItems.value, ...items];
      PAGE++;
      nextTick(() => {
        // Node setScrollTop

        allItemsLength.value = allItems.value.length;
        if (containerRef.value) {
          // console.log({
          //   scrollTop: containerRef.value.scrollTop,
          //   itemsLength: items.length,
          // });
          // containerRef.value.scrollTop = items.length * ITEM_HEIGHT;
        }
      });
    }
  } finally {
    loadingBottom.value = false;
  }
};
watch(
  () => props.focusId, // 监听的具体依赖
  (newVal, oldVal) => {
    allItems.value = [];
    allItemsLength.length = 0;
    console.log("props.focusId", "发生变化来更新");
    props.focusId && loadMoreNewer(props.focusId);
  },
  { immediate: true }
);
// initialization
// onMounted(() => {
//   loadMoreNewer();
// });

// Rolling processing
let debounceTimer = null;

const handleScroll = () => {
  containerRef.value.setScrollTop();
  const containerNode = containerRef.value ? containerRef.value.wrapRef : null;
  if (!containerNode) return;

  if (debounceTimer) clearTimeout(debounceTimer);
  const { scrollTop: st, scrollHeight, clientHeight } = containerNode;
  // console.log(st, "containerRef.value.wrapRef");

  scrollTop.value = st;
  console.log({
    scrollTop: st,
    scrollHeight,
    clientHeight,
    totalHeight: totalHeight.value,
    clientHeight,
  });
  debounceTimer = setTimeout(() => {
    console.log(
      "totalHeight.value - clientHeight - 100",
      totalHeight.value - clientHeight - 100
    );
    if (st > totalHeight.value - clientHeight - 100) {
      loadMoreNewer(props.focusId);
    }
    if (st < 100) {
      // loadMoreOlder();
    }
  }, 500);

  // if (scrollHeight - (st + clientHeight) < 100 && hasMore.value) {

  // }

  // if (st < 100 && allItems.value.length > 0) {
  //   loadMoreOlder();
  // }
};
</script>
<style lang="scss" scoped>
.ScrollBox {
  height: 420px;
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
  width: 290px;
  border: 2px solid #c9a769;
  background: linear-gradient(to right, #1a2a1a, #0d1f0d);
  .card {
    width: auto;
    padding: 5px 15px;
    background: linear-gradient(to right, #1a2a1a, #0d1f0d);
    color: #ebe7e7;
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