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

// 1. 加载需要编辑的讲师内容
//    页面初始化的时候，根据用户点击的编辑的条目将该内容查询得到展示出来
//    1.1 获取 url 中的 id 参数
//    1.2 发起获取讲师信息请求
//    1.3 将数据渲染到页面中
// 2. 提交需要更改的讲师信息
//    2.0 测试接口
//    2.1 根据接口绑定表单信息
//    2.2 注册表单提交事件
//    2.3 获取表单数据
//    2.4 表单验证
//    2.5 发起异步请求，提交表单数据
//    2.6 根据响应结果做交互

requirejs(['jquery', 'template'], function ($, template) {
  var id = queryString.parse(window.location.search).id
  var $form = $('#form')
  $.ajax({
    url: '/api/teacher/edit',
    data: {
      tc_id: id
    },
    dataType: 'json',
    success: function (data) {
      if (data.code == 200) {
        var htmlStr = template('tpl', {
          teacher: data.result
        })
        $form.html(htmlStr)
      }
    },
    error: function () {
    }
  })

  $form.on('submit', function (e) {
    e.preventDefault()
    var formData = $(this).serialize()
    $.ajax({
      url: '/api/teacher/update',
      type: 'post',
      data: formData,
      dataType: 'json',
      success: function (data) {
        if (data.code == 200) {
          window.alert('更新成功！')
        }
      }
    })
  })
})

// JSON.styringify
// queryString.parse()
//  接收一个字符串，把 xx=xx&xx=xx 转换为：{key: value, key: value} 的格式
// queryString.stringify()
//  key=value&key=value 的格式
