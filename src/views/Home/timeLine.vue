<template>
  <div class="timeLine">
    <div class="card">
      <div class="name">Carmen Oritz</div>
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
import { ref, computed, onMounted, nextTick } from "vue";
import { Loading } from "@element-plus/icons-vue";
import characterApi from "../../api/characters";

const containerRef = ref(null);

// 数据状态
const allItems = ref([]);
let allItemsLength = ref(0);
const loadingTop = ref(false);
const loadingBottom = ref(false);
const scrollTop = ref(0);
const hasMore = ref(true);

const ITEM_HEIGHT = 70; // 预估每个时间线项高度
const BUFFER_SIZE = 6; // 缓冲项数
const PAGE_SIZE = 15; // 每页加载数量
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
// 加载新数据（向下滚动）
const loadMoreNewer = async () => {
  let isLoading = false;
  let lastLoadTime = 0;
  const now = Date.now();
  if (loadingBottom.value || now - lastLoadTime < 500) return;
  loadingBottom.value = true;
  lastLoadTime = now;
  try {
    const data = await characterApi.getTimeLine({
      characterId: 0,
      page_size: PAGE_SIZE,
      page: PAGE,
    });
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
      // 保持滚动位置
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
// 初始化
onMounted(() => {
  loadMoreNewer();
});

// 滚动处理
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
    // 向下滚动接近底部（加载更新数据）
    console.log(
      "totalHeight.value - clientHeight - 100",
      totalHeight.value - clientHeight - 100
    );
    if (st > totalHeight.value - clientHeight - 100) {
      loadMoreNewer();
      console.log("向下滚动接近底部（加载更新数据）");
    }
    // 向上滚动接近顶部（加载旧数据）
    if (st < 100) {
      // loadMoreOlder();
      // console.log("向上滚动接近顶部（加载旧数据）");
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
  border: 1px solid #ebeef5;
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
                display: -webkit-box; /* 关键：使用旧版弹性盒子模型 */
                -webkit-box-orient: vertical; /* 关键：内容垂直排列 */
                -webkit-line-clamp: 3; /* 关键：限制3行 */
                overflow: hidden; /* 关键：隐藏超出部分 */
                text-overflow: ellipsis; /* 显示省略号 */
                word-break: break-word; /* 长单词换行 */
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