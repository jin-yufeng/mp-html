/**
 * @fileoverview 条件编译
 */
const through2 = require('through2')

/**
 * @description 条件编译
 * @param {string} platform 平台
 */
module.exports = function (platform) {
  return through2.obj(function (file, _, callback) {
    if (file.isBuffer()) {
      // 文件夹级别的处理
      if (file.relative.includes('miniprogram')) {
        if (platform !== 'uni-app') {
          // 去掉这一层
          file.path = file.path.replace(/(.*)[/\\]miniprogram/, '$1')
        } else {
          // 不用于本平台的文件
          callback()
          return
        }
      } else if (file.relative.includes('uni-app')) {
        if (platform === 'uni-app') {
          file.path = file.path.replace(/(.*)[/\\]uni-app/, '$1')
        } else {
          callback()
          return
        }
      }
      if (platform === 'uni-app') {
        // uni-app 平台 vue3 要求使用 es6 模块
        let content = file.contents.toString()
        if (file.basename === 'prism.min.js') {
          content = content.replace('"undefined"!=typeof module&&module.exports&&(module.exports=Prism),', 'export default Prism;')
        } else if (file.extname === '.js' && !file.relative.includes('static')) {
          content = content.replace(/module.exports\s*=\s*/, 'export default ')
            .replace(/const\s+([^\s=]+)\s*=\s*require\(([^)]+)\)/g, 'import $1 from $2')
        }
        file.contents = Buffer.from(content)
      } else {
        // 小程序平台进行进一步处理
        let content = file.contents.toString()
        /**
         * 方式1：
         * 在注释 #if(n)def xxx 和 #endif 之间的内容会根据是否定义 xxx 决定是否保留
         */
        const commentReg = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->/g // 提取所有注释
        const copy = content // 拷贝一个副本用于搜索
        let match = commentReg.exec(copy)
        const stack = []
        while (match) {
          if (match[0].includes('#if')) {
            stack.push([match[0], match.index])
          } else if (match[0].includes('#endif')) {
            const item = stack.pop()
            if (!item) {
              throw Error('条件编译错误：存在多余的 #endif，path:' + file.path + '，content: ' + content.substr(match.index, 100))
            }
            const def = item[0].match(/MP-[A-Z]+/gi) || [] // 取出定义条件
            let hit = false
            for (let i = 0; i < def.length; i++) {
              if (def[i] && platform === def[i].toLowerCase()) {
                hit = true // 命中
                break
              }
            }
            // 不匹配
            if ((item[0].includes('#ifdef') && !hit) || (item[0].includes('#ifndef') && hit)) {
              let fill = ''
              // 用空格填充
              for (let j = item[1] + item[0].length; j < match.index; j++) {
                if (content[j] === '\n') {
                  fill += '\n'
                } else {
                  fill += ' '
                }
              }
              content = content.substr(0, item[1] + item[0].length) + fill + content.substr(match.index)
            }
          }
          match = commentReg.exec(copy)
        }
        if (stack.length) {
          throw Error('条件编译错误：存在未闭合的 #ifdef，path:' + file.path + '，content: ' + content.substr(stack[0][1], 100))
        }

        /**
         * 方式2：
         * wxml 中属性前加平台名将仅编译到该平台，如 mp-weixin:attr
         */
        if (file.extname === '.wxml') {
          content = content.replace(/([^:\s]+:[^=\s]+)\s*=\s*"(.*?)"/g, ($, $1, $2) => {
            const platforms = $1.split(':')
            let name = platforms.pop()
            const last = platforms[platforms.length - 1]
            if (last && !last.includes('mp')) {
              name = platforms.pop() + ':' + name
            }
            if (!platforms.length) return $
            let i
            for (i = platforms.length; i--;) {
              if (platform === platforms[i].toLowerCase()) break
            }
            if (i >= 0) return `${name}="${$2}"`
            return ''
          })
        }
        file.contents = Buffer.from(content)
      }
    }
    this.push(file)
    callback()
  })
}
