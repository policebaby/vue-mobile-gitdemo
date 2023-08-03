<template>
  <div class="body">
    <!-- 搜索 -->
    <SearchHeader
      @searchData="showData"
      @updateSearchHistory="updateSearchHistory"
      :selectHistory="selectHistory"
    />
    <!-- 历史记录 -->
    <History :newHistory="newHistory"
    @selectHistory="historySendHeader"
    @clearHistory="clearHistory"
    />
    <!-- 历史列表 -->
    <div class="history-list" v-if="data.length">
      <div
        class="history-item"
        v-for="item in data"
        :key="item.id"
        @click="goDetail({ id: item.id, cid: item.classid, type: 'img' })"
      >
        {{ item.title }}
      </div>
    </div>
    <!-- 暂无内容 -->
    <div class="noData" v-if="!data.length">
      <div class="iconfont icon-warning">暂无内容</div>
    </div>
  </div>
</template>

<script>
import SearchHeader from '@/views/search/SearchHeader.vue'
import History from '@/views/search/History.vue'

export default {
  components: {
    SearchHeader,
    History
  },
  data () {
    return {
      data: [],
      newHistory: [],
      selectHistory: ''
    }
  },
  methods: {
    // 展示列表
    showData (e) {
      this.data = []
      this.data.push(...e)
    },
    // 同步历史记录
    updateSearchHistory (newHistory) {
      this.newHistory = newHistory
    },
    // 点击前往详情页main
    goDetail (obj) {
      this.$router.push({
        path: '/detail',
        query: obj
      })
    },
    // 点击历史消息
    historySendHeader (history) {
      console.log('成功')
      this.selectHistory = history
    },
    // 删除历史消息
    clearHistory () {
      this.newHistory = []
    }
  }
}
</script>

<style lang="less" scoped>
.history-list {
  background-color: white;
  border-radius: 0.1rem;
  padding: 0.1rem 0.1rem 0.3rem 0.1rem;
  font-size: 0.3rem;
  margin: 0.2rem;

  .history-item {
    position: relative; /* 用于创建相对于 .point 的定位上下文 */
    padding-left: 0.4rem; /* 为生成的点预留空间 */
    margin-top: 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // 老师的写法
  .history-item::before {
    content: "";
    display: block;
    background: green;
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
    position: absolute;
    left: -0.13rem;
    top: calc(50% - 0.15rem); //重要
    border: 0.08rem solid rgb(188, 247, 188);
    margin-left: 0.1rem;
  }
}

.noData {
  background-color: white;
  border-radius: 0.1rem;
  padding: 1rem 0.1rem 1rem 0.1rem;
  margin: 0.2rem;
  text-align: center;
  .iconfont{
    font-size: 0.5rem;
    color: rgb(188, 188, 188);

  }
}
</style>

<style>
body {
  background-color: rgb(244, 244, 244);
}
</style>
