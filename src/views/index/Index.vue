<template>
  <div class="index">
    <HeaderView />
    <BannerView/>
    <Newest/>
    <ArtView/>
    <TabBar/>
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import BannerView from '@/views/index/children/BannerView.vue'
import Newest from '@/views/index/children/Newest.vue'
import ArtView from '@/views/index/children/ArtView.vue'
import TabBar from '@/components/tabBar/TabBar.vue'

export default {
  components: {
    HeaderView,
    BannerView,
    Newest,
    ArtView,
    TabBar
  }
}
</script>

<style lang="less" scoped>
</style>
