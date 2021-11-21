const config = require('../config')

const build = {
  import: 'prism.css',
  handler (file) {
    if (file.path.includes('prism.css')) {
      // 将标签名选择器和属性选择器转为 class 选择器（组件内仅支持 class 选择器）
      file.contents = Buffer.from(file.contents.toString().replace(/pre([[)])/g, '.hl-pre$1').replace(/code/g, '.hl-code').replace(/\[class\*="?language-"?\]/g, '').replace(/:not[^,}]+[,}]*/g, '').replace(/\.token\./g, '.hl-'))
    }
  }
}

if (config.showLanguageName || config.showLineNumber) {
  // pre 内部的 code 进行滚动，避免行号和语言名称跟随滚动
  build.style = `.hl-pre {
  position: relative;
}
.hl-code {
  overflow: auto;
  display: block;
}`
}

if (config.copyByLongPress) {
  build.template = '<rich-text v-if="n.attrs[\'data-content\']" :nodes="[n]" :data-content="n.attrs[\'data-content\']" :data-lang="n.attrs[\'data-lang\']" @longpress="copyCode" />'
  build.methods = {
    copyCode (e) {
      uni.showActionSheet({
        itemList: ['复制代码'],
        success: () =>
          uni.setClipboardData({
            data: e.currentTarget.dataset.content
          })
      })
    }
  }
}

if (config.showLanguageName) {
  build.style = (build.style || '') +
    `.hl-language {
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  right: 8px;
  text-align: right;
  top: 3px;
}
.hl-pre {
  padding-top: 1.5em;
}`
}

if (config.showLineNumber) {
  build.style = (build.style || '') +
    `.hl-pre {
  font-size: 14px;
  padding-left: 3.8em;
  counter-reset: linenumber;
}
.line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: ${config.showLanguageName ? 1.5 : 1}em;
  font-size: 100%;
  left: 0;
  width: 3em; /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 1px solid #999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.line-numbers-rows .span {
  display: block;
  counter-increment: linenumber;
} 
.line-numbers-rows .span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}`
}

module.exports = build
