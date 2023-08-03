<template>
  <div>
    <HeaderView />
    <div class="articleContainer">
      <div class="content">
        <div class="upDown">
          <div v-show="isUpDown">下拉刷新</div>
          <div v-show="!isUpDown">
            <div v-show="isLoad">正在加载中...</div>
            <div v-show="!isLoad">请求成功</div>
          </div>
        </div>
        <ArtItem
          v-for="(item, index) in artArrList"
          :key="index"
          :article="item"
        />
        <div class="loading_container">
          <div v-show="isMore && artArrList.length > 1">正在加载中...</div>
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
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import { getAllArt } from '@/network/innerAxios'
import ArtItem from '@/components/ArtItem.vue'

BScroll.use(Pullup)
BScroll.use(PullDown)

export default {
  components: {
    HeaderView,
    TabBar,
    ArtItem
  },
  async mounted () {
    await this.getArtData()
    this.bscroll = new BScroll('.articleContainer', {
      pullUpLoad: true,
      pullDownRefresh: true,
      click: true
    })
    this.bscroll.on('pullingUp', this.pullUpFunction)
    this.bscroll.on('pullingDown', this.pullDownFunction)
  },
  //   数据
  data () {
    return {
      artArrList: [],
      page: 1,
      isMore: true,
      isUpDown: true,
      isLoad: true
    }
  },
  methods: {
    // 上拉 获取数据+结束该次滚动+更新DOM
    async pullUpFunction () {
      await this.getArtData()
      console.log('上拉success')
      this.bscroll.finishPullUp()
      this.bscroll.refresh()
    },

    // 下拉刷新
    async pullDownFunction () {
      this.isMore = true

      this.isUpDown = false
      this.page = 1
      this.artArrList = []
      this.isLoad = true
      await this.getArtData()
      console.log('下拉success')
      this.isLoad = false
      this.bscroll.finishPullDown()
      this.bscroll.refresh()
      //   下拉刷新
      setTimeout(() => {
        this.isUpDown = true
      }, 1000)
    },

    // 获取数据api请求
    async getArtData () {
      await getAllArt(this.page).then((res) => {
        if (res.data.length) {
          this.page++
          this.artArrList = this.artArrList.concat(res.data)
        } else {
          this.isMore = false
        }
      })
    }
  }
}
</script>

  <style lang="less" scoped>
.articleContainer {
  height: calc(100vh - 2rem);
  overflow: hidden;
  padding: 0.1rem;

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
