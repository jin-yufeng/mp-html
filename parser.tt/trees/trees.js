/*
  trees 递归子组件
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/04/13
*/
global.Parser = {};
Component({
  properties: {
    nodes: Array,
    lazyLoad: Boolean
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
        var preview = true, data = {
          id: e.target.id,
          src: attrs.src,
          ignore: () => preview = false
        };
        global.Parser.onImgtap && global.Parser.onImgtap(attrs);
        this.top.triggerEvent('imgtap', data);
        if (preview) {
          if (this.top.group) return this.top.group.preview(this.top.i, attrs.i);
          var urls = this.top.imgList,
            current = urls[attrs.i] ? urls[attrs.i] : (urls = [attrs.src], attrs.src);
          tt.previewImage({
            current,
            urls
          })
        }
      }
    },
    // 链接点击事件
    linkpress(e) {
      var jump = true,
        attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      global.Parser.onLinkpress && global.Parser.onLinkpress(attrs);
      this.top.triggerEvent('linkpress', attrs);
      if (jump) {
        if (attrs['app-id'])
          tt.navigateToMiniProgram({
            appId: attrs['app-id'],
            path: attrs.path
          })
        else if (attrs.href) {
          if (attrs.href[0] == '#')
            this.top.navigateTo({
              id: attrs.href.substring(1)
            })
          else if (attrs.href.indexOf('http') == 0 || attrs.href.indexOf('//') == 0)
            tt.setClipboardData({
              data: attrs.href,
              success: () =>
                tt.showToast({
                  title: '链接已复制'
                })
            })
          else
            tt.navigateTo({
              url: attrs.href,
            })
        }
      }
    },
    // 错误事件
    error(e) {
      var context, src = '',
        source = e.target.dataset.source,
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
          setSrc: (newSrc) => src = newSrc
        }
      this.top && this.top.triggerEvent('error', {
        source,
        target: e.target,
        context,
        ...e.detail
      })
      if (source == 'img') {
        var data = {
          [`nodes[${i}].attrs.src`]: src
        }
        if (!src) data[`nodes[${i}].err`] = 1;
        this.setData(data);
      }
    },
    // 加载视频
    loadVideo(e) {
      var i = e.target.dataset.i;
      this.setData({
        [`nodes[${i}].lazyLoad`]: false,
        [`nodes[${i}].attrs.autoplay`]: true
      })
    },
    // 加载图片
    loadImg(e) {
      var data = e.target.dataset;
      if (data.auto)
        this.setData({
          [`nodes[${data.i}].attrs.style`]: `${this.data.nodes[data.i].attrs.style};width:${e.detail.width}px`
        })
    }
  }
})