/*
 trees 递归显示组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
Component({
  data: {
    imgLoad: false
  },
  created() {
    // 提交错误事件
    this.triggerError = (source, target, errMsg, errCode, context) => {
      if (this._top)
        this._top.triggerEvent('error', {
          source,
          target,
          errMsg,
          errCode,
          context
        })
    };
    // 加载其他源
    this.loadSource = (currentTarget) => {
      if (!this.data.controls[currentTarget.id] && currentTarget.source.length > 1) {
        this.data.controls[currentTarget.id] = {
          play: false,
          index: 1
        }
        this.setData({
          controls: this.data.controls
        })
        return true;
      }
      if (this.data.controls[currentTarget.id] && currentTarget.source.length > (this.data.controls[currentTarget.id].index + 1)) {
        this.data.controls[currentTarget.id].index++;
        this.setData({
          controls: this.data.controls
        })
        return true;
      }
      return false;
    }
  },
  detached() {
    if (this._observer) this._observer.disconnect();
  },
  properties: {
    nodes: {
      type: Array,
      value: []
    },
    controls: {
      type: Object,
      value: {}
    }
  },
  methods: {
    // 视频播放事件
    playEvent(e) {
      if (!this._top) return;
      if (this._top.videoContexts.length > 1 && this._top.data.autopause) {
        for (let video of this._top.videoContexts) {
          if (video.id == e.currentTarget.dataset.id) continue;
          video.pause();
        }
      }
    },
    // 图片预览事件
    previewEvent(e) {
      if (!this._top) return;
      if (!e.target.dataset.hasOwnProperty('ignore')) {
        var preview = true,
          src = e.currentTarget.dataset.src;
        this._top.triggerEvent('imgtap', {
          id: e.currentTarget.id,
          src,
          ignore: () => preview = false
        })
        if (preview && this._top.data.autopreview) {
          wx.previewImage({
            current: src,
            urls: this._top.imgList.length ? this._top.imgList : [src],
          })
        }
      }
    },
    // 链接点击事件
    tapEvent(e) {
      if (!this._top) return;
      var jump = true,
        href = e.currentTarget.dataset.href;
      this._top.triggerEvent('linkpress', {
        href,
        ignore: () => jump = false
      });
      if (jump && href) {
        if (href[0] == "#") {
          if (this._top.data.useAnchor)
            this._top.navigateTo({
              id: href.substring(1)
            })
        } else if (/^http/.test(href)) {
          if (this._top.data.autocopy)
            wx.setClipboardData({
              data: href,
              success() {
                wx.showToast({
                  title: '链接已复制',
                })
              }
            })
        } else
          wx.navigateTo({
            url: href,
          })
      }
    },
    // 错误事件
    adError(e) {
      this.triggerError("ad", e.currentTarget, e.detail.errMsg, e.detail.errCode);
    },
    videoError(e) {
      if (!this.loadSource(e.currentTarget.dataset) && this._top)
        this.triggerError("video", e.currentTarget, e.detail.errMsg, undefined, this._top.getVideoContext(e.currentTarget.id));
    },
    audioError(e) {
      if (!this.loadSource(e.currentTarget.dataset))
        this.triggerError("audio", e.currentTarget, e.detail.errMsg);
    },
    // 加载视频
    loadVideo(e) {
      this.data.controls[e.currentTarget.dataset.id] = {
        play: true,
        index: 0
      }
      this.setData({
        controls: this.data.controls
      })
    }
  }
})