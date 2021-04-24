/**
 * @fileoverview txv-video 插件
 * Include txv-video (https://github.com/tvfe/txv-miniprogram-plugin)
 */
const TxvVideo = function (vm) {
  this.vm = vm
}

// #ifdef MP-WEIXIN || MP-QQ
const TxvContext = requirePlugin('tencentvideo')

TxvVideo.prototype.onUpdate = function (_, config) {
  config.trustTags['txv-video'] = true
  this.videos = []
}

TxvVideo.prototype.onParse = function (node, parser) {
  if (node.name === 'iframe' && (node.attrs.src || '').includes('vid')) {
    const vid = node.attrs.src.match(/vid=([^&\s]+)/)
    if (vid) {
      node.name = 'txv-video'
      node.attrs.vid = vid[1]
      this.videos.push(vid[1])
      node.attrs.src = undefined
      parser.expose()
    }
  }
}

TxvVideo.prototype.onLoad = function () {
  setTimeout(() => {
    for (let i = 0; i < this.videos.length; i++) {
      const ctx = TxvContext.getTxvContext(this.videos[i])
      ctx.id = this.videos[i]
      this.vm._videos.push(ctx)
    }
  }, 50)
}
// #endif

module.exports = TxvVideo
