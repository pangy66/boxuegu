/**
 * 0. 根据接口处理表单中的表单元素的 name
 * 1. 为表单注册：submit 提交事件
 *   注意：在提交事件中先禁用表单的默认提交事件
 * 2. 获取表单中的数据
 *    这里使用 jQuery 的  serialize 方法
 * 3. 注意：客户端表单验证
 *     这里使用一个插件：jquery-validation
 * 4. 发起 ajax 请求，提交表单数据
 * 5. 根据响应结果做表单交互处理
 */

// ./data/validate-zh 内部依赖了 jquery 和 jquery-validation 两个插件
requirejs(['jquery', './data/validate-zh'], function ($) {
  // $('#form').validate({
  //   rules: {
  //     tc_name: {
  //       required: true,
  //       minlength: 2,
  //       maxlength: 10
  //     },
  //     tc_pass: {
  //       required: true,
  //       minlength: 6,
  //       maxlength: 18
  //     }
  //   },
  //   messages: {
  //     // tc_name: {
  //     //   required: '名字是必须的'
  //     // }
  //   },
  //   submitHandler: function (form) {
  //     console.log('验证通过')
  //   }
  // })
  $('#form').on('submit', function (e) {
    e.preventDefault()
    var formData = $(this).serialize()
    $.ajax({
      url: '/api/teacher/add',
      data: formData,
      dataType: 'json',
      success: function (data) {
        if (data.code == 200) {
          // 添加成功，让页面跳转到讲师列表页
          window.location.href = '/teacher_list.html'
        }
      }
    })
  })
})
