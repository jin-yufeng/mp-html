/*
  trees 递归子组件
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/03/15
*/
Component({
  data: {
    controls: {}
  },
  properties: {
    nodes: Array,
    lazyLoad: Boolean
  },
  detached() {
    this.observer && this.observer.disconnect();
  },
  methods: {
    // 视频播放事件
    play(e) {
      this.top.group && this.top.group.pause(this.top.i);
      if (this.top.videoContexts.length > 1 && this.top.data.autopause)
        for (var i = this.top.videoContexts.length; i--;)
          if (this.top.videoContexts[i].id != e.currentTarget.id)
            this.top.videoContexts[i].pause();
    },
    // 图片点击事件
    imgtap(e) {
      var attrs = e.target.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true;
        this.top.triggerEvent('imgtap', {
          id: e.target.id,
          src: attrs.src,
          ignore: () => preview = false
        })
        if (preview) {
          if (this.top.group) return this.top.group.preview(this.top.i, attrs.i);
          var urls = this.top.imgList,
            current = urls[attrs.i] ? urls[attrs.i] : (urls = [attrs.src], attrs.src);
          wx.previewImage({
            current,
            urls
          })
        }
      }
    },
    imglongtap(e) {
      var attrs = e.target.dataset.attrs;
      if (!attrs.ignore)
        this.top.triggerEvent('imglongtap', {
          id: e.target.id,
          src: attrs.src
        })
    },
    // 链接点击事件
    linkpress(e) {
      var jump = true,
        attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      this.top.triggerEvent('linkpress', attrs);
      if (jump) {
        if (attrs['app-id'])
          wx.navigateToMiniProgram({
            appId: attrs['app-id'],
            path: attrs.path
          })
        else if (attrs.href) {
          if (attrs.href[0] == '#')
            this.top.navigateTo({
              id: attrs.href.substring(1)
            })
          else if (attrs.href.indexOf('http') == 0 || attrs.href.indexOf('//') == 0)
            wx.setClipboardData({
              data: attrs.href,
              success: () =>
                wx.showToast({
                  title: '链接已复制',
                })
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
      var context;
      if (e.target.dataset.from == 'Video' || e.target.dataset.from == 'Audio') {
        // 加载其他 source
        var index = this.data.controls[e.target.id] ? this.data.controls[e.target.id] + 1 : 1;
        if (index < e.target.dataset.source.length)
          return this.setData({
            [`controls.${e.target.id}`]: index
          });
        context = wx[`create${e.target.dataset.from}Context`](e.target.id, this);
      }
      this.top && this.top.triggerEvent('error', {
        source: e.target.dataset.from.toLowerCase(),
        target: e.target,
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
  }
})