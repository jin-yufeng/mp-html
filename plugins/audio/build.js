module.exports = {
  usingComponents: {
    'my-audio': '../audio/audio'
  },
  handler (file) {
    // 删去原来的 audio 标签
    if (file.basename === 'node.wxml' || file.basename === 'node.vue') {
      file.contents = Buffer.from(file.contents.toString().replace(/<audio[\s\S]+?>/, ''))
    }
  }
}
