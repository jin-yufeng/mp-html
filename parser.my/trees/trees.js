const errorImg = require('../libs/config.js').errorImg;
Component({
  data: {
    ctrl: [],
    errorImg,
    placeholder: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='225'/>"
  },
  properties: {
    nodes: [],
    lazyLoad: false,
    loading: '',
    onAppend() {}
  },
  didMount() {
    this.props.onAppend(this);
  },
  didUpdate(e) {
    if (e.nodes != this.props.nodes) {
      if (this.data.ctrl.length)
        this.setData({
          ctrl: []
        })
      this.init();
    }
  },
  methods: {
    init() {
      for (var j = 0, item; item = this.props.nodes[j++];) {
        if (item.c) continue;
        // 获取图片列表
        if (item.name == 'img')
          this.top.imgList.setItem(item.attrs.i, item.attrs['original-src'] || item.attrs.src);
        // 音视频控制
        else if (item.name == 'video') {
          var ctx = my.createVideoContext(item.attrs.id);
          ctx.id = item.attrs.id;
          this.top.videoContexts.push(ctx);
        }
      }
    },
    // 视频播放事件
    play(e) {
      if (this.top.videoContexts.length > 1 && this.top.props.autopause)
        for (var i = this.top.videoContexts.length; i--;)
          if (this.top.videoContexts[i].id != e.currentTarget.id)
            this.top.videoContexts[i].pause();
    },
    // 图片事件
    imgtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true;
        this.top.props.onImgtap({
          id: e.currentTarget.id,
          src: attrs.src,
          ignore: () => preview = false
        })
        if (preview) {
          var urls = this.top.imgList,
            current = attrs.i;
          my.previewImage({
            current,
            urls
          })
        }
      }
    },
    loadImg(e) {
      var i = e.target.dataset.i;
      if (this.props.lazyLoad && !this.data.ctrl[i])
        this.setData({
          [`ctrl[${i}]`]: 1
        })
      else if (this.props.loading && this.data.ctrl[i] != 2)
        this.setData({
          [`ctrl[${i}]`]: 2
        })
    },
    // 链接点击事件
    linkpress(e) {
      var jump = true,
        attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      this.top.props.onLinkpress(attrs);
      if (jump) {
        if (attrs['app-id'])
          my.navigateToMiniProgram({
            appId: attrs['app-id'],
            path: attrs.path
          })
        else if (attrs.href) {
          if (attrs.href[0] == '#')
            this.top.navigateTo({
              id: attrs.href.substring(1)
            })
          else if (attrs.href.indexOf('http') == 0 || attrs.href.indexOf('//') == 0)
            my.setClipboard({
              data: attrs.href,
              success: () =>
                my.showToast({
                  content: '链接已复制'
                })
            })
          else
            my.navigateTo({
              url: attrs.href,
              fail() {
                my.switchTab({
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
        node = this.props.nodes[i];
      if (source == 'video' || source == 'audio') {
        // 加载其他 source
        var index = (node.i || 0) + 1;
        if (index < node.attrs.source.length)
          return this.setData({
            [`ctrl[${i}]`]: index
          })
      } else if (source == 'img' && errorImg) {
        this.top.imgList.setItem(e.target.dataset.index, errorImg);
        this.setData({
          [`ctrl[${i}]`]: 3
        })
      }
      this.top && this.top.props.onError({
        source,
        target: e.target,
        errMsg: e.detail.errMsg
      })
    },
    // 加载视频
    loadVideo(e) {
      this.setData({
        [`ctrl[${e.target.dataset.i}]`]: 0
      })
    },
    appendChild(e) {
      this.props.onAppend(e);
    }
  }
})