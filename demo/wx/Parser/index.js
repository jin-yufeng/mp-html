/*
 parser 主模块组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
const parseHtmlSync = require('./libs/MpHtmlParser.js').parseHtmlSync;
const cache = getApp().parserCache = {};
const CssHandler = require("./libs/CssHandler.js");
const config = require("./libs/config.js");
var document;
try {
  document = require("./libs/document.js");
} catch (e) {}
// 散列函数（计算 cache 的 key）
const Hash = (str) => {
  for (var i = 0, hash = 5381, len = str.length; i < len; i++)
    hash += (hash << 5) + str.charCodeAt(i);
  return hash;
};
// 动画
const hideAnimation = wx.createAnimation({
  timingFunction: "ease"
}).opacity(0).step().export();
const showAnimation = wx.createAnimation({
  timingFunction: "ease"
}).opacity(1).step().export();
// 图片链接去重
const Deduplication = (src) => {
  if (src.indexOf("http") != 0) return src;
  var newSrc = '';
  for (var i = 0; i < src.length; i++) {
    newSrc += (Math.random() >= 0.5 ? src[i].toUpperCase() : src[i].toLowerCase());
    if (src[i] == '/' && src[i - 1] != '/' && src[i + 1] != '/') break;
  }
  newSrc += src.substring(i + 1);
  return newSrc;
}
Component({
  properties: {
    'html': {
      type: null,
      value: null,
      observer: function(html) {
        if (this._refresh) return this._refresh = false;
        this.setContent(html, undefined, true);
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
    'useAnchor': {
      type: Boolean,
      value: false
    },
    'useCache': {
      type: Boolean,
      value: false
    }
  },
  created() {
    // api
    this.navigateTo = (obj) => {
      const query = this.createSelectorQuery();
      query.select("#contain" + (obj.id ? (">>>#" + obj.id) : '')).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(res => {
        if (!res || !res[0])
          return obj.fail ? obj.fail({
            errMsg: "Label Not Found"
          }) : null;
        wx.pageScrollTo({
          scrollTop: res[1].scrollTop + res[0].top,
          success: obj.success,
          fail: obj.fail
        })
      })
    };
    this.getText = (whiteSpace = true) => {
      var text = "";
      const DFS = (node) => {
        if (node.type == "text") return text += node.text;
        else {
          if (whiteSpace && (((node.name == 'p' || node.name == "div" || node.name == "tr" || node.name == "li" || /h[1-6]/.test(node.name)) && text && text[text.length - 1] != '\n') || node.name == "br"))
            text += '\n';
          for (var child of node.children || [])
            DFS(child);
          if (whiteSpace && (node.name == 'p' || node.name == "div" || node.name == "tr" || node.name == "li" || /h[1-6]/.test(node.name)) && text && text[text.length - 1] != '\n')
            text += '\n';
          else if (whiteSpace && node.name == "td") text += '\t';
        }
      }
      if (!this.data.html || !this.data.html.length) return "";
      for (var node of this.data.html) DFS(node);
      return text;
    };
    this.getVideoContext = (id) => {
      if (!id) return this.videoContexts;
      else
        for (var video of this.videoContexts)
          if (video.id == id) return video;
      return null;
    };
    this.imgList = [];
    this.imgList.each = function(f) {
      for (var i = 0; i < this.length; i++) {
        var newSrc = f(this[i], i, this);
        if (newSrc) {
          if (this.includes(newSrc)) this[i] = Deduplication(newSrc);
          else this[i] = newSrc;
        }
      }
    }
    this._refresh = false; // 防止循环调用
    this.setContent = (html, options, obversed) => {
      if (typeof options == "object")
        for (var key in options) {
          key = key.replace(/-(\w)/g, function() {
            return arguments[1].toUpperCase();
          })
          this.data[key] = options[key];
        }
      var data = {
        controls: {
          imgMode: this.data.imgMode
        }
      };
      if (this.data.showWithAnimation) {
        data.showAnimation = showAnimation;
        data.hideAnimation = hideAnimation;
      }
      if (!html) {
        if (obversed) return;
        data.html = '';
      } else if (typeof html == "string") {
        var res;
        // 缓存读取
        if (this.data.useCache) {
          var hash = Hash(html);
          if (cache[hash]) res = cache[hash];
          else {
            res = parseHtmlSync(html, this.data);
            cache[hash] = res;
          }
        } else res = parseHtmlSync(html, this.data);
        data.html = res;
        this.triggerEvent('parse', res);
      } else if (html.constructor == Array) {
        // 非本插件产生的 array 需要进行一些转换
        if (html.length && html[0].PoweredBy != "Parser") {
          const Parser = {
            _imgNum: 0,
            _videoNum: 0,
            _audioNum: 0,
            _domain: this.data.domain,
            _protocol: this.data.domain ? (this.data.domain.includes("://") ? this.data.domain.split("://")[0] : "http") : undefined,
            _STACK: [],
            CssHandler: new CssHandler(this.data.tagStyle),
            bubbling() {
              for (var i = this._STACK.length - 1; i >= 0; i--) {
                if (config.trustTags[this._STACK[i].name] !== 0)
                  this._STACK[i].continue = true;
                else
                  return this._STACK[i].name;
              }
            }
          };
          Parser.CssHandler.getStyle('');
          const DFS = (nodes) => {
            for (var node of nodes) {
              if (node.type == "text") continue;
              config.LabelAttrsHandler(node, Parser);
              if (config.blockTags[node.name]) node.name = 'div';
              else if (!config.trustTags.hasOwnProperty(node.name)) node.name = 'span';
              if (node.children && node.children.length) {
                Parser._STACK.push(node);
                DFS(node.children);
                Parser._STACK.pop();
              }
            }
          }
          DFS(html);
          data.html = html;
        }
        if (!obversed) data.html = html;
      } else if (typeof html == 'object' && html.nodes) {
        data.html = html.nodes;
        console.warn("Parser 类型错误：object 类型已废弃，请直接将 html 设置为 object.nodes （array 类型）");
      } else {
        return this.triggerEvent('error', {
          source: "parse",
          errMsg: "错误的html类型：" + typeof html
        });
      }
      this._refresh = !!data.html;
      this.setData(data);
      this.imgList.length = 0;
      this.videoContexts = [];
      if (document) this.document = new document("html", data.html || html, this);
      var nodes = [this.selectComponent('#contain')].concat(this.selectAllComponents('#contain>>>._node'));
      for (let node of nodes) {
        node._top = this;
        for (var item of node.data.nodes) {
          if (item.continue) continue;
          // 获取图片列表
          if (item.name == 'img') {
            if (item.attrs.src && !item.attrs.ignore) {
              if (this.imgList.indexOf(item.attrs.src) == -1)
                this.imgList.push(item.attrs.src);
              else this.imgList.push(Deduplication(item.attrs.src));
            }
          }
          // 音视频控制
          else if (item.name == 'video') {
            var context = wx.createVideoContext(item.attrs.id, node);
            context.id = item.attrs.id;
            this.videoContexts.push(context);
          } else if (item.name == 'audio' && item.attrs.autoplay)
            wx.createAudioContext(item.attrs.id, node).play();
          // 设置标题
          else if (item.name == "title") {
            if (item.children[0].type == "text" && item.children[0].text && this.data.autosetTitle)
              wx.setNavigationBarTitle({
                title: item.children[0].text
              })
          }
        }
        if (node.data.imgLoad)
          node.setData({
            imgLoad: false
          })
      }
      (wx.nextTick || setTimeout)(() => {
        // 图片懒加载
        for (let node of nodes) {
          for (var item of node.data.nodes) {
            if (item.name == 'img') {
              if (this.data.lazyLoad && node.createIntersectionObserver) {
                if (node._observer) node._observer.disconnect();
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
              break;
            }
          }
        }
        this.createSelectorQuery().select('#contain').boundingClientRect(res => {
          this.triggerEvent('ready', res);
        }).exec();
      }, 50)
    }
  }
})