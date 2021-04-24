/**
 * @fileoverview 自动构建程序
 * @author Jin Yufeng
 */

// 载入 gulp 插件
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const clean = require('gulp-clean')
const gulpif = require('gulp-if')
const plumber = require('gulp-plumber')
const size = require('gulp-size')

// 载入构建工具
const config = require('./tools/config')
const converter = require('./tools/converter')
const ifdef = require('./tools/ifdef')
const minifier = require('./tools/minifier')
const plugin = require('./tools/plugin')

// 载入环境信息
const isDev = process.argv.includes('--dev')
let platform = process.argv[3]
if (!platform) {
  throw Error('缺少平台信息')
}
platform = platform.substr(2)

/**
 * @description 清理文件夹
 */
gulp.task('clean', () => {
  return gulp.src(`${isDev ? 'dev' : 'dist'}/${platform === 'all' ? '' : platform + '/'}*`, {
    read: false,
    allowEmpty: true
  })
    .pipe(clean())
})

/**
 * @description 生成原生组件包（含插件）
 * @returns {NodeJS.ReadWriteStream}
 */
function packComp () {
  return gulp.src(['plugins/**/*', 'src/**/*'], {
    nodir: true
  })
    // 公共处理
    .pipe(plumber()) // 错误处理
    .pipe(plugin.build(platform)) // 构建插件
    .pipe(ifdef(platform)) // 条件编译
    // wxml 处理
    .pipe(gulpif(file => file.extname === '.wxml', minifier.wxs())) // 压缩内联 wxs
    .pipe(gulpif(file => file.extname === '.wxml', htmlmin(config.htmlmin))) // 压缩 wxml
    .pipe(gulpif(file => file.extname === '.html', htmlmin(Object.assign({}, config.htmlmin, { // 压缩 html
      minifyCSS: true
    }))))
    // js 处理
    .pipe(gulpif(file => file.extname === '.js' && !file.stem.includes('.min') && (platform !== 'uni-app' || file.relative.includes('static')), babel(config.babel))) // es6 转 es5
    .pipe(gulpif(file => file.extname === '.js' && !file.stem.includes('.min') && !isDev && (platform !== 'uni-app' || file.relative.includes('static')), uglify(config.uglify))) // 压缩 js
    // wxss（css）处理
    .pipe(gulpif(file => file.extname.includes('ss'), cleanCss(config.cleanCss))) // 压缩 wxss
    .pipe(plugin.importCss()) // 引入插件中的 css 文件
    // json 处理
    .pipe(gulpif(file => file.extname === '.json', minifier.json())) // 压缩 json
    // 公共处理
    .pipe(converter(platform)) // 将微信端的代码转换到各个平台
    .pipe(gulpif(!isDev, size({
      title: `${platform} 包生成完毕`
    })))
    .pipe(gulp.dest(file => {
      return `${isDev ? 'dev' : 'dist'}/${platform}/${(platform === 'uni-app' && !file.relative.includes('components') && !file.relative.includes('static')) || (platform !== 'uni-app' && isDev) ? 'components/mp-html/' : ''}`
    }))
}

gulp.task('build', gulp.series('clean', packComp))

/**
 * @description 生成原生示例项目
 * @returns {NodeJS.ReadWriteStream}
 */
function packDemo () {
  return gulp.src(['tools/demo/**/*', 'test/content.js'], {
    nodir: true
  })
    .pipe(ifdef(platform))
    .pipe(gulpif(platform !== 'uni-app', converter(platform)))
    .pipe(gulp.dest(`dev/${platform}/`))
}

gulp.task('dev', gulp.series('clean', gulp.parallel(packComp, packDemo)))

/**
 * @description 监听文件变化
 */
gulp.task('watch-demo', () => {
  gulp.watch(['tools/demo/**/*', 'test/content.js']).on('all', (type, file) => {
    console.log(type + ':' + file)
    packDemo()
  })
})

gulp.task('watch-comp', () => {
  gulp.watch(['src/**/*', 'src/common/**/*', 'plugins/**/*']).on('all', (type, file) => {
    console.log(type + ':' + file)
    packComp()
  })
})

gulp.task('watch', gulp.parallel('watch-demo', 'watch-comp'))
