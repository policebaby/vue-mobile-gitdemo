<template>
  <div class="banner">
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" v-for="(item, index) in banners" :key="index">
          <img :src="item" />
        </div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/pagination'
import { getBannerList } from '@/network/indexAxios'

export default {
  data () {
    return {
      banners: [],
      swiper: ''
    }
  },
  mounted () {
    this.getBanners()
    this.initSwiper()
  },
  methods: {
    // 获取 banners 图片
    async getBanners () {
      await getBannerList().then((res) => {
        this.banners = res.data.map((o) => {
          return o.picurl
        })
      })
    },

    // 初始化 Swiper
    initSwiper () {
      this.swiper = new Swiper('.swiper', {
        // use Paginatioin
        modules: [Pagination, Autoplay],

        // Pagination Direction
        direction: 'horizontal',
        loop: true,

        // Pagination
        pagination: {
          el: '.swiper-pagination'
        },

        //   Autoplay
        autoplay: {
          delay: 1500
        },

        //  Slides visible in swiper container
        slidesPerView: 1.2,

        // Center Slides
        centeredSlides: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  height: 5.3rem;
  background-color: whitesmoke;
  margin-top: 0.2rem;
  .swiper-slide {
    height: 5.3rem;
    img {
      height: 100%;
      width: 100%;
      border-radius: 0.2rem;
      scale: (0.9);
      transition: 0.3;
    }
    &.swiper-slide-active img {
      scale: (1);
      box-shadow: 0 0.1rem 0.15rem rgba(0, 0, 0, 0.1);
    }
  }
}

.swiper-pagination {
  --swiper-pagination-color: rgb(49, 194, 124);
}
.test{
  align-self: baseline;
  text-align: cener;
}
</style>
