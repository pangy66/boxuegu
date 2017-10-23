requirejs(['jquery', 'template', './common/page'], function ($, template, Page) {

  // 处理注销点击事件
  $('body').on('click', '[name="logoff"]', function () {
    var $logoff = $(this)

    // 从自定义属性中获取讲师 id
    var id = $logoff.parent().data('id')
    
    // var status = $logoff.data('status') == 0 ? 1 : 0
    // console.log($logoff.data('status'))
    // console.log(status)

    // 根据类名判断获取当前讲师的反转状态
    var status = $logoff.hasClass('btn-success') ? 1 : 0

    $.ajax({
      url: '/api/teacher/handle',
      type: 'post',
      // 0 注销状态
      //  返回 1 a 链接变为启用
      // 1 启用状态
      //  返回 0 a 链接变为注销
      data: {
        tc_id: id,
        tc_status: status
      },
      success: function (data) {
        var result = data.result
        if (data.code == 200) {
          if (result.tc_status == 0) {
            $logoff
              .html('注销')
              .removeClass('btn-success')
              .addClass('btn-warning')
          } else if (result.tc_status == 1) {
            $logoff
              .html('启用')
              .removeClass('btn-warning')
              .addClass('btn-success')
          }
        }
      }
    })
  })
  // 1. 下载
  // 2. 配置到 requirejs.config.js 文件中
  // 3. 在 html 页面中写模板字符串
  // 4. 在 JavaScript 中加载 art-template 模板引擎
  // 5. 发请求拿数据、模板引擎渲染编译
  // 6. 把编译的结果添加到 HTML 容器中
  // 注意：
  //    这里有个问题，在HTML页面中我们使用了 gulp-nunjucks 进行了模板编译
  //    如果你在这个 HTML 页面中写了类似于 {{}} 的语法，其实也会被编译
  // $.get('/api/teacherdsadas', function (data) {
  //   if (data.code == 200) {
  //     var htmlStr = template('tpl', {
  //       list: data.result
  //     })
  //     $('#tbody').html(htmlStr)
  //   }
  // })
  var page = new Page()
  page.ajax({
    url: '/api/teacherdsadas',
    success: function (data) {
      console.log('成功了')
    }
  })
})
