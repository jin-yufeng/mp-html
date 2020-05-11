/*
  trees 递归子组件
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/05/11
*/
Component({
  data: {
    placeholder: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='225'/>",
  },
  properties: {
    nodes: Array,
    lazyLoad: Boolean
  },
  attached() {
    this.dispatch('childAppend', this);
  },
  methods: {
    // 视频播放事件
    play(e) {
      if (this.top.videoContexts.length > 1 && this.top.data.autopause)
        for (var i = this.top.videoContexts.length; i--;)
          if (this.top.videoContexts[i].id != e.currentTarget.id)
            this.top.videoContexts[i].pause();
    },
    // 图片事件
    imgtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true, data = {
          id: e.currentTarget.id,
          src: attrs.src,
          ignore: () => preview = false
        };
        this.top.triggerEvent('imgtap', data);
        if (preview) {
          var urls = this.top.imgList,
            current = urls[attrs.i] ? urls[attrs.i] : (urls = [attrs.src], attrs.src);
          swan.previewImage({
            current,
            urls
          })
        }
      }
    },
    loadImg(e) {
      var i = e.target.dataset.i;
      if (this.data.lazyLoad && !this.data.nodes[i].load)
        this.setData({
          [`nodes[${i}].load`]: true
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
          swan.navigateToSmartProgram({
            appKey: attrs['app-id'],
            path: attrs.path
          })
        else if (attrs.href) {
          if (attrs.href[0] == '#')
            this.top.navigateTo({
              id: attrs.href.substring(1)
            })
          else if (attrs.href.indexOf('http') == 0 || attrs.href.indexOf('//') == 0)
            swan.setClipboardData({
              data: attrs.href,
              success: () =>
                swan.showToast({
                  title: '链接已复制'
                })
            })
          else
            swan.navigateTo({
              url: attrs.href,
            })
        }
      }
    },
    // 错误事件
    errorEvent(e) {
      var context, source = e.target.dataset.source,
        i = e.target.dataset.i,
        node = this.data.nodes[i];
      if (source == 'video' || source == 'audio') {
        // 加载其他 source
        var index = (node.i || 0) + 1;
        if (index < node.attrs.source.length)
          return this.setData({
            [`nodes[${i}].i`]: index
          })
        if (this.top) context = this.top.getVideoContext(e.target.id);
      } else if (source == 'img')
        context = {
          setSrc: src => {
            this.setData({
              [`nodes[${i}].attrs.src`]: src
            })
          }
        }
      this.top && this.top.triggerEvent('error', {
        source,
        target: e.target,
        context,
        ...e.detail
      })
    },
    // 加载视频
    loadVideo(e) {
      var i = e.target.dataset.i;
      this.setData({
        [`nodes[${i}].lazyLoad`]: false,
        [`nodes[${i}].attrs.autoplay`]: true
      })
    }
  }
})