<template>
    <div>
      <HeaderView />
      <div class="insMain" ref="insMain">
        <div class="content">
          <!-- 下拉 -->
          <div class="upDown">
            <div v-show="isUpDown">下拉刷新</div>
            <div v-show="!isUpDown">
              <div v-show="isLoad">正在加载中...</div>
              <div v-show="!isLoad">请求成功</div>
            </div>
          </div>
          <!-- Body -->
          <div class="insBody">
            <div class="item" v-for="(item, index) in list" :key="index">
              <NewestItem :itemObj="item" />
            </div>
          </div>

          <!-- 上拉 -->
          <div class="loading_container">
            <div v-show="isMore && list.length > 1">正在加载中...</div>
            <div v-show="!isMore">没有更多数据了</div>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import TabBar from '@/components/tabBar/TabBar.vue'
import NewestItem from '@/components/NewestItem.vue'
import { getAllNewest } from '@/network/innerAxios.js'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'

BScroll.use(Pullup)
BScroll.use(PullDown)

export default {
  data () {
    return {
      list: [],
      page: 1,
      isMore: true,
      isUpDown: true,
      isLoad: true
    }
  },
  components: {
    HeaderView,
    TabBar,
    NewestItem
  },
  async mounted () {
    await this.getInsData()
    this.initBscroll()
  },
  methods: {
    // 初始化Bscroll
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.insMain, {
        pullUpLoad: true,
        pullDownRefresh: true,
        click: true
      })
      this.bscroll.on('pullingUp', this.pullUpFun)
      this.bscroll.on('pullingDown', this.pullDownFun)
    },

    // 获取数据
    async getInsData () {
      await getAllNewest(this.page).then((res) => {
        if (res.data.length > 0) {
          console.log(res)
          this.list = this.list.concat(res.data)
        } else {
          this.isMore = false
        }
      })
    },

    // 上拉
    async pullUpFun () {
      this.page++
      await this.getInsData()
      this.bscroll.finishPullUp()
      this.bscroll.refresh()
    },

    // 下拉
    async pullDownFun () {
      this.isMore = true

      this.page = 1
      this.list = []
      this.isUpDown = false
      await this.getInsData()
      this.isLoad = false
      setTimeout(() => {
        this.isUpDown = true
      }, 1000)
      this.bscroll.finishPullDown()
      this.bscroll.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
.insMain {
  height: calc(100vh - 2rem);
  overflow: hidden;
  padding: 0.1rem;

  .insBody {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
    }
  }

  .upDown {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 0.3rem;
    color: grey;
    position: absolute; // 使用绝对定为脱离文档流
    top: 0;
    transform: translateY(-100%);
  }

  .loading_container {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 0.3rem;
    color: grey;
  }
}
</style>
