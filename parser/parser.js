/*
  parser 主组件
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
const cache = {};
const config = require("./libs/config.js");
const CssHandler = require("./libs/CssHandler.js");
var document; // 引入补丁包
try {
  document = require("./libs/document.js");
} catch (e) {}
const fs = wx.getFileSystemManager ? wx.getFileSystemManager() : null;
const MpHtmlParser = require("./libs/MpHtmlParser.js");
// 计算 cache 的 key
function hash(str) {
  for (var i = str.length, hash = 5381; i--;)
    hash += (hash << 5) + str.charCodeAt(i);
  return hash;
};
Component({
  properties: {
    "html": {
      type: null,
      observer: function(html) {
        if (this._refresh) return this._refresh = false;
        this.setContent(html, true);
      }
    },
    "autosetTitle": {
      type: Boolean,
      value: true
    },
    "autopause": {
      type: Boolean,
      value: true
    },
    "domain": String,
    "gestureZoom": Boolean,
    "lazyLoad": Boolean,
    "selectable": Boolean,
    "tagStyle": Object,
    "showWithAnimation": Boolean,
    "useAnchor": Boolean,
    "useCache": Boolean
  },
  relations: {
    "../parser-group/parser-group": {
      type: "ancestor"
    }
  },
  created() {
    // 图片数组
    this.imgList = [];
    this.imgList.setItem = function(i, src) {
      if (!src) return;
      // 去重
      if (src.includes("http") && this.includes(src)) {
        var newSrc = '';
        for (var j = 0, c; c = src[j]; j++) {
          newSrc += Math.random() > 0.5 ? c.toUpperCase() : c;
          if (c == '/' && src[j - 1] != '/' && src[j + 1] != '/') break;
        }
        newSrc += src.substring(j + 1);
        return this[i] = newSrc;
      }
      this[i] = src;
      // 暂存 data src
      if (src.includes("data:image")) {
        var fileInfo = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
        if (!fileInfo) return;
        var filePath = `${wx.env.USER_DATA_PATH}/${Date.now()}.${fileInfo[1]}`;
        fs && fs.writeFile({
          filePath,
          data: fileInfo[3],
          encoding: fileInfo[2],
          success: (res) => this[i] = filePath
        })
      }
    }
    this.imgList.each = function(f) {
      for (var i = 0; i < this.length; i++)
        this.setItem(i, f(this[i], i, this));
    }
  },
  detached() {
    // 删除暂存
    this.imgList.each((item) => {
      if (item && item.includes(wx.env.USER_DATA_PATH))
        fs && fs.unlink({
          filePath: item
        })
    })
    clearInterval(this.interval);
  },
  methods: {
    // 锚点跳转
    navigateTo(obj) {
      if (!this.data.useAnchor)
        return obj.fail && obj.fail({
          errMsg: "Anchor is disabled"
        })
      this.createSelectorQuery()
        .select("._top" + (obj.id ? ">>>#" + obj.id : '')).boundingClientRect()
        .selectViewport().scrollOffset().exec(res => {
          if (!res[0]) {
            if (this.group) return this.group.navigateTo(this.i, obj);
            return obj.fail && obj.fail({
              errMsg: "Label not found"
            });
          }
          obj.scrollTop = res[1].scrollTop + res[0].top;
          wx.pageScrollTo(obj);
        })
    },
    // 获取文本
    getText(nodes = this.data.html) {
      var text = '';
      for (var i = 0, node; node = nodes[i++];) {
        if (node.type == "text") text += node.text.replace(/&nbsp;/g, '\u00A0').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        else if (node.type == "br") text += '\n';
        else {
          // 块级标签前后加换行
          var block = node.name == 'p' || node.name == "div" || node.name == "tr" || node.name == "li" || (node.name[0] == 'h' && node.name[1] > '0' && node.name[1] < '7');
          if (block && text && text[text.length - 1] != '\n') text += '\n';
          if (node.children) text += this.getText(node.children);
          if (block && text[text.length - 1] != '\n') text += '\n';
          else if (node.name == "td" || node.name == "th") text += '\t';
        }
      }
      return text;
    },
    // 获取视频 context
    getVideoContext(id) {
      if (!id) return this.videoContexts;
      for (var i = this.videoContexts.length; i--;)
        if (this.videoContexts[i].id == id) return this.videoContexts[i];
      return null;
    },
    // 渲染富文本
    setContent(html, obversed) {
      var data = {};
      if (!html) {
        if (obversed) return;
        data.html = '';
      } else if (typeof html == "string") {
        var Parser = new MpHtmlParser(html, this.data);
        // 缓存读取
        if (this.data.useCache) {
          var hashValue = hash(html);
          if (cache[hashValue]) data.html = cache[hashValue];
          else {
            data.html = Parser.parse();
            cache[hashValue] = data.html;
          }
        } else data.html = Parser.parse();
        this.triggerEvent("parse", data.html);
      } else if (html.constructor == Array) {
        // 非本插件产生的 array 需要进行一些转换
        if (html.length && html[0].PoweredBy != "Parser") {
          var Parser = new MpHtmlParser('', this.data);
          (function f(ns) {
            for (var i = 0, n; n = ns[i]; i++) {
              if (n.type == "text") continue;
              n.attrs = n.attrs || {};
              for (var item in n.attrs) {
                if (!config.trustAttrs[item]) n.attrs[item] = void 0;
                else if (typeof n.attrs[item] != "string") n.attrs[item] = n.attrs[item].toString();
              }
              config.LabelHandler(n, Parser);
              if (config.ignoreTags[n.name]) {
                ns.splice(i--, 1);
                continue;
              }
              if (n.children && n.children.length) {
                Parser._STACK.push(n);
                f(n.children);
                Parser.popNode(Parser._STACK.pop());
              } else n.children = void 0;
            }
          })(html);
          data.html = html;
        }
        if (!obversed) data.html = html;
      } else if (typeof html == "object" && html.nodes) {
        data.html = html.nodes;
        console.warn("错误的 html 类型：object 类型已废弃");
      } else
        return console.warn("错误的 html 类型：" + typeof html);
      if (this.data.showWithAnimation) data.showAnimation = "animation: show .5s";
      if ((this._refresh = !!data.html) || data.showAnimation) this.setData(data);
      this.imgList.length = 0;
      this.videoContexts = [];
      if (document) this.document = new document(data.html || html, "html", this);
      var nodes = this.selectAllComponents("._top,._top>>>._node");
      for (var i = nodes.length; i--;) {
        let node = nodes[i];
        node._top = this;
        var observed = !!node._observer;
        for (var j = node.data.nodes.length, item; item = node.data.nodes[--j];) {
          if (item.c) continue;
          // 获取图片列表
          if (item.name == "img") {
            if (item.attrs.i)
              this.imgList.setItem(item.attrs.i, item.attrs.src);
            if (!observed && item.attrs.i != "0") {
              observed = true;
              // 懒加载
              if (this.data.lazyLoad && node.createIntersectionObserver) {
                (wx.nextTick || setTimeout)(() => {
                  node._observer = node.createIntersectionObserver();
                  node._observer.relativeToViewport({
                    top: 900,
                    bottom: 900
                  }).observe("._img", () => {
                    node.setData({
                      imgLoad: true
                    })
                    if (node._observer) {
                      node._observer.disconnect();
                      node._observer = void 0;
                    }
                  })
                }, 50)
              } else
                node.setData({
                  imgLoad: true
                })
            }
          }
          // 音视频控制
          else if (item.name == "video") {
            var context = wx.createVideoContext(item.attrs.id, node);
            context.id = item.attrs.id;
            this.videoContexts.unshift(context);
          } else if (item.name == "audio" && item.attrs.autoplay)
            wx.createAudioContext(item.attrs.id, node).play();
          // 设置标题
          else if (item.name == "title" && this.data.autosetTitle && item.children[0].type == "text")
            wx.setNavigationBarTitle({
              title: item.children[0].text
            })
        }
      }
      (wx.nextTick || setTimeout)(() => this.triggerEvent("load"), 50);
      var height;
      this.interval = setInterval(() => {
        this.createSelectorQuery().select("._top").boundingClientRect(res => {
          this.width = res.width;
          if (res.height == height) {
            this.triggerEvent("ready", res)
            clearInterval(this.interval);
          }
          height = res.height;
        }).exec();
      }, 350)
    },
    // 预加载
    preLoad(html, num) {
      if (typeof html == "string") {
        var id = hash(html);
        html = new MpHtmlParser(html, this.data).parse();
        cache[id] = html;
      }
      var imgs, wait = [];
      (function f(ns) {
        for (var i = 0, n; n = ns[i++];) {
          if (n.name == "img" && n.attrs.src && !wait.includes(n.attrs.src))
            wait.push(n.attrs.src);
          f(n.children || []);
        }
      })(html);
      if (num) wait = wait.slice(0, num);
      this.wait = (this.wait || []).concat(wait);
      if (!this.data.imgs) imgs = this.wait.splice(0, 15);
      else if (this.data.imgs.length < 15)
        imgs = this.data.imgs.concat(this.wait.splice(0, 15 - this.data.imgs.length));
      imgs && this.setData({
        imgs
      });
    },
    _load(e) {
      if (this.wait.length)
        this.setData({
          [`imgs[${e.target.id}]`]: this.wait.shift()
        })
    },
    // 事件处理
    _tap(e) {
      if (this.data.gestureZoom && e.timeStamp - this.lastTime < 300) {
        if (this.zoomIn) {
          this.animation.translateX(0).scale(1).step();
          wx.pageScrollTo({
            scrollTop: (e.detail.y - e.currentTarget.offsetTop + this.initY) / 2 - e.touches[0].clientY,
            duration: 400
          })
        } else {
          var initX = e.detail.x - e.currentTarget.offsetLeft;
          this.initY = e.detail.y - e.currentTarget.offsetTop;
          this.animation = wx.createAnimation({
            transformOrigin: `${initX}px ${this.initY}px 0`,
            timingFunction: "ease-in-out"
          });
          this.animation.scale(2).step();
          this.tMax = initX / 2;
          this.tMin = (initX - this.width) / 2;
          this.tX = 0;
        }
        this.zoomIn = !this.zoomIn;
        this.setData({
          animation: this.animation.export()
        })
      }
      this.lastTime = e.timeStamp;
    },
    _touchstart(e) {
      if (e.touches.length == 1)
        this.initX = this.lastX = e.touches[0].pageX;
    },
    _touchmove(e) {
      var diff = e.touches[0].pageX - this.lastX;
      if (this.zoomIn && e.touches.length == 1 && Math.abs(diff) > 20) {
        this.lastX = e.touches[0].pageX;
        if ((this.tX <= this.tMin && diff < 0) || (this.tX >= this.tMax && diff > 0)) return;
        this.tX += (diff * Math.abs(this.lastX - this.initX) * 0.05);
        if (this.tX < this.tMin) this.tX = this.tMin;
        if (this.tX > this.tMax) this.tX = this.tMax;
        this.animation.translateX(this.tX).step();
        this.setData({
          animation: this.animation.export()
        })
      }
    }
  }
})