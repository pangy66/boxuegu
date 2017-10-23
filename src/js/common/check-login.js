/**
 * 校验登陆状态的方法
 * 这个文件需要每个页面都进行调用校验
 */
define(['jquery'], function ($) {
  // 0. 如果当前页面的请求路径是非 /login.html 的才做登陆权限认证
  // 1. 对一个需要权限的接口发起请求
  // 2. 如果返回 401 则我们让其跳转到 login.html
  // 3. 如果返回 200 则我们让其正常通过
  
  if (window.location.pathname === '/login.html') {
    return
  }

  $.ajax({
    // 正常来说服务器接口应该专门提供一个接口用来获取登陆状态
    // 但是它这个接口中没有，所以我们拿一个返回数据量比较小的需要权限的接口来使用
    url: '/api/teacher/profile',
    type: 'get',
    dataType: 'json',
    async: false, // 异步请求浏览器不会转圈，同步请求浏览器会转圈
    success: function () {
      // 成功了，说明登陆了，那我就什么都不做，继续访问当前页面
    },
    error: function () {
      // 失败了，说明没有登陆，那我就让它跳转到 login.html 页面
      window.location.href = '/login.html?return_to=' + window.location.href
    }
  })
})
