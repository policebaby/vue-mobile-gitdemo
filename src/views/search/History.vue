<template>
  <div>
    <div class="title-and-icon">
      <div class="title">历史记录</div>
      <div class="iconfont icon-ashbin" @click="removeCookie"></div>
    </div>
    <div class="histories">
      <template v-if="!newHistory.length">
        <div
          class="history-item"
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="sendHistory(item)"
        >
          {{ item }}
        </div>
      </template>
      <template v-else>
        <div
          class="history-item"
          v-for="(item, index) in newHistory"
          :key="index"
          @click="sendHistory(item)"
        >
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  props: ['newHistory'],
  data () {
    return {
      searchHistory: []
    }
  },
  mounted () {
    this.getSearchHistoryFromCookies()
  },
  methods: {
    // 从cookies 获取搜索历史记录
    getSearchHistoryFromCookies () {
      const history = Cookies.get('searchHistory')
      if (history) {
        const parsedHistory = JSON.parse(history)
        this.searchHistory = [...new Set(parsedHistory)]
      }
    },
    // 清除 cookieså
    removeCookie () {
      console.log('success')
      Cookies.remove('searchHistory')
      this.searchHistory = []
      // 因为prop newHistory 无法直接修改, emit给父组件事件, 让父组件修改
      this.$emit('clearHistory')
    },
    // 发送消息给 header
    sendHistory (item) {
      console.log(item)
      this.$emit('selectHistory', item)
    }
  }
}
</script>

<style lang="less" scoped>
.title-and-icon {
  display: flex;
  height: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
  .title {
    font-size: 0.3rem;
    font-weight: bold;
  }
  .iconfont {
    font-size: 0.4rem;
    color: gray;
  }
}

.histories {
  display: flex;
  font-size: 0.3rem;
  flex-wrap: wrap;
  .history-item {
    background-color: rgb(255, 255, 255);
    margin: 0.1rem;
    border-radius: 40%;
    padding: 0.1rem 0.2rem;
  }
}
</style>
