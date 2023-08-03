<template>
  <div>
    <HeaderView class="header_view"/>
    <div class="list_main">
      <ListLeft class="list_left" @navId="changeNavId" />
      <ListRight class="list_right" :navId="navId"/>
    </div>
    <TabBar/>
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import TabBar from '@/components/tabBar/TabBar.vue'
import ListLeft from '@/views/list/children/ListLeft'
import ListRight from '@/views/list/children/ListRight'

export default {
  components: {
    HeaderView,
    TabBar,
    ListLeft,
    ListRight
  },
  data () {
    return {
      navId: 47
    }
  },
  methods: {
    changeNavId (id) {
      this.navId = id
    }
  }
}
</script>

<style lang="less" scoped>

.list_main {
  display: flex;
  font-size: 0.3rem;

  .list_left {
    width: 20%;
    height: auto;
    background-color: rgb(246, 246, 246);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list_right {
    width: 80%;
  }
}
</style>
