define(['jquery'], function ($) {
  function Page() {
    
  }

  // url
  // data
  // success
  // 基于 jQuery 的 ajax 再次封装，可以做更多自定义功能
  // 例如：当响应码为 500 的时候，我们让用户跳转到 500.html 页面
  // 当响应码为 404 的时候，我们让用户跳转到 404.html 页面
  Page.prototype.ajax = function (options) {
    var settings = $.extend({
      type: 'get',
      dataType: 'json',
      data: {}
    }, options)

    $.ajax({
      url: settings.url,
      type: settings.type,
      data: settings.data,
      dataType: settings.dataType,
      success: settings.success,
      error: function (e) {
        // 如果状态码为 404 则跳转到 404.html
        // 如果状态码为 500 则跳转到 错误展示页
        console.log('出错了')
      }
    })
  }

  return Page
})
