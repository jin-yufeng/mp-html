/**
 * @fileoverview audio 插件
 */
const context = require('./context')
let index = 0

function Audio (vm) {
  this.vm = vm
}

Audio.prototype.onUpdate = function () {
  this.audios = []
}

Audio.prototype.onParse = function (node) {
  if (node.name === 'audio') {
    if (!node.attrs.id) {
      node.attrs.id = 'a' + index++
    }
    this.audios.push(node.attrs.id)
  }
}

Audio.prototype.onLoad = function () {
  setTimeout(() => {
    for (let i = 0; i < this.audios.length; i++) {
      const ctx = context.get(this.audios[i])
      ctx.id = this.audios[i]
      this.vm._videos.push(ctx)
    }
  }, 50)
}

module.exports = Audio
