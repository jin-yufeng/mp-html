/**
 * @fileoverview latex 插件
 * katex.min.js来源 https://github.com/rojer95/katex-mini
 */
const parse = require('./katex.min')

function Latex () {

}

Latex.prototype.onParse = function (node, vm) {
  // $...$包裹的内容为latex公式
  if (!vm.options.editable && node.type === 'text' && /\$(.+?)\$/.test(node.text)) {
    delete node.type
    node.name = 'span'
    node.attrs = {}
    node.children = node.text.split('$').map((str, index) => {
      // 偶数
      if ((index + 1) % 2 === 0) {
        return {
          name: 'span',
          attrs: {},
          children: parse.default(str)
        }
      }
      return {
        type: 'text',
        text: str
      }
    })
    delete node.text
  }
}

module.exports = Latex
