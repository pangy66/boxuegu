/**
 * RequireJS 配置文件
 * 每个页面都载入这个配置文件，保证它们的配置都是统一的
 */

requirejs.config({
  // 这里的 baseUrl 是相对于网站根目录
  // 测试得结果，改成其它的试试
  // 这里的 baseUrl 是当前文件的位置没有任何关系
  baseUrl: 'js',
  // 这里是加载的时候，把 bootstrap 预先加载进来
  // 同时预加载了 check-login.js 文件校验是否已登陆
  deps: ['bootstrap', 'checkLogin', 'pageInit'],
  paths: {
    // 这里配置的路径是相对于打包之后的路径
    // 建议把所有的第三方包的路径都配置到配置文件中
    jquery: '../vendor/jquery/dist/jquery',
    bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
    checkLogin: 'common/check-login',
    pageInit: 'common/init',
    template: '../vendor/art-template/lib/template-web',
    validation: '../vendor/jquery-validation/dist/jquery.validate'
  },
  shim: {
    // bootstrap 依赖了 jquery
    // 这是配置依赖的简写方式
    bootstrap: ['jquery']
  }
})
