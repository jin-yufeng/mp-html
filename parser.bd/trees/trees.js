const errorImg = require('../libs/config.js').errorImg;
Component({
  data: {
    placeholder: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='225'/>",
    ctrl: []
  },
  properties: {
    nodes: {
      type: Array,
      observer(e) {
        for (var j = 0, item; item = e[j++];) {
          if (item.c) continue;
          // 获取图片列表
          if (item.name == 'img')
            this.top.imgList.setItem(item.attrs.i, item.attrs['original-src'] || item.attrs.src);
          // 视频控制
          else if (item.name == 'video') {
            var ctx = swan.createVideoContext(item.attrs.id);
            ctx.id = item.attrs.id;
            this.top.videoContexts.push(ctx);
          }
        }
      }
    },
    lazyLoad: Boolean,
    loading: String
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
      if (this.data.lazyLoad && !this.data.ctrl[i])
        this.setData({
          [`ctrl[${i}]`]: 1
        })
      else if (this.data.loading && this.data.ctrl[i] != 2)
        this.setData({
          [`ctrl[${i}]`]: 2
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
              fail() {
                swan.switchTab({
                  url: attrs.href,
                })
              }
            })
        }
      }
    },
    // 错误事件
    errorEvent(e) {
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
      this.setData({
        [`nodes[${e.target.dataset.i}].attrs.autoplay`]: true
      })
    }
  }
})