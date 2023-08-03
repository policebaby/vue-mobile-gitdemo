<template>
  <div class="headerView">
    <img src="@/assets/images/logo.png" />
    <div class="search" @click="$router.push('/search')">
      <span class="iconfont icon-search"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.headerView {
  width: 100%;
  height: 1rem;
  background-color: rgb(49, 194, 124);
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem;
  align-items: center;
  position: relative;
  z-index: 1000;
  img {
    height: 0.8rem;
  }
  .icon-search {
    color: white;
    font-size: 0.8rem;
    display: block;
  }
}
</style>
