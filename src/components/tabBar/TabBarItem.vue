<template>
  <div class="tabbar-item" :class="isActive" @click="changeRoute">
    <slot name="icon"></slot>
    <slot name="name"></slot>
  </div>
</template>

<script>

export default {
  props: {
    path: {
      type: String,
      default: '/'
    }
  },
  mounted () {
  },
  computed: {
    isActive () {
      return this.$route.path == this.path ? 'active' : ''
    }
  },
  methods: {
    changeRoute () {
      this.$router.replace(this.path)
    }
  }
}

</script>

  <style lang="less" scoped>
.tabbar-item {
  color: gray;
}

.active {
  color: rgb(49, 194, 124);
}
</style>
