<template>
  <div>
    <!-- 顶部导航 -->
    <div class="header-container">
      <div
        class="iconfont icon-arrow-left"
        @click="$router.back()"
      ></div>
      <div class="title">
        {{ data.title }}
      </div>
    </div>

    <!-- 标题与图片 -->
    <div class="article-image-container">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="img">
        <img :src="data.picurl" />
      </div>
    </div>

    <!-- 详情 -->
    <div class="description">
      <p>
        {{ data.description }}
      </p>
    </div>

    <!-- 详情描述 -->
    <div class="description-detail" v-html="data.content"></div>

    <!-- 文章信息 -->
    <div class="article-info" v-show="data.posttime">
      <div>发布日期: {{ dateFormatter(data.posttime) }}</div>
      <div>分类: {{ classid }}</div>
      <div>阅读量: {{ viewsFormatter(data.hits) }}</div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/network/innerAxios'
import common from '@/assets/js/common'

export default {
  name: 'Detail',
  data () {
    return {
      data: {},
      previousPath: '/',
      hotFix:'',
      ConflictTestThisIsMainBranch:'',
      master:''
    }
  },
  // 路由导航
  beforeRouteEnter (to, from, next) {
    console.log(from)
    next((vm) => {
      vm.previousPath = from.path
    })
  },
  methods: {
    // api 获取详情数据
    async getDetailData () {
      await getDetail(
        this.$route.query.id,
        this.$route.query.cid,
        this.$route.query.type
      ).then((res) => {
        this.data = res.data
      })
    },

    // 获取菜单数据 (老师的实现方法)
    // async getNav() {
    //   await getNavAxios().then((res) => {
    //     res.data.forEach((element) => {
    //        console.log(element.id)
    //       if (element.id == this.data.classid) {
    //         console.log('ifsuccess')
    //         this.data.classname = element.classname;
    //       }
    //     });
    //   });
    // },

    // 格式化时间
    dateFormatter (time) {
      return common.dateFormatter(time, 3)
    },

    // 格式化阅读量
    viewsFormatter (views) {
      return common.viewsFormatter(views)
    }
  },
  async mounted () {
    await this.getDetailData()
    console.log(this)
  },
  computed: {
    classid () {
      const cid = {
        4: '企业站',
        5: '电商酷站',
        8: '酷站',
        14: '灵感创意',
        15: '各行大神',
        16: '文章干货'
      }
      return cid[this.data.classid]
    }
  }
}
</script>

<style lang="less" scoped>
// 顶部导航
.header-container {
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  height: 1rem;
  background-color: rgb(49, 194, 124);
  color: white;
  padding: 0 0.3rem;
  position: sticky;
  top: 0;

  .iconfont {
    font-size: 0.7rem;
    flex: 1;
  }

  .title {
    font-size: 0.4rem;
    flex: 4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

// 标题与图片
.article-image-container {
  display: flex;
  padding: 0.2rem;
  height: 2.5rem;
  .title {
    flex: 5;
    font-size: 0.5rem;
    overflow: hidden;
    height: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 限制在3行显示，超出部分显示省略号 */
    -webkit-box-orient: vertical;
    padding-right: 0.2rem;
  }
  .img {
    flex: 2;
    img {
      width: 100%;
    }
  }
}

// 详情
.description {
  font-size: 0.3rem;
  color: gray;
  padding: 0.3rem 0.2rem;
  line-height: 2;
}

// 详情描述
.description-detail {
  font-size: 0.3rem;
  padding: 0.1rem 0.2rem;
}

// 文章信息
.article-info {
  font-size: 0.3rem;
  padding: 0.2rem;
  color: gray;
  div {
    margin-top: 0.1rem;
  }
}
</style>

<style scoped>
.description-detail >>> img {
  width: 100%;
}

.description-detail >>> pre {
  white-space: pre-wrap;
  font-size: 0.2rem;
}
</style>
