/**
 * 该文件对于每个页面来说都必须加载
 * 这里是为顶部的按钮注册点击事件用于用户退出
 * 在 init 中，是页面初始化的时候要做的一些工作
 */

define(['jquery'], function ($) {
  $('#logout').on('click', function () {
    $.ajax({
      url: '/api/logout',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        if (data.code === "200") {
          window.location.href = '/login.html'
        }
      }
    })
  })

  // 处理导航栏切换
  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  })

  var pathname = window.location.pathname
  if (pathname === '/') {
    pathname = '/index.html'
  }

  $('.navs a').each(function (index, item) {
    var $item = $(item)
    var itemHref = $item.attr('href')
    var startIndex = itemHref.indexOf('/')
    if (itemHref.substr(startIndex) === pathname) {
      $item.addClass('active')
      $item.closest('ul').show()
    }
  })

  // 为 jquery 注册全局事件，全局统一处理
  // $(document).ajaxSuccess(function () {
  //   console.log('ajaxSuccess')
  // })

  // $(document).ajaxStart(function () {
  //   console.log('ajaxStart')
  // })

  // $(document).ajaxStop(function () {
  //   console.log('ajaxStop')
  // })

  // $(document).ajaxSend(function () {
  //   console.log('ajaxSend')
  // })

  // $(document).ajaxError(function () {
  //   window.alert('出错了，请稍后重试！')
  // })

  // $(document).ajaxComplete(function () {
  //   console.log('ajaxComplete')
  // })

})
