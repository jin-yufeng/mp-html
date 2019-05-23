var html2nodes = require('./Parser.js');
var initData = function(that) {
  setTimeout(function() {
    that.createSelectorQuery().select('#contain').boundingClientRect(function(res) {
      that.triggerEvent('ready', res);
    }).exec();
    that.videoContext = [];
    var nodes = [that.selectComponent('#contain')];
    nodes = nodes.concat(that.selectAllComponents('#contain>>>#node'));
    for (var node of nodes) {
      for (var item of node.data.nodes) {
        if (item.name == 'video')
          that.videoContext.push({
            id: item.attrs.id,
            context: wx.createVideoContext(item.attrs.id, node)
          });
        else if (item.name == 'audio' && item.attrs.autoplay)
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
        var hideAnimation = {},
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
          var that = this;
          html2nodes(html, this.data.tagStyle).then(function(res) {
            that.setData({
              nodes: res.nodes,
              controls: {},
              showAnimation,
              hideAnimation
            }, initData(that))
            if (res.title) {
              wx.setNavigationBarTitle({
                title: res.title
              })
            }
            that.imgList = res.imgList;
            that.triggerEvent('parse', res);
          }).catch(function(err) {
            that.triggerEvent('error', err);
          })
        } else if (html.constructor == Array) {
          this.setData({
            controls: {},
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
            controls: {},
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
    'autopause': {
      type: Boolean,
      value: true
    },
    'selectable': {
      type: Boolean,
      value: true
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
        for (var video of this.videoContext) {
          if (video.id == e.detail) continue;
          video.context.pause();
        }
      }
    },
    _copyhref(e) {
      if (this.data.selectable) {
        wx.setClipboardData({
          data: e.detail,
          success: function(res) {
            wx.showToast({
              title: '内容已复制',
            })
          }
        })
      }
    }
  }
})