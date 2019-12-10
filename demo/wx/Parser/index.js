/*
 parser 主模块组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
var Document;
try {
  Document = require("./libs/document.js");
} catch (e) {}
const parseHtmlSync = require('./libs/MpHtmlParser.js').parseHtmlSync;
const App = getApp();
Component({
  created() {
    // api
    this.navigateTo = (obj) => {
      obj.success = obj.success || (() => null);
      obj.fail = obj.fail || (() => null);
      var Scroll = (selector) => {
        const query = this.createSelectorQuery();
        query.select(selector).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => {
          if (!res || !res[0])
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
    };
    this.getText = () => {
      var text = "";
      var traverse = (node) => {
        if (node.type == "text") return text += node.text;
        else {
          if ((node.name == "p" || node.name == "div" || node.name == "br") && text[text.length - 1] != '\n')
            text += '\n';
          for (var child of node.children)
            traverse(child);
        }
      }
      if (!this.data.html) return "";
      for (var node of (this.data.html.nodes || ((this.data.html[0].name || this.data.html[0].type) ? this.data.html : this.data.nodes)))
        traverse(node);
      return text;
    };
    this.getVideoContext = (id) => {
      if (!id) return this.videoContexts;
      else {
        for (var video of this.videoContexts) {
          if (video.id == id) return video;
        }
      }
      return null;
    };
    // 初始化
    this._ready = (title, imgList) => {
      if (title && this.data.autosetTitle)
        wx.setNavigationBarTitle({
          title
        })
      this.imgList = imgList || [];
      this.videoContexts = [];
      var nodes = [this.selectComponent('#contain')];
      nodes = nodes.concat(this.selectAllComponents('#contain>>>.node'));
      for (let node of nodes){
        node._top = this;
        // 音视频控制
        for (var item of node.data.nodes) {
          if (item.name == 'video') {
            var context = wx.createVideoContext(item.attrs.id, node);
            context.id = item.attrs.id;
            this.videoContexts.push(context);
          } else if (item.name == 'audio' && item.attrs.autoplay)
            wx.createAudioContext(item.attrs.id, node).play();
        }
      }
      (wx.nextTick || setTimeout)(() => {
        for (let node of nodes) {
          var observered = false;
          for (var item of node.data.nodes) {
            // 图片懒加载
            if (item.name == 'img' && !observered) {
              observered = true;
              if (this.data.lazyLoad && node.createIntersectionObserver) {
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
          }
        }
        this.createSelectorQuery().select('#contain').boundingClientRect(res => {
          this.triggerEvent('ready', res);
        }).exec();
      }, 50)
    }
  },
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
          var res;
          // 缓存读取
          if (this.data.cacheId) {
            App.globalData = App.globalData || {};
            if (App.globalData[this.data.cacheId])
              res = App.globalData[this.data.cacheId];
            else {
              res = parseHtmlSync(html, this.data);
              App.globalData[this.data.cacheId] = res;
            }
          } else res = parseHtmlSync(html, this.data);
          this.setData({
            nodes: res.nodes,
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation,
            hideAnimation
          })
          this.triggerEvent('parse', res);
          if (Document) this.document = new Document("nodes", res.nodes, this);
          this._ready(res.title, res.imgList);
        } else if (html.constructor == Array) {
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation,
            hideAnimation
          })
          if (Document) this.document = new Document("html", html, this);
          this._ready();
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
          if (Document) this.document = new Document("html.nodes", html.nodes, this);
          this._ready(html.title, html.imgList);
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
    'cacheId': {
      type: String,
      value: null
    },
    'domain': {
      type: String,
      value: null
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
    //内部方法
    _playVideo(e) {
      if (this.videoContexts.length > 1 && this.data.autopause) {
        for (let video of this.videoContexts) {
          if (video.id == e.detail) continue;
          video.context.pause();
        }
      }
    }
  }
})