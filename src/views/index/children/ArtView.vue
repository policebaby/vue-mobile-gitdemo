<template>
  <div class="article-container">
    <ArtItem v-for="(item, index) in artArrList" :key="index" :article="item" />
  </div>
</template>

<script>
import ArtItem from '@/components/ArtItem.vue'
import { getArtList } from '@/network/indexAxios'

getArtList()
export default {
  components: {
    ArtItem
  },
  mounted () {
    this.getArtData()
  },
  data () {
    return {
      artArrList: []
    }
  },
  methods: {
    getArtData () {
      getArtList().then((res) => {
        this.artArrList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  padding: 0.2rem;
  margin-bottom:0.6rem;
}
</style>
