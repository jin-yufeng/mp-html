global.Parser = {};
const errorImg = require('../libs/config.js').errorImg;
Component({
  data: {
    placeholder: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='225'/>",
  },
  properties: {
    nodes: Array,
    lazyLoad: Boolean,
    loading: String
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
    // 图片事件
    imgtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true, data = {
          id: e.currentTarget.id,
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
    loadImg(e) {
      var i = e.target.dataset.i;
      if (this.data.lazyLoad && !this.data.nodes[i].load)
        this.setData({
          [`nodes[${i}].load`]: 1
        })
      else if (this.data.loading && this.data.nodes[i].load != 2)
        this.setData({
          [`nodes[${i}].load`]: 2
        })
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
              fail() {
                tt.switchTab({
                  url: attrs.href,
                })
              }
            })
        }
      }
    },
    // 错误事件
    error(e) {
      var source = e.target.dataset.source,
        i = e.target.dataset.i,
        node = this.data.nodes[i];
      if (source == 'video' || source == 'audio') {
        // 加载其他 source
        var index = (node.i || 0) + 1;
        if (index < node.attrs.source.length)
          return this.setData({
            [`nodes[${i}].i`]: index
          })
      } else if (source == 'img' && errorImg) { 
        this.top.imgList.setItem(e.target.dataset.index, errorImg); 
        this.setData({ 
          [`nodes[${i}].attrs.src`]: errorImg 
        }) 
      }
      this.top && this.top.triggerEvent('error', {
        source,
        target: e.target,
        errMsg: e.detail.errMsg
      })
    },
    // 加载视频
    loadVideo(e) {
      var i = e.target.dataset.i;
      this.setData({
        [`nodes[${i}].attrs.autoplay`]: true
      })
    }
  }
})