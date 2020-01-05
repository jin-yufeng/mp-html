/*
 trees 递归显示组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
Component({
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
  created() {
    // 提交错误事件
    this.triggerError = (source, target, errMsg, errCode, context) => {
      this._top ? this._top.triggerEvent('error', {
        source,
        target,
        errMsg,
        errCode,
        context
      }) : null;
    };
    // 加载其他源
    this.loadSource = (target) => {
      var index = (this.data.controls[target.id] ? this.data.controls[target.id].index : 0) + 1;
      if (index < target.dataset.source.length) {
        this.setData({
          [`controls.${target.id}.index`]: index
        })
        return true;
      }
      return false;
    }
  },
  detached() {
    if (this._observer) this._observer.disconnect();
  },
  methods: {
    // 视频播放事件
    playEvent(e) {
      if (this._top && (this._top.videoContexts || []).length > 1 && this._top.data.autopause) {
        for (var i = this._top.videoContexts.length; i--;) {
          if (this._top.videoContexts[i].id != e.currentTarget.id)
            this._top.videoContexts[i].pause();
        }
      }
    },
    // 图片预览事件
    previewEvent(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore && this._top) {
        var preview = true;
        this._top.triggerEvent('imgtap', {
          id: e.currentTarget.id,
          src: attrs.src,
          ignore: () => preview = false
        })
        if (preview && this._top.data.autopreview) {
          var urls = this._top.imgList || [],
            current = urls[attrs.i] ? urls[attrs.i] : (urls = [attrs.src], attrs.src);
          wx.previewImage({
            current,
            urls
          })
        }
      }
    },
    // 链接点击事件
    tapEvent(e) {
      if (!this._top) return;
      var jump = true,
        attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      this._top.triggerEvent('linkpress', attrs);
      if (jump) {
        if (attrs['app-id'] || attrs.appId) {
          wx.navigateToMiniProgram({
            appId: attrs['app-id'] || attrs.appId,
            path: attrs.path || ''
          })
        } else if (attrs.href) {
          if (attrs.href[0] == "#") {
            if (this._top.data.useAnchor)
              this._top.navigateTo({
                id: attrs.href.substring(1)
              })
          } else if (attrs.href.indexOf("http") == 0 || attrs.href.indexOf("//") == 0) {
            if (this._top.data.autocopy)
              wx.setClipboardData({
                data: attrs.href,
                success() {
                  wx.showToast({
                    title: '链接已复制',
                  })
                }
              })
          } else
            wx.navigateTo({
              url: attrs.href,
            })
        }
      }
    },
    // 错误事件
    adError(e) {
      this.triggerError("ad", e.currentTarget, e.detail.errMsg, e.detail.errCode);
    },
    videoError(e) {
      if (!this.loadSource(e.currentTarget) && this._top)
        this.triggerError("video", e.currentTarget, e.detail.errMsg, undefined, this._top.getVideoContext(e.currentTarget.id));
    },
    audioError(e) {
      if (!this.loadSource(e.currentTarget))
        this.triggerError("audio", e.currentTarget, e.detail.errMsg);
    },
    // 加载视频
    loadVideo(e) {
      this.setData({
        [`controls.${e.currentTarget.id}`]: {
          play: true,
          index: 0
        }
      })
    }
  }
})