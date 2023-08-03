import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('@/views/index/Index')
const List = () => import('@/views/list/List')
const Art = () => import('@/views/artView/ArtView')
const Ins = () => import('@/views/ins/insView')
const Detail = () => import('@/views/detail/Detail.vue')
const Search = () => import('@/views/search/Search.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/index',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/index',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/list',
    component: List,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/art',
    component: Art,
    meta: {
      title: '文章'
    }
  },
  {
    path: '/ins',
    component: Ins,
    meta: {
      title: '灵感'
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      title: '详情页面'
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      title: '搜索'
    }
  }

]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ? to.meta.title : '酷站'
})

export default router
