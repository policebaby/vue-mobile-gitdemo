<template>
  <div>
    <div class="recomBox" @click="selectArticle({id:itemObj.id,cid:itemObj.classid})">
      <img
        :src="itemObj?.picurl || ''"/>
      <p class="txt">{{ itemObj?.title || "" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemObj: Object,
    default: function () {
      return {}
    }
  },
  data () {
    return {}
  },
  methods: {
    selectArticle (obj) {
      this.$router.push({
        path: '/detail',
        query: {
          ...obj,
          type: 'img'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.recomBox {
  background-color: #fff;
  border: 1px solid rgb(238, 238, 238);
  padding: 0.2rem 0.1rem;
  break-inside: avoid;
  margin-bottom: 0.2rem;
  img {
    display: block;
    width: 100%;
  }
  .txt {
    font-size: 0.3rem;
    padding: 0.1rem 0 0 0.1rem;
    //折叠字
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
