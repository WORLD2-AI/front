<template>
  <el-scrollbar
    height="400px"
    class="timeline-container"
    ref="containerRef"
    @scroll="handleScroll"
  >
    <!-- 顶部加载指示器 -->
    <div v-if="loadingTop" class="loading-indicator">
      <el-icon class="is-loading"><Loading /></el-icon>
    </div>

    <!-- 虚拟滚动容器 -->
    <div class="virtual-scroller" :style="{ height: `${totalHeight}px` }">
      <el-timeline
        class="timeline-content"
        :style="{ transform: `translateY(${offset}px)` }"
      >
        <el-timeline-item
          v-for="item in visibleItems"
          :key="item.id"
          placement="top"
        >
          <el-card>
            <h3>{{ item.action }}</h3>
            <!-- <p>{{ item. }}</p> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 底部加载指示器 -->
    <div v-if="loadingBottom" class="loading-indicator">
      <el-icon class="is-loading"><Loading /></el-icon>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { Loading } from "@element-plus/icons-vue";
import characterApi from "../../api/characters";
// 类型定义
// interface TimelineItem {
//   id: string;
//   title: string;
//   content: string;
//   timestamp: Date;
//   height: number;
// }

// 容器引用
const containerRef = ref(null);

// 数据状态
const allItems = ref([]);
const loadingTop = ref(false);
const loadingBottom = ref(false);
const scrollTop = ref(0);
const lastItemId = ref<string | null>(null);
const hasMore = ref(true);

// 配置参数
const ITEM_HEIGHT = 105; // 预估每个时间线项高度
const BUFFER_SIZE = 5; // 缓冲项数
const PAGE_SIZE = 15; // 每页加载数量

// 计算属性
const containerHeight = computed(() => containerRef.value?.clientHeight || 0);
const totalHeight = computed(() => allItems.value.length * ITEM_HEIGHT);
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
const offset = computed(() => startIndex.value * ITEM_HEIGHT);

// 模拟API请求
const fetchTimelineItems = async (params: {
  lastId?: string | null;
  direction?: "newer" | "older";
  pageSize: number;
}): Promise<TimelineItem[]> => {
  // console.log(allItems.value.length, "allItems.value.length");
  // console.log(offset.value, "offsetoffsetoffsetoffsetoffsetoffset");

  // 实际项目中替换为真实API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      const items: TimelineItem[] = [];
      const baseDate = params.lastId
        ? new Date(parseInt(params.lastId))
        : new Date();

      for (let i = 0; i < params.pageSize; i++) {
        const date = new Date(baseDate);
        if (params.direction === "older") {
          date.setMinutes(date.getMinutes() - i - 1);
        } else {
          date.setMinutes(date.getMinutes() + i + 1);
        }

        items.push({
          id: date.getTime().toString(),
          title: `事件 ${date.getTime().toString().slice(-4)}`,
          content: `这是事件 ${i + 1} 的详细内容描述`,
          timestamp: date,
          height: ITEM_HEIGHT,
        });
      }

      // 模拟是否还有更多数据
      if (params.direction === "older" && items.length > 10) {
        hasMore.value = false;
      }

      resolve(items);
    }, 800);
  });
};

// 初始加载数据
const loadInitialData = async () => {
  loadingBottom.value = true;
  try {
    const items = await fetchTimelineItems({
      pageSize: PAGE_SIZE,
    });
    allItems.value = items;
    if (items.length > 0) {
      lastItemId.value = items[items.length - 1].id;
    }
  } finally {
    loadingBottom.value = false;
  }
};

// 加载更多数据（向上滚动）
const loadMoreOlder = async () => {
  if (loadingBottom.value || !hasMore.value) return;

  loadingBottom.value = true;
  try {
    const items = await fetchTimelineItems({
      lastId: lastItemId.value,
      direction: "older",
      pageSize: PAGE_SIZE,
    });

    if (items.length > 0) {
      allItems.value = [...items, ...allItems.value];
      lastItemId.value = items[items.length - 1].id;
    }
  } finally {
    loadingBottom.value = false;
  }
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
      characterId: 1,
      page_size: 15,
      page: 1,
    });
    const items = data.data.activities;
    console.log(items, "items");

    // const items = await fetchTimelineItems({
    //   lastId: allItems.value[0]?.id,
    //   direction: "newer",
    //   pageSize: PAGE_SIZE,
    // });
    if (items.length > 0) {
      allItems.value = [...allItems.value, ...items.reverse()];
      // 保持滚动位置
      nextTick(() => {
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

// 滚动处理
let debounceTimer = null;

const handleScroll = () => {
  const containerNode = containerRef.value ? containerRef.value.wrapRef : null;
  if (!containerNode) return;

  if (debounceTimer) clearTimeout(debounceTimer);
  const { scrollTop: st, scrollHeight, clientHeight } = containerNode;
  console.log(st, "containerRef.value.wrapRef");

  scrollTop.value = st;
  // console.log({ scrollTop: st, scrollHeight, clientHeight });
  debounceTimer = setTimeout(() => {
    // 向下滚动接近底部（加载更新数据）
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

// 初始化
onMounted(() => {
  loadMoreNewer();
});
</script>

<style scoped>
.timeline-container {
  height: 100vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
}

.virtual-scroller {
  position: relative;
}

.timeline-content {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  padding: 10px;
  color: var(--el-color-primary);
}

.el-timeline-item {
  padding-bottom: 20px;
}

.el-card {
  margin-bottom: 10px;
}
</style>