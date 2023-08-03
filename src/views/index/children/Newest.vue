<template>
  <div class="main">
    <NewestItem v-for="(item, index) in listArr" :key="index" :itemObj="item" />
  </div>
</template>

<script>
import NewestItem from '@/components/NewestItem.vue'
import { getNewsList } from '@/network/indexAxios'

export default {
  data () {
    return {
      listArr: []
    }
  },
  components: {
    NewestItem
  },

  mounted () {
    this.getNews()
  },

  methods: {
    getNews () {
      getNewsList().then((res) => {
        this.listArr = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background-color: rgb(245, 241, 241);
  padding: 0.3rem 0.2rem;
  column-count: 2;
  column-gap: 0.1rem;
}
</style>
