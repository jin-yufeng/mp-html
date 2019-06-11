//Parser组件
const html2nodes = require('./Parser.js');
const initData = function(Component) {
  setTimeout(() => {
    Component.createSelectorQuery().select('#contain').boundingClientRect(res => {
      Component.triggerEvent('ready', res);
    }).exec();
    Component.videoContext = [];
    let nodes = [Component.selectComponent('#contain')];
    nodes = nodes.concat(Component.selectAllComponents('#contain>>>#node'));
    for (let node of nodes) {
      for (let item of node.data.nodes) {
        if (item.name == 'video') {
          Component.videoContext.push({
            id: item.attrs.id,
            context: wx.createVideoContext(item.attrs.id, node)
          });
        } else if (item.name == 'audio' && item.attrs.autoplay)
          wx.createAudioContext(item.attrs.id, node).play();
      }
    }
  }, 10)
}
Component({
  properties: {
    'html': {
      type: null,
      value: '',
      observer: function(html) {
        let hideAnimation = {},
          showAnimation = {};
        if (this.data.showWithAnimation) {
          hideAnimation = wx.createAnimation({
            duration: this.data.animationDuration,
            timingFunction: "ease"
          }).opacity(0).step().export();
          showAnimation = wx.createAnimation({
            duration: this.data.animationDuration,
            timingFunction: "ease"
          }).opacity(1).step().export();
        }
        if (!html) {
          this.setData({
            nodes: []
          })
        } else if (typeof html == 'string') {
          html2nodes(html, this.data.tagStyle).then(res => {
            this.setData({
              nodes: res.nodes,
              controls: {
                imgMode: this.data.imgMode
              },
              showAnimation,
              hideAnimation
            }, initData(this))
            if (res.title) {
              wx.setNavigationBarTitle({
                title: res.title
              })
            }
            this.imgList = res.imgList;
            this.triggerEvent('parse', res);
          }).catch(err => {
            this.triggerEvent('error', err);
          })
        } else if (html.constructor == Array) {
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation,
            hideAnimation
          }, initData(this))
          this.imgList = [];
        } else if (typeof html == 'object') {
          if (!html.nodes || html.nodes.constructor != Array) {
            this.triggerEvent('error', {
              message: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + typeof html.nodes
            });
            return;
          }
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation,
            hideAnimation
          }, initData(this))
          if (html.title) {
            wx.setNavigationBarTitle({
              title: html.title
            })
          }
          this.imgList = html.imgList || [];
        } else {
          this.triggerEvent('error', {
            message: "错误的html类型：" + typeof html
          });
        }
      }
    },
    'autocopy': {
      type: Boolean,
      value: true
    },
    'autopause': {
      type: Boolean,
      value: true
    },
    'imgMode': {
      type: String,
      value: "default"
    },
    'selectable': {
      type: Boolean,
      value: false
    },
    'tagStyle': {
      type: Object,
      value: {}
    },
    'showWithAnimation': {
      type: Boolean,
      value: false
    },
    'animationDuration': {
      type: Number,
      value: 400
    }
  },
  methods: {
    //事件
    tapEvent(e) {
      if (this.data.autocopy && e.detail && /^http/.test(e.detail)) {
        wx.setClipboardData({
          data: e.detail,
          success() {
            wx.showToast({
              title: '链接已复制',
            })
          }
        })
      }
      this.triggerEvent('linkpress', e.detail);
    },
    errorEvent(e) {
      this.triggerEvent('error', e.detail);
    },
    //内部方法
    _previewImg(e) {
      wx.previewImage({
        current: e.detail,
        urls: this.imgList.length ? this.imgList : [e.detail],
      })
    },
    _playVideo(e) {
      if (this.videoContext.length > 1 && this.data.autopause) {
        for (let video of this.videoContext) {
          if (video.id == e.detail) continue;
          video.context.pause();
        }
      }
    }
  }
})