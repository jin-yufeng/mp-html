/**
 * @fileoverview latex 插件
 * katex.min.js来源 https://github.com/rojer95/katex-mini
 */
const parse = require('./katex.min')

function Latex () {

}

Latex.prototype.onParse = function (node, vm) {
  // $...$包裹的内容为latex公式
  if (!vm.options.editable && node.type === 'text' && node.text.includes('$')) {
    const part = node.text.split(/(\${1,2})/)
    const children = []
    let status = 0
    for (let i = 0; i < part.length; i++) {
      if (i % 2 === 0) {
        // 文本内容
        if (part[i]) {
          if (status === 0) {
            children.push({
              type: 'text',
              text: part[i]
            })
          } else {
            const nodes = parse.default(part[i])
            if (status === 1) {
              // 行内公式
              children.push({
                name: 'span',
                attrs: {},
                l: 'T',
                f: 'display:inline-block',
                children: nodes
              })
            } else {
              // 块公式
              children.push({
                name: 'div',
                attrs: {
                  style: 'text-align:center'
                },
                children: nodes
              })
            }
          }
        }
      } else {
        // 分隔符
        if (part[i] === '$' && part[i + 2] === '$') {
          // 行内公式
          status = 1
          part[i + 2] = ''
        } else if (part[i] === '$$' && part[i + 2] === '$$') {
          // 块公式
          status = 2
          part[i + 2] = ''
        } else {
          if (part[i] && part[i] !== '$$') {
            // 普通$符号
            part[i + 1] = part[i] + part[i + 1]
          }
          // 重置状态
          status = 0
        }
      }
    }
    node.type = undefined
    node.text = undefined
    node.name = 'span'
    node.attrs = {}
    node.children = children
  }
}

module.exports = Latex
