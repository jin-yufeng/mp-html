//Parser组件
var Document;
try {
  Document = require("./document.js");
} catch (e) {}
const html2nodes = require('./Parser.js');
const CanIUseObserver = require("./api.js").versionHigherThan('1.9.3');
const CanIUseNextTick = wx.canIUse('nextTick');
const initData = function(Component) {
  Component.navigateTo = function(obj) {
	obj.success = obj.success || function () { };
    obj.fail = obj.fail || function () { };
    function Scroll(selector) {
      const query = Component.createSelectorQuery();
      query.select(selector).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(res => {
        if (!res||!res[0])
          return obj.fail({
            errMsg: "Label Not Found"
          });
        wx.pageScrollTo({
          scrollTop: res[1].scrollTop + res[0].top,
          success: obj.success,
          fail: obj.fail
        })
      })
    }
    if (!obj.id) Scroll("#contain");
    else Scroll('#contain >>> #' + obj.id);
  }
  Component.createSelectorQuery().select('#contain').boundingClientRect(res => {
    Component.triggerEvent('ready', res);
  }).exec();
  Component.videoContext = [];
  let nodes = [Component.selectComponent('#contain')];
  nodes = nodes.concat(Component.selectAllComponents('#contain>>>.node'));
  for (let node of nodes) {
    let observered = false
    for (let item of node.data.nodes) {
      // 图片懒加载
      if (item.name == 'img' && !observered) {
        observered = true;
        if (node.data.lazyLoad && CanIUseObserver) {
          node._observer = node.createIntersectionObserver();
          node._observer.relativeToViewport({
            top: 1000,
            bottom: 1000
          }).observe('.img', res => {
            node.setData({
              imgLoad: true
            })
            node._observer.disconnect();
            node._observer = null;
          })
        } else {
          node.setData({
            imgLoad: true
          })
        }
      }
      // 音视频控制 
      else if (item.name == 'video') {
        Component.videoContext.push({
          id: item.attrs.id,
          context: wx.createVideoContext(item.attrs.id, node)
        });
      } else if (item.name == 'audio' && item.attrs.autoplay)
        wx.createAudioContext(item.attrs.id, node).play();
    }
  }
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
          html2nodes(html, this.data).then(res => {
            this.setData({
              nodes: res.nodes,
              controls: {
                imgMode: this.data.imgMode
              },
              showAnimation,
              hideAnimation
            })
            if (CanIUseNextTick) wx.nextTick(() => {
              initData(this)
            })
            else setTimeout(() => {
              initData(this)
            }, 30)
            if (Document) this.document = new Document("nodes", res.nodes, this);
            if (res.title && this.data.autosetTitle) {
              wx.setNavigationBarTitle({
                title: res.title
              })
            }
            this.imgList = res.imgList;
            this.triggerEvent('parse', res);
          }).catch(err => {
            this.triggerEvent('error', {
              source: "parse",
              errMsg: err
            });
          })
        } else if (html.constructor == Array) {
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation,
            hideAnimation
          })
          if (CanIUseNextTick) wx.nextTick(() => {
            initData(this)
          })
          else setTimeout(() => {
            initData(this)
          }, 30)
          if (Document) this.document = new Document("html", html, this);
          this.imgList = [];
        } else if (typeof html == 'object') {
          if (!html.nodes || html.nodes.constructor != Array) {
            if ((html.name && html.children && html.attrs) || (html.type == "text"))
              return;
            this.triggerEvent('error', {
              source: "parse",
              errMsg: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + typeof html.nodes
            });
            return;
          }
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation,
            hideAnimation
          })
          if (CanIUseNextTick) wx.nextTick(() => {
            initData(this)
          })
          else setTimeout(() => {
            initData(this)
          }, 30)
          if (Document) this.document = new Document("html.nodes", html.nodes, this);
          if (html.title && this.data.autosetTitle)
            wx.setNavigationBarTitle({
              title: html.title
            })
          this.imgList = html.imgList || [];
        } else {
          this.triggerEvent('error', {
            source: "parse",
            errMsg: "错误的html类型：" + typeof html
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
    'autopreview': {
      type: Boolean,
      value: true
    },
    'autosetTitle': {
      type: Boolean,
      value: true
    },
    'domain': {
      type: String,
      value: ""
    },
    'imgMode': {
      type: String,
      value: "default"
    },
    'lazyLoad': {
      type: Boolean,
      value: false
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
    },
    'useAnchor': {
      type: Boolean,
      value: false
    }
  },
  methods: {
    //事件
    tapEvent(e) {
      var jump = true;
      this.triggerEvent('linkpress', {
        href: e.detail.href,
        ignore: () => jump = false
      });
      if (jump && e.detail.href) {
        if (e.detail.href[0] == "#") {
          if (this.data.useAnchor)
            this.navigateTo({
              id: e.detail.href.substring(1)
            })
        } else if (/^http/.test(e.detail.href)) {
          if (this.data.autocopy)
            wx.setClipboardData({
              data: e.detail.href,
              success() {
                wx.showToast({
                  title: '链接已复制',
                })
              }
            })
        } else
          wx.navigateTo({
            url: e.detail.href,
          })
      }
    },
    errorEvent(e) {
      this.triggerEvent('error', e.detail);
    },
    previewEvent(e) {
      var preview = true;
      this.triggerEvent('imgtap', {
        id: e.detail.id,
        src: e.detail.src,
        ignore: () => preview = false
      })
      if (preview && this.data.autopreview) {
        wx.previewImage({
          current: e.detail.src,
          urls: this.imgList.length ? this.imgList : [e.detail.src],
        })
      }
    },
    //内部方法
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