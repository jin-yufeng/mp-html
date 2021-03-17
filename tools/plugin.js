/**
 * @fileoverview 处理插件
 */
const path = require('path')
const through2 = require('through2')

const config = require('./config')

config.plugins.sort((a, b) => {
  // editable 置于最后面
  if (a === 'editable')
    return 1
  if (b == 'editable')
    return -1
  // markdown 置于最前面
  if (a === 'markdown')
    return -1
  if (b == 'markdown')
    return 1
  // 剩余任意顺序
  return 0
})

// 提取和替换标签名选择器（组件中仅支持 class 选择器）
var tagSelector = {}, tagI = 0
if (config.externStyle)
  config.externStyle = config.externStyle.replace(/[\.#\[@]*([a-zA-Z]+)(?=[^}]*{)/g, ($, $1) => {
    if ($ != $1)
      return $
    if (tagSelector[$])
      return '.' + tagSelector[$]
    tagSelector[$] = '_' + tagI++
    return '.' + tagSelector[$]
  })

module.exports = {
  /**
   * @description 构建插件
   * @param {string} platform 使用平台
   */
  build(platform) {
    var builds = {},            // 构建模块
      plugins = '',             // 插件列表
      wxml = '',                // 要引入到 node.wxml 中的内容
      js = '',                  // 要引入到 node.js 中的内容
      wxss = config.externStyle,// 要引入到 node.wxss 中的内容
      json = {}                 // 要引入到 node.json 中的内容

    // 收集插件中要写入模板文件的内容
    for (var i = 0; i < config.plugins.length; i++) {
      var plugin = config.plugins[i],
        build = {}
      try {
        // 专用 build
        if (platform == 'uni-app')
          build = require(`../plugins/${plugin}/uni-app/build.js`)
        else
          build = require(`../plugins/${plugin}/miniprogram/build.js`)
      } catch (e) { }
      try {
        // 通用 build
        build = Object.assign(require(`../plugins/${plugin}/build.js`), build)
      } catch (e) { }
      // 可以在当前平台使用
      if (!build.platform || build.platform.includes(platform)) {
        builds[plugin] = build
        plugins += `require('./${plugin}/${build.main ? build.main : 'index.js'}'),`
        if (build.template)
          wxml += build.template.replace('wx:if', 'wx:elif').replace('v-if', 'v-else-if')
        if (build.methods)
          for (var method in build.methods)
            js += build.methods[method].toString() + ','
        if (build.usingComponents)
          Object.assign(json, build.usingComponents)
        if (build.style)
          wxss += build.style
      }
    }

    // 加入 ad 标签
    if (config.ad) {
      if (platform == 'uni-app')
        wxml += `<ad v-else-if="n.name=='ad'" :class="n.attrs.class" style="n.attrs.style" :unit-id="n.attrs['unit-id']" :appid="n.attrs.appid" :apid="n.attrs.apid" :data-i="i" @error="mediaError" />`
      else
        wxml += `<ad wx:elif="{{n.name=='ad'}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}" mp-weixin:mp-qq:mp-toutiao:unit-id="{{n.attrs['unit-id']}}" mp-baidu:appid="{{n.attrs.appid}}" mp-baidu:apid="{{n.attrs.apid}}" data-i="{{i}}" binderror="mediaError" />`
    }

    return through2.obj(function (file, _, callback) {
      if (file.isBuffer()) {
        // src 目录
        if (file.base.includes('src')) {
          var content = file.contents.toString()
          // 注册插件列表
          if (file.basename == 'index.js' || file.basename == 'mp-html.vue')
            content = content.replace(/plugins\s*=\s*\[\]/, `plugins=[${plugins}]`)
          // 设置标签名选择器
          else if (file.basename == 'parser.js' && tagI)
            content = content.replace(/tagSelector\s*=\s*{}/, `tagSelector=${JSON.stringify(tagSelector)}`)
          // 引入模板
          else if (file.basename == 'node.wxml')
            content = content.replace(/<!--\s*insert\s*-->/, wxml)
          // 引入方法
          else if (file.basename == 'node.js')
            content = content.replace(/methods\s*:\s*{/, 'methods:{' + js)
          // 引入样式
          else if (file.basename == 'node.wxss')
            content = wxss + content
          // 引入组件声明
          else if (file.basename == 'node.json') {
            let comps = JSON.stringify(json).slice(1, -1)
            if (comps)
              content = content.replace(/"usingComponents"\s*:\s*{/, '"usingComponents":{' + comps + ',')
          }
          // 引入 vue
          else if (file.basename == 'node.vue') {
            content = content.replace(/<!--\s*insert\s*-->/, wxml)
              .replace(/methods\s*:\s*{/, 'methods:{' + js)
              .replace('<style>', '<style>' + wxss)
            let importComp = '', comps = ''
            for (let item in json) {
              let val = json[item]
              // 插件无法通过这种方式引入
              if (val.includes('plugin://'))
                continue
              item = item.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase())
              importComp += 'import ' + item + " from '" + val + "'\n"
              comps += item + ',\n'
            }
            content = content.replace('<script>', '<script>\n' + importComp)
              .replace(/components\s*:\s*{/, 'components: {\n' + comps)
          }
          // 引入样式
          else if (file.basename == 'local.html' && wxss)
            content = '<style>' + wxss.replace(/\/deep\/\s*/g, '') + '</style>' + content
          file.contents = Buffer.from(content)
          for (let item in builds)
            if (builds[item].handler)
              builds[item].handler(file, platform)
        }

        // plugins 目录
        else {
          var name = file.relative.split(path.sep)[0],
            build = builds[name]
          // 本平台不支持使用
          if (!build || file.extname == '.md' || file.basename == 'build.js')
            return callback()
          // import
          if (build.import) {
            if (typeof build.import == 'string') {
              if (file.relative.includes(build.import))
                file.import = true
            } else
              for (let i = 0; i < build.import.length; i++) {
                if (file.relative.includes(build.import[i])) {
                  file.import = true
                  break
                }
              }
          }
          if (build.handler)
            build.handler(file, platform)
        }
      }
      this.push(file)
      callback()
    })
  },
  /**
   * @description 引入样式文件到 node.wxss 中
   */
  importCss() {
    var css = ''
    return through2.obj(function (file, _, callback) {
      if (file.isBuffer()) {
        var content = file.contents.toString()
        // 要被引入的文件
        if (file.import) {
          css += content
          return callback()
        }
        // 引入到对应位置
        if (file.basename == 'node.wxss')
          content = css + content
        else if (file.basename == 'node.vue')
          content = content.replace('<style>', '<style>' + css)
        else if (file.basename == 'local.html' && css)
          content = '<style>' + css.replace(/\/deep\/\s*/g, '') + '</style>' + content
        file.contents = Buffer.from(content)
      }
      this.push(file)
      callback()
    })
  }
}
