/*
  parser 主组件
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/05/08
*/
var cache = {},
  Parser = require('./libs/MpHtmlParser.js'),
  fs = wx.getFileSystemManager && wx.getFileSystemManager();
try {
  var dom = require('./libs/document.js');
} catch (e) {}
// 计算 cache 的 key
function hash(str) {
  for (var i = str.length, val = 5381; i--;)
    val += (val << 5) + str.charCodeAt(i);
  return val;
}
Component({
  options: {
    pureDataPattern: /^[acdgtu]|W/
  },
  properties: {
    'html': {
      type: null,
      observer(html) {
        if (this._refresh) this._refresh = false;
        else this.setContent(html, false, true);
      }
    },
    'autosetTitle': {
      type: Boolean,
      value: true
    },
    'autopause': {
      type: Boolean,
      value: true
    },
    'compress': Number,
    'domain': String,
    'gestureZoom': Boolean,
    'lazyLoad': Boolean,
    'selectable': Boolean,
    'tagStyle': Object,
    'showWithAnimation': Boolean,
    'useAnchor': Boolean,
    'useCache': Boolean
  },
  relations: {
    '../parser-group/parser-group': {
      type: 'ancestor'
    }
  },
  created() {
    // 图片数组
    this.imgList = [];
    this.imgList.setItem = function(i, src) {
      if (!i || !src) return;
      // 去重
      if (src.indexOf('http') == 0 && this.includes(src)) {
        var newSrc = '';
        for (var j = 0, c; c = src[j]; j++) {
          if (c == '/' && src[j - 1] != '/' && src[j + 1] != '/') break;
          newSrc += Math.random() > 0.5 ? c.toUpperCase() : c;
        }
        newSrc += src.substr(j);
        return this[i] = newSrc;
      }
      this[i] = src;
      // 暂存 data src
      if (src.includes('data:image')) {
        var info = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
        if (!info) return;
        var filePath = `${wx.env.USER_DATA_PATH}/${Date.now()}.${info[1]}`;
        fs && fs.writeFile({
          filePath,
          data: info[3],
          encoding: info[2],
          success: () => this[i] = filePath
        })
      }
    }
    this.imgList.each = function(f) {
      for (var i = 0, len = this.length; i < len; i++)
        this.setItem(i, f(this[i], i, this));
    }
    if (dom) this.document = new dom(this);
  },
  detached() {
    // 删除暂存
    this.imgList.each(src => {
      if (src && src.includes(wx.env.USER_DATA_PATH) && fs)
        fs.unlink({
          filePath: src
        })
    })
    clearInterval(this._timer);
  },
  methods: {
    // 锚点跳转
    navigateTo(obj) {
      if (!this.data.useAnchor)
        return obj.fail && obj.fail({
          errMsg: 'Anchor is disabled'
        })
      this.createSelectorQuery()
        .select('.top' + (obj.id ? '>>>#' + obj.id : '')).boundingClientRect()
        .selectViewport().scrollOffset().exec(res => {
          if (!res[0])
            return this.group ? this.group.navigateTo(this.i, obj) :
              obj.fail && obj.fail({
                errMsg: 'Label not found'
              });
          obj.scrollTop = res[1].scrollTop + res[0].top + (obj.offset || 0);
          wx.pageScrollTo(obj);
        })
    },
    // 获取文本
    getText(ns = this.data.html) {
      var txt = '';
      for (var i = 0, n; n = ns[i++];) {
        if (n.type == 'text') txt += n.text.replace(/&nbsp;/g, '\u00A0').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        else if (n.type == 'br') txt += '\n';
        else {
          // 块级标签前后加换行
          var br = n.name == 'p' || n.name == 'div' || n.name == 'tr' || n.name == 'li' || (n.name[0] == 'h' && n.name[1] > '0' && n.name[1] < '7');
          if (br && txt && txt[txt.length - 1] != '\n') txt += '\n';
          if (n.children) txt += this.getText(n.children);
          if (br && txt[txt.length - 1] != '\n') txt += '\n';
          else if (n.name == 'td' || n.name == 'th') txt += '\t';
        }
      }
      return txt;
    },
    // 获取视频 context
    getVideoContext(id) {
      if (!id) return this.videoContexts;
      for (var i = this.videoContexts.length; i--;)
        if (this.videoContexts[i].id == id) return this.videoContexts[i];
    },
    // 渲染富文本
    setContent(html, append, _watch) {
      var data = {};
      if (!html) {
        if (_watch || append) return;
        data.html = '';
      } else if (typeof html == 'string') {
        let parser = new Parser(html, this.data);
        // 缓存读取
        if (this.data.useCache) {
          var hashVal = hash(html);
          if (cache[hashVal]) data.html = cache[hashVal];
          else {
            data.html = parser.parse();
            cache[hashVal] = data.html;
          }
        } else data.html = parser.parse();
        this._refresh = true;
        this.triggerEvent('parse', data.html);
      } else if (html.constructor == Array) {
        // 转换不符合格式的 array
        if (html.length && html[0].PoweredBy != 'Parser') {
          let parser = new Parser('', this.data);
          (function f(ns) {
            for (var i = 0, n; n = ns[i]; i++) {
              if (n.type == 'text') continue;
              n.attrs = n.attrs || {};
              for (var key in n.attrs)
                if (typeof n.attrs[key] != 'string') n.attrs[key] = n.attrs[key].toString();
              parser.matchAttr(n);
              if (n.children) {
                parser.STACK.push(n);
                f(n.children);
                parser.popNode(parser.STACK.pop());
              }
            }
          })(html);
          data.html = html;
        }
        if (!_watch) data.html = html;
      } else if (typeof html == 'object' && html.nodes) {
        data.html = html.nodes;
        console.warn('错误的 html 类型：object 类型已废弃');
      } else
        return console.warn('错误的 html 类型：' + typeof html);
      if (append) {
        this._refresh = true;
        data.html = (this.data.html || []).concat(data.html);
      } else if (this.data.showWithAnimation) data.showAm = 'animation: show .5s';
      if (data.html || data.showAm) this.setData(data);
      // 设置标题
      if (this.data.html.length && this.data.html[0].title && this.data.autosetTitle)
        wx.setNavigationBarTitle({
          title: this.data.html[0].title
        })
      this.imgList.length = 0;
      this.videoContexts = [];
      var ns = this.selectAllComponents('.top,.top>>>._node');
      for (let i = 0, n; n = ns[i++];) {
        n.top = this;
        for (var j = 0, item; item = n.data.nodes[j++];) {
          if (item.c) continue;
          // 获取图片列表
          if (item.name == 'img')
            this.imgList.setItem(item.attrs.i, item.attrs.src);
          // 音视频控制
          else if (item.name == 'video' || item.name == 'audio') {
            var ctx;
            if (item.name == 'video') ctx = wx.createVideoContext(item.attrs.id, n);
            else ctx = n.selectComponent('#' + item.attrs.id);
            if (ctx) {
              ctx.id = item.attrs.id;
              this.videoContexts.push(ctx);
            }
          }
        }
      }
      (wx.nextTick || setTimeout)(() => this.triggerEvent('load'), 50);
      var height;
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        this.createSelectorQuery().select('.top').boundingClientRect(res => {
          this.rect = res;
          if (res.height == height) {
            this.triggerEvent('ready', res)
            clearInterval(this._timer);
          }
          height = res.height;
        }).exec();
      }, 350)
    },
    // 预加载
    preLoad(html, num) {
      if (typeof html == 'string') {
        var id = hash(html);
        html = new Parser(html, this.data).parse();
        cache[id] = html;
      }
      var imgs, wait = [];
      (function f(ns) {
        for (var i = 0, n; n = ns[i++];) {
          if (n.name == 'img' && n.attrs.src && !wait.includes(n.attrs.src))
            wait.push(n.attrs.src);
          f(n.children || []);
        }
      })(html);
      if (num) wait = wait.slice(0, num);
      this._wait = (this._wait || []).concat(wait);
      if (!this.data.imgs) imgs = this._wait.splice(0, 15);
      else if (this.data.imgs.length < 15)
        imgs = this.data.imgs.concat(this._wait.splice(0, 15 - this.data.imgs.length));
      imgs && this.setData({
        imgs
      });
    },
    _load(e) {
      if (this._wait.length)
        this.setData({
          [`imgs[${e.target.id}]`]: this._wait.shift()
        })
    },
    // 事件处理
    _tap(e) {
      if (this.data.gestureZoom && e.timeStamp - this._lastT < 300) {
        var initY = e.detail.y - e.currentTarget.offsetTop;
        if (this._zoom) {
          this._scaleAm.translateX(0).scale(1).step();
          wx.pageScrollTo({
            scrollTop: (initY + this._initY) / 2 - e.touches[0].clientY,
            duration: 400
          })
        } else {
          var initX = e.detail.x - e.currentTarget.offsetLeft;
          this._initY = initY;
          this._scaleAm = wx.createAnimation({
            transformOrigin: `${initX}px ${this._initY}px 0`,
            timingFunction: 'ease-in-out'
          });
          this._scaleAm.scale(2).step();
          this._tMax = initX / 2;
          this._tMin = (initX - this.rect.width) / 2;
          this._tX = 0;
        }
        this._zoom = !this._zoom;
        this.setData({
          scaleAm: this._scaleAm.export()
        })
      }
      this._lastT = e.timeStamp;
    },
    _touchstart(e) {
      if (e.touches.length == 1)
        this._initX = this._lastX = e.touches[0].pageX;
    },
    _touchmove(e) {
      var diff = e.touches[0].pageX - this._lastX;
      if (this._zoom && e.touches.length == 1 && Math.abs(diff) > 20) {
        this._lastX = e.touches[0].pageX;
        if ((this._tX <= this._tMin && diff < 0) || (this._tX >= this._tMax && diff > 0)) return;
        this._tX += diff * Math.abs(this._lastX - this._initX) * 0.05;
        if (this._tX < this._tMin) this._tX = this._tMin;
        if (this._tX > this._tMax) this._tX = this._tMax;
        this._scaleAm.translateX(this._tX).step();
        this.setData({
          scaleAm: this._scaleAm.export()
        })
      }
    }
  }
})