/*
 parser 主模块组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
var Document;
try {
  Document = require("./libs/document.js");
} catch (e) { }
const parseHtmlSync = require('./libs/MpHtmlParser.js').parseHtmlSync;
const App = getApp();
const ready = (Component, title, imgList) => {
  if (title && Component.data.autosetTitle)
    swan.setNavigationBarTitle({
      title
    })
  Component.imgList = imgList || [];
  setTimeout(() => {
    Component.createSelectorQuery().select('#contain' + Component.id).boundingClientRect(res => {
      Component.triggerEvent('ready', res);
    }).exec();
  }, 50);
}
Component({
  attached() {
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
          swan.pageScrollTo({
            scrollTop: res[1].scrollTop + res[0].top,
            success: obj.success,
            fail: obj.fail
          })
        })
      }
      if (!obj.id) Scroll("#contain", this);
      else
        for (var anchor of this.anchors)
          if (anchor.id == obj.id)
            Scroll("#" + obj.id, anchor.node);
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
    getApp()._Parser = this;
  },
  properties: {
    'html': {
      type: null,
      value: '',
      observer: function (html) {
        let hideAnimation = {},
          showAnimation = {};
        if (this.data.showWithAnimation) {
          hideAnimation = swan.createAnimation({
            duration: this.data.animationDuration,
            timingFunction: "ease"
          }).opacity(0).step().export();
          showAnimation = swan.createAnimation({
            duration: this.data.animationDuration,
            timingFunction: "ease"
          }).opacity(1).step().export();
        }
        if (!html) {
          this.setData({
            nodes: []
          });
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
            controls: {},
            showAnimation,
            hideAnimation
          });
          if (Document) this.document = new Document("nodes", res.nodes, this);
          this.videoContexts = [];
          this.anchors = [];
          this.triggerEvent('parse', res);
          ready(this, res.title, res.imgList);
        } else if (html.constructor == Array) {
          this.setData({
            controls: {},
            showAnimation,
            hideAnimation
          });
          if (Document) this.document = new Document("html", html, this);
          this.videoContexts = [];
          this.anchors = [];
          ready(this);
        } else if (typeof html == 'object') {
          if (!html.nodes || html.nodes.constructor != Array) {
            if (html.name && html.children && html.attrs || html.type == "text") return;
            this.triggerEvent('error', {
              source: "parse",
              errMsg: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + typeof html.nodes
            });
            return;
          }
          this.setData({
            controls: {},
            showAnimation,
            hideAnimation
          });
          if (Document) this.document = new Document("html.nodes", html.nodes, this);
          this.videoContexts = [];
          this.anchors = [];
          ready(this, html.title, html.imgList);
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
      value: ''
    },
    'domain': {
      type: String,
      value: ""
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
    },
    'useAnchor': {
      type: Boolean,
      value: false
    }
  }
});