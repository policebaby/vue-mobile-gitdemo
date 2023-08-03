<template>
  <div>
    <div
    v-for="item in navList"
    :key="item.id"
    class="nav_item"
    :class="{active : item.id == isId}"
    @click="clickNav(item.id)"
    >{{ item.classname }}</div>
  </div>
</template>

<script>
import { getNavAxios } from '@/network/innerAxios.js'

export default {
  data () {
    return {
      navList: [],
      isId: 47
    }
  },
  mounted () {
    this.getNavList()
  },
  methods: {
    async getNavList () {
      await getNavAxios().then((res) => {
        this.navList = res.data
      })
    },
    clickNav (id) {
      this.isId = id
      this.$emit('navId', id)
    }
  }
}
</script>

<style lang="less" scoped>
.nav_item{
    padding: 0.2rem;
    width: 100%;
    &.active{
        color: rgb(49, 194, 124);
        background-color: white;
    }
}
</style>
