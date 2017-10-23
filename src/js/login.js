var queryString = {
  parse: function (searchStr) {
    var startSubIndex = searchStr.indexOf('?') === 0 ? 1 : 0
    searchStr = searchStr.substr(startSubIndex)
    var paris = searchStr.split('&')
    var obj = {}
    paris.forEach(function (item) {
      // item xxx=xxx
      item = item.split('=')
      obj[item[0]] = item[1]
    })
    return obj
  }
}

requirejs(['jquery'], function ($) {
  // 当表单提交的时候，执行对应的处理函数
  // 1. 阻止默认请求行为
  // 2. 提取表单数据
  // 3. 发起 ajax 异步请求登陆
  // 4. 根据响应结果做交互处理
  $('#form').on('submit', function (e) {
    e.preventDefault()
    // jQuery 的 serialize 方法会把表单中所有具有 name 的表单控件元素提取到，解析得到：xx=xx&xx=xx 的格式数据
    var formData = $(this).serialize()
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: formData,
      dataType: 'json',
      success: function (data) {
        // / 就是网站根路径
        // 网站 / 访问到的就是 index.html

        window.location.href = queryString.parse(window.location.search).return_to || '/'
      },
      error: function (e) {
        var res = e.responseJSON
        if (res.code === 404) {
          window.alert('用户名或者密码错误')
        }
      }
    })
  })
  // $.get('/api/teacher', function (data) {
  //         console.log(data)
  //       })
  
  // 1. 用户登录，发送了用户名和密码
  // 2. 服务端验证用户民和密码成功之后，给客户端发送了响应数据，其中包括一个小纸条 PHPSESSID=52os6cc2stiutt339u9d2ccsh6
  // 3. 客户端收到响应之后，发现有一个 Cookie ，自己把这个 Cookie 记录起来
  // 4. 然后客户端在以后的每一次请求中都会把这个小纸条带上去，目的是为了告诉服务器你已经登陆了
  // Cookie 是一个段特殊的密文，目的是为了防止伪造
  // 如果这个 Cookie 一旦丢失了，那你的登陆状态也就丢失了
  // Cookie:io=S5XE69iomW3Olcj4AAA9
  // PHPSESSID=52os6cc2stiutt339u9d2ccsh6
  // Cookie 也有过期时间，例如有的网站你关闭了重新打开发现还是登陆状态
  // 而有的网站你关闭了再打开发现还需要重新登陆。
})
