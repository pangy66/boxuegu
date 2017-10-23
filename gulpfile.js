var gulp = require('gulp')
var less = require('gulp-less')
var cssMinify = require('gulp-csso')
var nunjucks = require('gulp-nunjucks')
var browserSync = require('browser-sync').create()
var pkg = require('./package.json')
var imagemin = require('gulp-imagemin')
var proxy = require('http-proxy-middleware')

// 代理配置选项
// 当请求以 /api 开头的时候，这个代理中间件会把你的请求路径 target 路径拼接到一起，然后发起请求
// 例如，我现在请求了：/api/login 则代理中间件发起的请求是 
//  http://api.botue.com/api/login
// 由于路径中多了一个 /api ，所以这里有一个配置选项：pathRewrite 路径重写
// 这里配置的 '/api': '', // rewrite path 就标识会把路径中的 /api 替换成空字符也就是去除
// /api/login
// 1. 代理插件发现了你的以 /api 开头的，然后就拦截住了这个请求，通过我的代理来负责这个请求
// 2. 紧接着代理发现你配置了 pathRewrite 然后根据你定义的规则把 /api/login 中的 /api 给去除了
// 3. 然后代理把处理过后的路径和 target 拼接到一起发起请求 http://api.botue.com/login
// 4. 最后代理把响应结果交给你
// 
// 配置结束之后，在项目中所有的对接口的请求都变成了 /api/xxx
var jsonPlaceholderProxy = proxy('/api', {
  target: 'http://api.botue.com',
  changeOrigin: true,
  pathRewrite: {
    '/api': '', // rewrite path
  },
  logLevel: 'debug'
})

// 拷贝项目中需要使用的第三方包
gulp.task('vendor', function () {
  var dependencies = Object.keys(pkg.dependencies).map(function (item) {
    return './node_modules/' + item + '/**/*'
  })
  return gulp.src(dependencies, {
      base: './node_modules/'
    })
    .pipe(gulp.dest('./dist/vendor'))
})

// 编译 less 的任务
gulp.task('less', function () {
  return gulp.src('./src/css/*.less')
    .pipe(less())
    .pipe(cssMinify())
    .pipe(gulp.dest('./dist/css'))
})

// 直接拷贝 js 目录到 dist 中
gulp.task('js', function () {
  gulp.src('./src/js/**/*', { base: './src/' })
    .pipe(gulp.dest('./dist/'))
})

// 处理 html 公共模板的部分
// gulp-nunjucks 插件文档：https://github.com/sindresorhus/gulp-nunjucks
// https://mozilla.github.io/nunjucks/
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('./dist/'))
})

// 参考文档：http://blog.csdn.net/zhongguohaoshaonian/article/details/53213657
// gulp-imagemin
// https://github.com/sindresorhus/gulp-imagemin
gulp.task('imagemin', function () {
  gulp.src('./src/img/*', { base: './src' })
    .pipe(imagemin())
    .pipe(gulp.dest('./dist'))
})

// 构建一次，构建完成之后，监视源码，源码发生变化，然后重新构建
// 1. 依赖任务都是并行执行的，对于这里如果 less 和 html 还没有构建结束，则你第一次启动的服务预览的页面是空白的
//    所以这里不建议把 browser-sync 依赖
//    而是直接把 browser-sync 开启服务的代码写到 default 任务中
gulp.task('default', ['less', 'html', 'vendor', 'imagemin', 'js'], function () {
  // less 和 html 构建结束之后，开始监视源码的变动，然后重新构建
  // https://browsersync.io/docs/gulp
  browserSync.init({
    server: {
      baseDir: "./dist/", // baseDir 就是用来设置类似 Apache 的 www 目录的，该目录下的文件都可以通过 WEB 的方式来访问
      middleware: [jsonPlaceholderProxy]
    },
    // 让 browser-sync 监视指定的文件或目录，当指定的文件或目录发生变化，browser-sync 会自动帮你刷新浏览器
    files: './dist/',
    port: 8080
  })

  // 注意：这里有问题，如果一个文件变化了，会造成所有文件的重新编译
  // 理想状态应该是：a 变了，只重新编译 a 即可
  // gulp.watch('./src/css/*.less', ['less'])
  // gulp.watch('./src/*.html', ['html'])

  // 监视 html 文件的变化，文件改变，只编译改变的这个文件
  // 监视 src 中所有的 .html 文件，当文件发生变化，执行第二个参数函数
  // 第二个参数函数将接收到一个事件源对象
  gulp.watch('src/*.html', function (event) {
    gulp.src(event.path)
      .pipe(nunjucks.compile())
      .pipe(gulp.dest('./dist/'))
  })

  // 监视 less 文件的变化，文件发生改变，只重新编译改变的这个文件
  gulp.watch('src/css/*.less', function (event) {
    gulp.src(event.path)
      .pipe(less())
      .pipe(gulp.dest('./dist/css'))
  })

  // 这里还有一些小问题，新增的文件不会及时进去
  // 注意：监视文件的时候，如果有 ./ 监视不到文件的增加
  //        这里的解决办法就是把开头的 ./ 去除即可
  gulp.watch('src/js/**/*.js', function (event) {
    gulp.src(event.path, {base: './src/'}) // 把 base 配置上，让其保持原来的目录结构
      .pipe(gulp.dest('./dist/'))
  })
})

// 工程师思维
// 别纠结，大胆奔放的弄就行了
// 照着文档，挨着试
// 工程化 + 工具化
// 看文档，挨着试
// 建议：动手
// 遇到报错信息：
//    1. read
//      读
//    2. search
//      建议使用 Google
//      搜索
//    3. ask
//      问
// 工具，如何通过它的说明书学会使用

// 1. 构建 less、html
// 2. 开启 web 服务
// 3. 监视源码，源码发生变化，执行对应的构建任务
// 
// 接下来，当源码发生变化的时候：
//    1. 执行对应的任务进行构建
//    2. 构建的结果影响了 dist 目录
//    3. 当 dist 目录发生变化，被 browser-sync 监视到了，则 browser-sync 就会帮你同步刷新浏览器
