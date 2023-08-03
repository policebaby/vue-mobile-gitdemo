export default {
  viewsFormatter (num) {
    if (num < 1000) {
      return num
    } else if (num >= 1000 && num < 10000) {
      num = (num / 1000).toFixed(2) + ' k'
      return num
    } else if (num >= 10000 && num < 1000000) {
      num = (num / 10000).toFixed(2) + ' w'
      return num
    } else {
      return num
    }
  },

  dateFormatter (value, type = 0) {
    const time = new Date(value * 1000)
    const year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    const arr = [
      year + '-' + month + '-' + date,
      year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second,
      year + '年' + month + '月' + date,
      year + '年' + month + '月' + date + ' ' + hour + ':' + minute + ':' + second,
      hour + ':' + minute + ':' + second
    ]
    return arr[type]
  },

  // 防抖, 执行最后一次
  debounce (func, wait) {
    let timeout
    return function () {
      clearTimeout(timeout)
      timeout = setTimeout(func, wait)
    }
  },

  // 节流, 执行第一次
  throttle (func, delay) {
    let lastTime = 0 // 闭包
    console.log('上次时间是' + lastTime)

    return function (...args) {
      const now = Date.now()
      console.log('现在时间是' + now)
      console.log('现在时间减去上次时间是' + Number(now - lastTime))
      console.log('延迟时间是' + delay)
      if (now - lastTime > delay) {
        lastTime = now
        func.apply(this, args)
      }
    }
  }
}
