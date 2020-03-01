/*
  trees 递归子组件
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
Component({
  data: {
    controls: {}
  },
  properties: {
    nodes: Array
  },
  methods: {
    // 自定义事件
    copyCode(e) {
      wx.showActionSheet({
        itemList: ["复制代码"],
        success: () => {
          wx.setClipboardData({
            data: this._top.document.getElementById(e.currentTarget.id).innerText
          })
        }
      })
    },
    // 视频播放事件
    play(e) {
      this._top.group && this._top.group.pause(this._top.i);
      if (this._top.videoContexts.length > 1 && this._top.data.autopause)
        for (var i = this._top.videoContexts.length; i--;)
          if (this._top.videoContexts[i].id != e.currentTarget.id)
            this._top.videoContexts[i].pause();
    },
    // 图片点击事件
    imgtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true;
        this._top.triggerEvent("imgtap", {
          id: e.currentTarget.id,
          src: attrs.src,
          ignore: () => preview = false
        })
        if (preview) {
          if (this._top.group) return this._top.group.preview(this._top.i, attrs.i);
          var urls = this._top.imgList,
            current = urls[attrs.i] ? urls[attrs.i] : (urls = [attrs.src], attrs.src);
          wx.previewImage({
            current,
            urls
          })
        }
      }
    },
    imglongtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore)
        this._top.triggerEvent("imglongtap", {
          id: e.currentTarget.id,
          src: attrs.src
        })
    },
    // 链接点击事件
    linkpress(e) {
      var jump = true,
        attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      this._top.triggerEvent("linkpress", attrs);
      if (jump) {
        if (attrs["app-id"])
          wx.navigateToMiniProgram({
            appId: attrs["app-id"],
            path: attrs.path
          })
        else if (attrs.href) {
          if (attrs.href[0] == '#')
            this._top.navigateTo({
              id: attrs.href.substring(1)
            })
          else if (attrs.href.indexOf("http") == 0 || attrs.href.indexOf("//") == 0)
            wx.setClipboardData({
              data: attrs.href,
              success() {
                wx.showToast({
                  title: "链接已复制",
                })
              }
            })
          else
            wx.navigateTo({
              url: attrs.href,
            })
        }
      }
    },
    // 错误事件
    error(e) {
      var context, target = e.currentTarget;
      if (target.dataset.from == "Video" || target.dataset.from == "Audio") {
        // 加载其他 source
        var index = this.data.controls[target.id] ? this.data.controls[target.id].index + 1 : 1;
        if (index < target.dataset.source.length)
          return this.setData({
            [`controls.${target.id}`]: index
          });
        context = wx[`create${target.dataset.from}Context`](target.id, this);
      }
      this._top && this._top.triggerEvent("error", {
        source: target.dataset.from.toLowerCase(),
        target,
        errMsg: e.detail.errMsg,
        errCode: e.detail.errCode,
        context
      });
    },
    // 加载视频
    loadVideo(e) {
      for (var i = this.data.nodes.length; i--;)
        if (this.data.nodes[i].attrs.id == e.currentTarget.id)
          return this.setData({
            [`nodes[${i}].lazyLoad`]: false,
            [`nodes[${i}].attrs.autoplay`]: true
          })
    }
  },
  detached() {
    this._observer && this._observer.disconnect();
  }
})