module.exports = {
  import: 'katex.css',
  handler (file) {
    if (file.isBuffer()) {
      let content = file.contents.toString()
      if (file.basename === 'node.wxml') {
        content = content.replace(/(n.?)\.name==='a'\|\|/g, "$1.name==='a'||$1.l||")
      } else if (file.basename === 'node.vue') {
        content = content.replace(/!handler.isInline\((.*?)\)/, '(n.l||!handler.isInline($1))')
      }
      file.contents = Buffer.from(content)
    }
  }
}
