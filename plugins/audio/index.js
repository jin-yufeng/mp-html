/**
 * @fileoverview audio 插件
 */
const context = require('./context')
let index = 0

function audio(vm) {
  this.vm = vm
}

audio.prototype.onUpdate = function () {
  this.audios = []
}

audio.prototype.onParse = function (node) {
  if (node.name == 'audio') {
    if (!node.attrs.id)
      node.attrs.id = 'a' + index++
    this.audios.push(node.attrs.id)
  }
}

audio.prototype.onLoad = function () {
  setTimeout(() => {
    for (var i = 0; i < this.audios.length; i++) {
      var ctx = context.get(this.audios[i])
      ctx.id = this.audios[i]
      this.vm._videos.push(ctx)
    }
  }, 50)
}

module.exports = audio
