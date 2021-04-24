/**
 * @fileoverview style 插件
 */
function Style () {
  this.styles = []
}

// #ifndef APP-PLUS-NVUE
const Parser = require('./parser')

Style.prototype.onParse = function (node, vm) {
  // 获取样式
  if (node.name === 'style' && node.children.length && node.children[0].type === 'text') {
    this.styles = this.styles.concat(new Parser().parse(node.children[0].text))
  } else if (node.name) {
    // 匹配样式（对非文本标签）
    // 存储不同优先级的样式 name < class < id < 后代
    let matched = ['', '', '', '']
    for (let i = 0, len = this.styles.length; i < len; i++) {
      const item = this.styles[i]
      let res = match(node, item.key || item.list[item.list.length - 1])
      let j
      if (res) {
        // 后代选择器
        if (!item.key) {
          j = item.list.length - 2
          for (let k = vm.stack.length; j >= 0 && k--;) {
            // 子选择器
            if (item.list[j] === '>') {
              // 错误情况
              if (j < 1 || j > item.list.length - 2) break
              if (match(vm.stack[k], item.list[j - 1])) {
                j -= 2
              } else {
                j++
              }
            } else if (match(vm.stack[k], item.list[j])) {
              j--
            }
          }
          res = 4
        }
        if (item.key || j < 0) {
          // 添加伪类
          if (item.pseudo && node.children) {
            let text
            item.style = item.style.replace(/content:([^;]+)/, (_, $1) => {
              text = $1.replace(/['"]/g, '')
                // 处理 attr 函数
                .replace(/attr\((.+?)\)/, (_, $1) => node.attrs[$1.trim()] || '')
                // 编码 \xxx
                .replace(/\\(\w{4})/, (_, $1) => String.fromCharCode(parseInt($1, 16)))
              return ''
            })
            const pseudo = {
              name: 'span',
              attrs: {
                style: item.style
              },
              children: [{
                type: 'text',
                text
              }]
            }
            if (item.pseudo === 'before') {
              node.children.unshift(pseudo)
            } else {
              node.children.push(pseudo)
            }
          } else {
            matched[res - 1] += item.style + (item.style[item.style.length - 1] === ';' ? '' : ';')
          }
        }
      }
    }
    matched = matched.join('')
    if (matched.length > 2) {
      node.attrs.style = matched + (node.attrs.style || '')
    }
  }
}

/**
 * @description 匹配样式
 * @param {object} node 要匹配的标签
 * @param {string|string[]} keys 选择器
 * @returns {number} 0：不匹配；1：name 匹配；2：class 匹配；3：id 匹配
 */
function match (node, keys) {
  function matchItem (key) {
    if (key[0] === '#') {
      // 匹配 id
      if (node.attrs.id && node.attrs.id.trim() === key.substr(1)) return 3
    } else if (key[0] === '.') {
      // 匹配 class
      key = key.substr(1)
      const selectors = (node.attrs.class || '').split(' ')
      for (let i = 0; i < selectors.length; i++) {
        if (selectors[i].trim() === key) return 2
      }
    } else if (node.name === key) {
      // 匹配 name
      return 1
    }
    return 0
  }

  // 多选择器交集
  if (keys instanceof Array) {
    let res = 0
    for (let j = 0; j < keys.length; j++) {
      const tmp = matchItem(keys[j])
      // 任意一个不匹配就失败
      if (!tmp) return 0
      // 优先级最大的一个作为最终优先级
      if (tmp > res) {
        res = tmp
      }
    }
    return res
  }

  return matchItem(keys)
}
// #endif

module.exports = Style
