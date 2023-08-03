import { request } from '@/network/request'

export function getBannerList () {
  return request({
    url: '/getList.php',
    params: {
      tejian: true
    }
  })
}

export function getNewsList () {
  return request({
    url: '/getRecom.php',
    params: {
      num: 8
    }
  })
}

export function getArtList () {
  return request({
    url: '/getArticle.php',
    params: {
      num: 5
    }
  })
}
