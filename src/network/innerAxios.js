import { request } from '@/network/request'

export function getAllArt (page = 1) {
  return request({
    url: '/getArticle.php',
    params: {
      num: 9,
      page: page
    }
  })
}

export function getAllNewest (page = 1) {
  return request({
    url: '/getList.php',
    params: {
      num: 8,
      page: page
    }
  })
}

export function getNavAxios () {
  return request({
    url: '/infoClass.php'
  })
}

export function getNavDetailsAxios (page = 1, cid = 47) {
  return request({
    url: '/getList.php',
    params: {
      page: page,
      cid: cid
    }
  })
}

export function getDetail (id, cid, type) {
  return request({
    url: '/getDetail.php',
    params: {
      id,
      cid,
      type
    }
  })
}

// 搜索页面
export function getSearchItems (keyword) {
  return request({
    url: '/searchList.php',
    params: {
      keyword
    }
  })
}
