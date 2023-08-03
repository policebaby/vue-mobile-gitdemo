<template>
  <div>
    <router-link
    :to="'/detail?id='+article.id+'&cid='+article.classid+'&type=list'"
    class="article-link"
    >
      <div class="article-block">
        <div class="image">
          <img :src="article.picurl" />
        </div>
        <div class="title-details">
          <div class="title">{{ article.title }}</div>
          <div class="details-container">
            <div class="time">
              <span class="iconfont icon-clock"></span>
              {{ this.dateFormatter(article.posttime) }}
            </div>
            <div class="views">
              <span class="iconfont icon-browse"></span>
              {{ this.viewsFormatter(article.hits) }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import common from '@/assets/js/common.js'

export default {
  props: {
    article: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    viewsFormatter (views) {
      return common.viewsFormatter(views)
    },
    dateFormatter (value, type = 0) {
      return common.dateFormatter(value, (type = 0))
    }
  }
}
</script>

<style lang="less" scoped>
.article-link{
  text-decoration: none;
  color: rgb(40, 39, 39);
}

.article-block {
  display: flex;
  height: 149.13px;
  border: 1px solid rgb(196, 196, 196);
  margin-bottom: 0.1rem;

  img {
    height: 149.13px;
    width: 2.41rem;
    object-fit: cover;
  }

  .title-details {
    flex: 1;
    padding: 0.15rem;
    .title {
      font-size: 28px;
      font-weight: 700;
      height: 0.78rem;
    }

    .details-container {
      display: flex;
      margin-top: 0.1rem;
      color: gray;

      .time {
        font-size: 0.22rem;
      }
      .views {
        font-size: 0.22rem;
        margin-left: auto;
      }
    }
  }
}
</style>
