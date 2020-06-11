/**
 * Parser 富文本组件
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20200611
 * @author JinYufeng
 * @listens MIT
 */
var cache = {},
  Parser = require('./libs/MpHtmlParser.js'),
  fs = my.getFileSystemManager && my.getFileSystemManager();
var dom;
// 计算 cache 的 key
function hash(str) {
  for (var i = str.length, val = 5381; i--;)
    val += (val << 5) + str.charCodeAt(i);
  return val;
}
Component({
  props: {
    html: '',
    autopause: true,
    autoscroll: false,
    autosetTitle: true,
    compress: 0,
    domain: '',
    lazyLoad: false,
    loadingImg: '',
    selectable: false,
    tagStyle: {},
    showWithAnimation: false,
    useAnchor: false,
    useCache: false,
    onParse() {},
    onLoad() {},
    onReady() {},
    onImgtap() {},
    onLinkpress() {},
    onError() {}
  },
  didMount() {
    // 图片数组
    this.imgList = [];
    this.imgList.setItem = function(i, src) {
      if (!i || !src) return;
      this[i] = src;
      // 暂存 data src
      if (src.includes('data:image')) {
        var info = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
        if (!info) return;
        var filePath = `${my.env.USER_DATA_PATH}/${Date.now()}.${info[1]}`;
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
    this.setContent(this.props.html, false, true);
  },
  didUpdate(e) {
    if (e.html != this.props.html)
      this.setContent(this.props.html, false, true);
  },
  didUnmount() {
    // 删除暂存
    this.imgList.each(src => {
      if (src && src.includes(my.env.USER_DATA_PATH) && fs)
        fs.unlink({
          filePath: src
        })
    })
    clearInterval(this._timer);
  },
  methods: {
    // 锚点跳转
    navigateTo(obj) {
      if (!this.props.useAnchor)
        return obj.fail && obj.fail({
          errMsg: 'Anchor is disabled'
        })
      my.createSelectorQuery()
        .select('._top' + (obj.id ? ' #' + obj.id : '')).boundingClientRect()
        .selectViewport().scrollOffset().exec(res => {
          if (!res[0])
            return obj.fail && obj.fail({
                errMsg: 'Label not found'
              });
          obj.scrollTop = res[1].scrollTop + res[0].top + (obj.offset || 0);
          obj.duration = 300;
          my.pageScrollTo(obj);
        })
    },
    // 获取文本
    getText(ns = this.props.html) {
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
        let parser = new Parser(html, this.props);
        // 缓存读取
        if (this.props.useCache) {
          var hashVal = hash(html);
          if (cache[hashVal]) data.html = cache[hashVal];
          else {
            data.html = parser.parse();
            cache[hashVal] = data.html;
          }
        } else data.html = parser.parse();
        this.props.onParse(data.html);
      } else if (html.constructor == Array) {
        // 转换不符合格式的 array
        if (html.length && html[0].PoweredBy != 'Parser') {
          let parser = new Parser('', this.props);
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
      if (append) data.html = (this.props.html || []).concat(data.html);
      else if (this.props.showWithAnimation) data.showAm = 'animation: _show .5s';
      if (data.html || data.showAm) this.setData(data);
      // 设置标题
      if (this.props.html.length && this.props.html[0].title && this.props.autosetTitle)
        my.setNavigationBarTitle({
          title: this.props.html[0].title
        })
      this.imgList.length = 0;
      this.videoContexts = [];
      setTimeout(() => this.props.onLoad(), 50);
      var height;
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        my.createSelectorQuery().select('._top').boundingClientRect().exec(res => {
          if (!res[0]) return;
          this.rect = res[0];
          if (res[0].height == height) {
            this.props.onReady(res[0]);
            clearInterval(this._timer);
          }
          height = res[0].height;
        });
      }, 350)
    },
    _appendChild(n) {
      n.top = this;
      n.init();
    }
  }
})