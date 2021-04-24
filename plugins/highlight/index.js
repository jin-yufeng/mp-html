/**
 * @fileoverview highlight 插件
 * Include prismjs (https://prismjs.com)
 */
const prism = require('./prism.min')
const config = require('./config')
const Parser = require('../parser')

function Highlight (vm) {
  this.vm = vm
}

Highlight.prototype.onParse = function (node, vm) {
  if (node.name === 'pre') {
    let i
    for (i = node.children.length; i--;) {
      if (node.children[i].name === 'code') break
    }
    if (i === -1) return
    const code = node.children[i]
    let className = code.attrs.class || ''
    i = className.indexOf('language-')
    if (i === -1) {
      className = node.attrs.class || ''
      i = className.indexOf('language-')
    }
    if (i === -1) {
      className = 'language-text'
      i = className.indexOf('language-')
    }
    i += 9
    let j
    for (j = i; j < className.length; j++) {
      if (className[j] === ' ') break
    }
    const lang = className.substring(i, j)
    if (code.children.length && code.children[0].type === 'text') {
      const text = code.children[0].text.replace(/&amp;/g, '&')
      if (prism.languages[lang]) {
        code.children = (new Parser(this.vm).parse(
          // 加一层 pre 保留空白符
          '<pre>' + prism.highlight(text, prism.languages[lang], lang).replace(/token /g, 'hl-') + '</pre>'))[0].children
      }
      node.attrs.class = 'hl-pre'
      code.attrs.class = 'hl-code'
      if (config.showLanguageName) {
        node.children.push({
          name: 'div',
          attrs: {
            class: 'hl-language',
            style: 'user-select:none'
          },
          children: [{
            type: 'text',
            text: lang
          }]
        })
      }
      if (config.copyByLongPress) {
        node.attrs.style += (node.attrs.style || '') + ';user-select:none'
        node.attrs['data-content'] = text
        vm.expose()
      }
      if (config.showLineNumber) {
        const line = text.split('\n').length; const children = []
        for (let k = line; k--;) {
          children.push({
            name: 'span',
            attrs: {
              class: 'span'
            }
          })
        }
        node.children.push({
          name: 'span',
          attrs: {
            class: 'line-numbers-rows'
          },
          children
        })
      }
    }
  }
}

module.exports = Highlight
