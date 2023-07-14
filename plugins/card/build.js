module.exports = {
  usingComponents: {
    'my-card': '../card/card'
  },
  handler (file) {
    // 删去原来的 card 标签
    if (file.basename === 'node.wxml' || file.basename === 'node.vue') {
      file.contents = Buffer.from(file.contents.toString().replace(/<card[\s\S]+?>/, ''))
    }
  }
}
