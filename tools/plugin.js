/**
 * @fileoverview 处理插件
 */
const path = require('path')
const through2 = require('through2')

const config = require('./config')

config.plugins.sort((a, b) => {
  // editable 置于最后面
  if (a === 'editable') return 1
  if (b === 'editable') return -1
  // markdown 置于最前面
  if (a === 'markdown') return -1
  if (b === 'markdown') return 1
  // 剩余任意顺序
  return 0
})

// 提取和替换标签名选择器（组件中仅支持 class 选择器）
const tagSelector = {}
let tagI = 0
if (config.externStyle) {
  config.externStyle = config.externStyle.replace(/[^,\s}]+(?=[^}]*{)/g, $ => {
    if (!/[a-zA-Z_]/.test($[0])) return $
    if (tagSelector[$]) return '.' + tagSelector[$]
    tagSelector[$] = '_' + tagI++
    return '.' + tagSelector[$]
  })
}

module.exports = {
  /**
   * @description 构建插件
   * @param {string} platform 使用平台
   */
  build (platform) {
    const builds = {} // 构建模块
    let plugins = '' // 插件列表
    let voidTags = '' // 增加的自闭合标签
    let wxml = '' // 要引入到 node.wxml 中的内容
    let js = '' // 要引入到 node.js 中的内容
    let wxss = config.externStyle // 要引入到 node.wxss 中的内容
    const json = {} // 要引入到 node.json 中的内容

    // 收集插件中要写入模板文件的内容
    for (let i = 0; i < config.plugins.length; i++) {
      const plugin = config.plugins[i]
      let build = {}
      try {
        // 专用 build
        if (platform === 'uni-app') {
          build = require(`../plugins/${plugin}/uni-app/build.js`)
        } else {
          build = require(`../plugins/${plugin}/miniprogram/build.js`)
        }
      } catch (e) { }
      try {
        // 通用 build
        build = Object.assign(require(`../plugins/${plugin}/build.js`), build)
      } catch (e) { }
      // 可以在当前平台使用
      if (!build.platform || build.platform.includes(platform)) {
        builds[plugin] = build
        plugins += `require('./${plugin}/${build.main ? build.main : 'index.js'}'),`
        if (build.template) {
          wxml += build.template.replace('wx:if', 'wx:elif').replace('v-if', 'v-else-if')
        }
        if (build.methods) {
          for (const method in build.methods) {
            js += build.methods[method].toString() + ','
          }
        }
        if (build.usingComponents) {
          Object.assign(json, build.usingComponents)
        }
        if (build.style) {
          wxss += build.style
        }
      }
    }

    // 加入其他自定义标签
    for (const item of config.customElements) {
      if (platform === 'uni-app') {
        if (item.platforms) {
          wxml += '<!-- #ifdef ' + item.platforms.join(' || ').toUpperCase() + ' -->'
        }
        voidTags += item.name + ','
        wxml += '<' + item.name + ' v-else-if="n.name==\'' + item.name + '\'" :class="n.attrs.class" :style="n.attrs.style"'
        if (item.attrs) {
          for (const attr of item.attrs) {
            wxml += ' :' + attr + '="n.attrs'
            if (attr.includes('-')) {
              wxml += '[\'' + attr + '\']"'
            } else {
              wxml += '.' + attr + '"'
            }
          }
        }
        wxml += ' />'
        if (item.platforms) {
          wxml += '<!-- #endif -->'
        }
      } else if (!item.platforms || item.platforms.join(',').toLowerCase().includes(platform)) {
        voidTags += item.name + ','
        wxml += '<' + item.name + ' wx:elif="{{n.name==\'' + item.name + '\'}}" class="{{n.attrs.class}}" style="{{n.attrs.style}}"'
        if (item.attrs) {
          for (const attr of item.attrs) {
            wxml += ' ' + attr + '="{{n.attrs'
            if (attr.includes('-')) {
              wxml += '[\'' + attr + '\']}}"'
            } else {
              wxml += '.' + attr + '}}"'
            }
          }
        }
        wxml += ' />'
      }
    }

    return through2.obj(function (file, _, callback) {
      if (file.isBuffer()) {
        // src 目录
        if (file.base.includes('src')) {
          let content = file.contents.toString()
          if (file.basename === 'index.js' || file.basename === 'mp-html.vue') {
            // 注册插件列表
            content = content.replace(/plugins\s*=\s*\[\]/, `plugins=[${plugins}]`)
          } else if (file.basename === 'parser.js') {
            // 设置标签名选择器
            content = content.replace(/tagSelector\s*=\s*{}/, `tagSelector=${JSON.stringify(tagSelector)}`)
            // 设置自闭合标签
              .replace(/voidTags\s*:\s*makeMap\('/, 'voidTags: makeMap(\'' + voidTags)
          } else if (file.basename === 'node.wxml') {
            // 引入模板
            content = content.replace(/<!--\s*insert\s*-->/, wxml)
          } else if (file.basename === 'node.js') {
            // 引入方法
            content = content.replace(/methods\s*:\s*{/, 'methods:{' + js)
          } else if (file.basename === 'node.wxss') {
            // 引入样式
            content = wxss + content
          } else if (file.basename === 'node.json') {
            // 引入组件声明
            const comps = JSON.stringify(json).slice(1, -1)
            if (comps) {
              content = content.replace(/"usingComponents"\s*:\s*{/, '"usingComponents":{' + comps + ',')
            }
          } else if (file.basename === 'node.vue') {
            // 引入 vue
            content = content.replace(/<!--\s*insert\s*-->/, wxml)
              .replace(/methods\s*:\s*{/, 'methods:{' + js)
              .replace('<style>', '<style>' + wxss.replace(/\.[a-zA-Z_][\s\S]*?[{,]/g, '/deep/ $&'))
            let importComp = ''
            let comps = ''
            for (let item in json) {
              const val = json[item]
              // 插件无法通过这种方式引入
              if (val.includes('plugin://')) continue
              item = item.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase())
              importComp += 'import ' + item + " from '" + val + "'\n"
              comps += item + ',\n'
            }
            content = content.replace('<script>', '<script>\n' + importComp)
              .replace(/components\s*:\s*{/, 'components: {\n' + comps)
          } else if (file.basename === 'local.html' && wxss) {
            // 引入样式
            content = '<style>' + wxss + '</style>' + content
          }
          file.contents = Buffer.from(content)
          for (const item in builds) {
            if (builds[item].handler) {
              builds[item].handler(file, platform)
            }
          }
        } else {
          // plugins 目录
          const name = file.relative.split(path.sep)[0]
          const build = builds[name]
          // 本平台不支持使用
          if (!build || file.extname === '.md' || file.basename === 'build.js') {
            callback()
            return
          }
          // import
          if (build.import) {
            if (typeof build.import === 'string') {
              if (file.relative.includes(build.import)) {
                file.import = true
              }
            } else {
              for (let i = 0; i < build.import.length; i++) {
                if (file.relative.includes(build.import[i])) {
                  file.import = true
                  break
                }
              }
            }
          }
          if (build.handler) {
            build.handler(file, platform)
          }
        }
      }
      this.push(file)
      callback()
    })
  },
  /**
   * @description 引入样式文件到 node.wxss 中
   */
  importCss () {
    let css = ''
    return through2.obj(function (file, _, callback) {
      if (file.isBuffer()) {
        let content = file.contents.toString()
        // 要被引入的文件
        if (file.import) {
          css += content
          callback()
          return
        }
        // 引入到对应位置
        if (file.basename === 'node.wxss') {
          content = css + content
        } else if (file.basename === 'node.vue') {
          content = content.replace('<style>', '<style>' + css.replace(/\.[a-z_][\s\S]+?[{,]/g, '/deep/ $&'))
        } else if (file.basename === 'local.html' && css) {
          content = '<style>' + css + '</style>' + content
        }
        file.contents = Buffer.from(content)
      }
      this.push(file)
      callback()
    })
  }
}
