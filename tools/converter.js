/**
 * @fileoverview 将微信端的代码转换到各个平台
 */
const through2 = require('through2')

// api 前缀
const prefix = {
  weixin: {
    wxml: 'wx:',
    js: 'wx.'
  },
  qq: {
    wxml: 'qq:',
    js: 'qq.'
  },
  baidu: {
    wxml: 's-',
    js: 'swan.'
  },
  alipay: {
    wxml: 'a:',
    js: 'my.'
  },
  toutiao: {
    wxml: 'tt:',
    js: 'tt.'
  }
}
// 文件名后缀
const suffix = {
  weixin: {
    wxml: '.wxml',
    wxss: '.wxss'
  },
  qq: {
    wxml: '.qml',
    wxss: '.qss'
  },
  baidu: {
    wxml: '.swan',
    wxss: '.css'
  },
  alipay: {
    wxml: '.axml',
    wxss: '.acss'
  },
  toutiao: {
    wxml: '.ttml',
    wxss: '.ttss'
  }
}

/**
 * @description 取出两个括号之间的内容
 * @param {string} content 总内容
 * @param {number} i 开始位置
 */
function getSection(content, i) {
  var j = i + 1,
    num = 1,
    start = content[i],
    end = start == '(' ? ')' : '}'
  while (num) {
    if (content[j] == start)
      num++
    else if (content[j] == end)
      num--
    j++
  }
  return content.substring(i, j)
}

/**
 * @description 处理不同小程序平台间的差异
 * @param {string} platform 使用平台
 */
module.exports = function (platform) {
  if (platform != 'uni-app')
    platform = platform.split('-')[1]
  return through2.obj(function (file, _, callback) {
    if (file.isBuffer()) {
      var content = file.contents.toString()
      if (platform == 'uni-app') {
        if (file.extname == '.js')
          content = content.replace(/\.properties/g, '')
      } else {
        // wxml 文件处理
        if (file.extname == '.wxml') {
          content = content.replace(/wx:/g, prefix[platform].wxml) // 替换 api 前缀
          file.extname = suffix[platform].wxml // 修改后缀名
          if (platform == 'qq')
            content = content.replace(/<wxs/g, '<qs').replace(/<\/wxs/g, '</qs') // wxs 转为 qs
          else if (platform == 'baidu')
            content = content.replace(/s-if=['"]{{(\S+)}}['"]/g, 's-if="$1"') // s-if 和 s-for 后不加 {{}}
              .replace(/s-for=['"]{{(\S+)}}['"]/g, 's-for="$1"')
              .replace(/data="(.*?)"/g, 'data="{$1}"')
          else if (platform == 'alipay')
            content = content.replace(/longpress/g, 'longTap')
              .replace(/bind([\S])/g, (_, $1) => { // bindevent 转为 onEvent
                return 'on' + $1.toUpperCase()
              }).replace(/catch([\S])/g, (_, $1) => { // catchevent 转为 catchEvent
                return 'catch' + $1.toUpperCase()
              })
        }

        // js 文件处理
        else if (file.extname == '.js') {
          // 替换 api 前缀
          content = content.replace(/wx\./g, prefix[platform].js)

          // 支付宝格式转换
          if (platform == 'alipay') {
            // 将 aa.triggerEvent('bb', cc) 替换为 aa.props.onBb && aa.props.onBb(cc)
            content = content.replace(/([a-zA-Z0-9._]+).triggerEvent\(['"](\S+?)['"],*/g, function (_, $1, $2) {
              var method = `${$1}.props.on${$2[0].toUpperCase()}${$2.slice(1)}`
              return `${method}&&${method}(`
            })

            // 转换 showToast
            var i = content.indexOf('.showToast')
            while (i != -1) {
              i += 10
              section = getSection(content, i)
              content = content.substr(0, i) + section.replace('title', 'content') + content.substr(i + section.length)
              i = content.indexOf('.showToast', i)
            }
            // 转换 showActionSheet
            i = content.indexOf('.showActionSheet')
            while (i != -1) {
              i += 16
              section = getSection(content, i)
              content = content.substr(0, i) + section.replace('itemList', 'items') + content.substr(i + section.length)
              i = content.indexOf('.showActionSheet', i)
            }
            // 转换 setClipboardData
            i = content.indexOf('.setClipboardData')
            while (i != -1) {
              i += 17
              section = getSection(content, i)
              content = content.substr(0, i - 4) + section.replace('data', 'text') + content.substr(i + section.length)
              i = content.indexOf('.setClipboardData', i)
            }
            // 组件格式转换
            if (content.includes('Component({')) {
              // 替换生命周期
              content = content.replace('created:', 'didMount:')
                .replace('detached:', 'didUnmount:')
              // 将 properties 字段转为 props 格式
              i = content.indexOf('{', content.indexOf('properties:'))
              var props, propsStr = '{',
                objStr = getSection(content, i)
              eval('props = ' + objStr) // 取出整个 properties 字段
              for (var item in props) {
                if (!props[item])
                  continue
                propsStr += item + ':'
                // 设置了默认值
                if (props[item].value) {
                  if (typeof props[item].value == 'boolean')
                    propsStr += props[item].value ? '!0' : '!1'
                  else
                    propsStr += props[item].value
                }
                // 没有设置默认值
                else {
                  var type = props[item].type || props[item]
                  if (type == String)
                    propsStr += '""'
                  else if (type == Boolean)
                    propsStr += '!1'
                  else if (type == Number)
                    propsStr += '0'
                  else if (type == Object)
                    propsStr += '{}'
                  else if (type == Array)
                    propsStr += '[]'
                }
                propsStr += ','
              }
              content = content.substr(0, i) + propsStr.substring(0, propsStr.length - 1) + '}' + content.substr(i + objStr.length)
            }

            content = content.replace(/properties/g, 'props')
              .replace(/\.setNavigationBarTitle/g, '.setNavigationBar')
          } else
            content = content.replace(/\.properties/g, '.data')
        }

        // wxss 文件处理
        else if (file.extname == '.wxss')
          file.extname = suffix[platform].wxss // 修改后缀名
      }
      file.contents = Buffer.from(content)
    }
    this.push(file)
    callback()
  })
}
