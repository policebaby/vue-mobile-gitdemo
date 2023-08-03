function setRootFontSize () {
  const designWidth = 750 // 设计稿的宽度
  const fontSize = 100 // 设计稿宽度下的字体大小

  const width = window.innerWidth // 设备的屏幕宽度
  const currentFontSize = (width / designWidth) * fontSize // 计算当前的字体大小

  // 设置根元素的字体大小
  document.documentElement.style.fontSize = currentFontSize + 'px'
}

// 在页面加载时设置字体大小
window.addEventListener('DOMContentLoaded', setRootFontSize)

// 当窗口大小改变时，重新设置字体大小
window.addEventListener('resize', setRootFontSize)

/* 老师写的
window.onload = function () {
    getRem(750, 100)
  }

  window.onresize = function () {
    getRem(750, 100)
  }

  function getRem (pwidth, prem) {
    var html = document.getElementsByTagName('html')[0]
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth
    html.style.fontSize = oWidth / pwidth * prem + 'px'
  }
  */
