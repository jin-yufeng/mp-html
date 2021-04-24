/**
 * @fileoverview markdown 插件
 * Include marked (https://github.com/markedjs/marked)
 * Include github-markdown-css (https://github.com/sindresorhus/github-markdown-css)
 */
const marked = require('./marked.min')
let index = 0

function Markdown (vm) {
  this.vm = vm
  vm._ids = {}
}

Markdown.prototype.onUpdate = function (content) {
  if (this.vm.properties.markdown) {
    return marked(content)
  }
}

Markdown.prototype.onParse = function (node, vm) {
  if (vm.options.markdown) {
    // 中文 id 需要转换，否则无法跳转
    if (vm.options.useAnchor && node.attrs && /[\u4e00-\u9fa5]/.test(node.attrs.id)) {
      const id = 't' + index++
      this.vm._ids[node.attrs.id] = id
      node.attrs.id = id
    }
    if (node.name === 'p' || node.name === 'table' || node.name === 'tr' || node.name === 'th' || node.name === 'td' || node.name === 'blockquote' || node.name === 'pre' || node.name === 'code') {
      node.attrs.class = `md-${node.name} ${node.attrs.class || ''}`
    }
  }
}

module.exports = Markdown
