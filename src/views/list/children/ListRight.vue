<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <!-- Body -->
      <div class="content">
        <div class="item" v-for="item in listArr" :key="item.id">
          <NewestItem :itemObj="item" />
        </div>

        <!-- 上拉 -->
        <div class="loading_container">
          <div v-show="isMore && listArr.length > 1">正在加载中...</div>
          <div v-show="!isMore">没有更多数据了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewestItem from '@/components/NewestItem.vue'
import { getNavDetailsAxios } from '@/network/innerAxios.js'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  props: ['navId'],
  data () {
    return {
      listArr: [],
      page: 1,
      isMore: true,
      cid: 47
    }
  },
  components: {
    NewestItem
  },
  watch: {
    navId (newId) {
      this.listArr = []
      this.cid = newId
      this.getNavDetails()
      scrollTo(0, 0, 500)
    }
  },
  async mounted () {
    await this.getNavDetails()
    this.initBscroll()
  },
  methods: {
    async getNavDetails () {
      await getNavDetailsAxios(this.page, this.cid).then((res) => {
        if (res.data.length > 1) {
          this.listArr = this.listArr.concat(res.data)
        } else {
          this.isMore = false
        }
      })
    },
    initBscroll () {
      this.bscroll = new BScroll('.wrapper', {
        pullUpLoad: true,
        click: true
      })
      this.bscroll.on('pullingUp', this.pullUpFun)
    },
    async pullUpFun () {
      console.log('success')
      this.page++
      await this.getNavDetails()
      this.bscroll.finishPullUp()
      this.bscroll.refresh()
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: calc(100vh - 2rem);
  .content {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    padding-bottom: 1rem;
    .item {
      width: 46%;
    }
    .loading_container {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 0.3rem;
      color: grey;
    }
  }
}
</style>
