<template>
  <div class="tabbar-container">
    <TabBarItem v-for="(item, index) in tabList" :key="index" :path="item.path">
      <template v-slot:icon>
        <div class="iconfont" :class="item.icon"></div>
      </template>
      <template v-slot:name>
        <div class="name">{{ item.name }}</div>
      </template>
    </TabBarItem>
  </div>
</template>

<script>
import TabBarItem from '@/components/tabBar/TabBarItem.vue'
export default {
  components: {
    TabBarItem
  },
  data () {
    return {
      tabList: [
        {
          name: '首页',
          icon: 'icon-home-fill',
          path: '/index'
        },
        {
          name: '分类',
          icon: 'icon-all-fill',
          path: '/list'
        },
        {
          name: '灵感',
          icon: 'icon-credit-level-fill',
          path: '/ins'
        },
        {
          name: '文章',
          icon: 'icon-integral-fill',
          path: '/art'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar-container {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: white;
  padding-top: 0.1rem;
}

.iconfont {
  font-size: 0.4rem;
}
.name {
  font-size: 0.2rem;
}
</style>
