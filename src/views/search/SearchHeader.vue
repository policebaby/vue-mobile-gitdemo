<template>
  <div>
    <div class="search-container">
      <div class="icon-and-title">
        <div class="iconfont icon-arrow-left" @click="$router.back()"></div>
        <div class="title">搜索</div>
      </div>
      <div class="input-container">
        <input
          v-model="keyword"
          @keypress.enter="search"
          @change="search"
          type="text"
          class="input"
          placeholder="请输入搜索信息"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchItems } from '@/network/innerAxios'
import Cookies from 'js-cookie'

export default {
  props: ['selectHistory'],
  data () {
    return {
      keyword: '',
      searchHistory: []
    }
  },
  mounted () {
    this.getSearchHistoryFromCookies()
  },
  methods: {
    search () {
      if (this.keyword) {
        this.searchHistory.unshift(this.keyword)
        this.setNewSearchHistoryToCookies()

        this.$emit('updateSearchHistory', this.searchHistory)
        // 获取和展示数据
        getSearchItems(this.keyword).then((res) => {
          this.$emit('searchData', res.data)
        })
      }
    },
    // 往cookies 添加搜索记录
    setNewSearchHistoryToCookies () {
      if (this.keyword) {
        this.searchHistory = [...new Set(this.searchHistory)]
        Cookies.set('searchHistory', JSON.stringify(this.searchHistory))
      }
    },
    // 从cookies 获取搜索历史记录, 这个不是用来展示, 是用来获取+存放的, 展示的在 history 组件
    getSearchHistoryFromCookies () {
      const history = Cookies.get('searchHistory')
      if (history) {
        const parsedHistory = JSON.parse(history)
        this.searchHistory = [...new Set(parsedHistory)]
      }
    }
  },
  watch: {
    selectHistory: {
      immediate: true,
      handler (newVal) {
        this.keyword = newVal
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  background-color: rgb(49, 194, 124);
  border: 1px solid transparent;
  .icon-and-title {
    display: flex;
    align-items: center;
    color: white;
    margin-top: 0.1rem;
    margin-bottom: -0.5rem;

    .iconfont {
      font-size: 0.8rem;
      z-index: 100;
    }

    .title {
      font-size: 0.4rem;
      margin-left: 35%;
    }
  }
  .input {
    width: 92%;
    height: 0.7rem;
    margin: 0 0.3rem 0.2rem 0.3rem;
    font-size: 0.3rem;
    padding-left: 0.2rem;
  }
}
</style>
