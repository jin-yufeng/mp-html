/**
 * Parser 富文本组件
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20200728
 * @author JinYufeng
 * @listens MIT
 */
var cache = {},
  Parser = require('./libs/MpHtmlParser.js'),
  fs = wx.getFileSystemManager && wx.getFileSystemManager();
var dom;
var search;
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
  data: { 
    nodes: [] 
  },
  properties: {
    html: {
      type: String,
      observer(html) {
        this.setContent(html);
      }
    },
    autopause: {
      type: Boolean,
      value: true
    },
    autoscroll: Boolean,
    autosetTitle: {
      type: Boolean,
      value: true
    },
    compress: Number,
    domain: String,
    lazyLoad: Boolean,
    loadingImg: String,
    selectable: Boolean,
    tagStyle: Object,
    showWithAnimation: Boolean,
    useAnchor: Boolean,
    useCache: Boolean
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
    if (search) this.search = args => search(this, args);
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
    in (obj) {
      if (obj.page && obj.selector && obj.scrollTop) this._in = obj;
    },
    navigateTo(obj) {
      if (!this.data.useAnchor) return obj.fail && obj.fail('Anchor is disabled');
      var selector = (this._in ? this._in.page : this).createSelectorQuery().select((this._in ? this._in.selector : '.top') + (obj.id ? '>>>#' + obj.id : '')).boundingClientRect();
      if (this._in) selector.select(this._in.selector).fields({
        rect: true,
        scrollOffset: true
      });
      else selector.selectViewport().scrollOffset();
      selector.exec(res => {
        if (!res[0]) return this.group ? this.group.navigateTo(this.i, obj) : obj.fail && obj.fail('Label not found');
        var scrollTop = res[1].scrollTop + res[0].top - (res[1].top || 0) + (obj.offset || 0);
        if (this._in) {
          var data = {};
          data[this._in.scrollTop] = scrollTop;
          this._in.page.setData(data);
        } else wx.pageScrollTo({
          scrollTop
        })
        obj.success && obj.success();
      })
    },
    // 获取文本
    getText(ns = this.data.nodes) {
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
    setContent(html, append) {
      var nodes, parser = new Parser(html, this.data);
      // 缓存读取
      if (this.data.useCache) {
        var hashVal = hash(html);
        if (cache[hashVal]) nodes = cache[hashVal];
        else cache[hashVal] = nodes = parser.parse();
      } else nodes = parser.parse();
      this.triggerEvent('parse', nodes);
      var data = {};
      if (append)
        for (let i = this.data.nodes.length, j = nodes.length; j--;)
          data[`nodes[${i + j}]`] = nodes[j];
      else data.nodes = nodes;
      if (this.showWithAnimation) data.showAm = 'animation: show .5s';
      this.setData(data, () => {
        this.triggerEvent('load')
      });
      // 设置标题
      if (nodes.title && this.data.autosetTitle)
        wx.setNavigationBarTitle({
          title: nodes.title
        })
      this.imgList.length = 0;
      this.videoContexts = [];
      var ns = this.selectAllComponents('.top,.top>>>._node');
      for (let i = 0, n; n = ns[i++];) {
        n.top = this;
        for (let j = 0, item; item = n.data.nodes[j++];) {
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
      var height;
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        this.createSelectorQuery().select('.top').boundingClientRect(res => {
          if (!res) return;
          this.rect = res;
          if (res.height == height) {
            this.triggerEvent('ready', res)
            clearInterval(this._timer);
          }
          height = res.height;
        }).exec();
      }, 350)
    }
  }
})