// 一. 把讲师展示出来
//  
// 二. 更新讲师个人信息

requirejs(['jquery', 'template', './data/region'], function ($, template, region) {
  console.log(region)
  $.ajax({
    url: '/api/teacher/profile',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      if (data.code == 200) {
        var htmlStr = template('tpl', {
          teacher: data.result,
          province: region.province,
          city: region.city,
          area: region.area
        })
        $('#form').html(htmlStr)
      }
    }
  })
})
