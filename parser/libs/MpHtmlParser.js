/*
  将 html 解析为适用于小程序 rich-text 的 DOM 结构
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/03/17
*/
var cfg = require('./config.js'),
  blankChar = cfg.blankChar,
  CssHandler = require('./CssHandler.js'),
  screenWidth = wx.getSystemInfoSync().screenWidth;
try {
  var emoji = require('./emoji.js');
} catch (e) {};
class MpHtmlParser {
  constructor(data, options = {}) {
    this.attrs = {};
    this.compress = options.compress;
    this.CssHandler = new CssHandler(options.tagStyle, screenWidth);
    this.data = data;
    this.domain = options.domain;
    this.DOM = [];
    this.i = 0;
    this.protocol = this.domain && this.domain.includes('://') ? this.domain.split('://')[0] : 'http';
    this.start = 0;
    this.state = this.Text;
    this.STACK = [];
    this.audioNum = 0;
    this.imgNum = 0;
    this.videoNum = 0;
    this.useAnchor = options.useAnchor;
  }
  parse() {
    if (emoji) this.data = emoji.parseEmoji(this.data);
    for (var c; c = this.data[this.i]; this.i++)
      this.state(c);
    if (this.state == this.Text) this.setText();
    while (this.STACK.length) this.popNode(this.STACK.pop());
    if (this.DOM.length) {
      this.DOM[0].PoweredBy = 'Parser';
      if (this.title) this.DOM[0].title = this.title;
    }
    return this.DOM;
  }
  // 设置属性
  setAttr() {
    var name = this.attrName.toLowerCase();
    if (cfg.trustAttrs[name]) {
      if (!this.attrVal) {
        if (cfg.boolAttrs[name]) this.attrs[name] = 'T';
      } else if (name == 'src') this.attrs[name] = encodeURI(this.getUrl(this.attrVal));
      else this.attrs[name] = this.attrVal;
    }
    this.attrVal = '';
    while (blankChar[this.data[this.i]]) this.i++;
    if (this.isClose()) this.setNode();
    else {
      this.start = this.i;
      this.state = this.AttrName;
    }
  }
  // 设置文本节点
  setText() {
    var back, text = this.section();
    if (!text) return;
    text = (cfg.onText && cfg.onText(text, () => back = true)) || text;
    if (back) {
      this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
      let j = this.start + text.length;
      for (this.i = this.start; this.i < j; this.i++) this.state(this.data[this.i]);
      return;
    }
    if (!this.pre) {
      // 合并空白符
      var tmp = [];
      for (let i = text.length, c; c = text[--i];)
        if (!blankChar[c] || (!blankChar[tmp[0]] && (c = ' '))) tmp.unshift(c);
      text = tmp.join('');
      if (text == ' ') return;
    }
    // 处理实体
    var i = -1,
      j, en, siblings = this.siblings();
    while (1) {
      if ((i = text.indexOf('&', i + 1)) == -1) break;
      if ((j = text.indexOf(';', i + 2)) == -1) break;
      if (text[i + 1] == '#') {
        en = parseInt((text[i + 2] == 'x' ? '0' : '') + text.substring(i + 2, j));
        if (!isNaN(en)) text = text.substr(0, i) + String.fromCharCode(en) + text.substr(j + 1);
      } else {
        en = text.substring(i + 1, j);
        if (en == 'nbsp')
          text = text.substr(0, i) + '\xA0' + text.substr(j + 1); // 解决 &nbsp; 失效
        else if (en != 'lt' && en != 'gt' && en != 'amp' && en != 'ensp' && en != 'emsp' && en != 'quot' && en != 'apos') {
          i && siblings.push({
            type: 'text',
            text: text.substr(0, i)
          })
          siblings.push({
            type: 'text',
            text: `&${en};`,
            en: 1
          })
          text = text.substr(j + 1);
          i = -1;
        }
      }
    }
    text && siblings.push({
      type: 'text',
      text
    });
  }
  // 设置元素节点
  setNode() {
    var node = {
      name: this.tagName.toLowerCase(),
      attrs: this.attrs
    }
    this.attrs = {};
    if (!cfg.ignoreTags[node.name]) {
      this.matchAttr(node);
      if (!cfg.selfClosingTags[node.name]) {
        node.children = [];
        if (node.name == 'pre' && cfg.highlight) {
          this.remove(node);
          this.pre = node.pre = true;
        }
        this.siblings().push(node);
        this.STACK.push(node);
      } else if (!cfg.filter || cfg.filter(node, this) != false)
        this.siblings().push(node);
    } else {
      if (!cfg.selfClosingTags[node.name]) this.remove(node);
      else if (node.name == 'source') {
        var parent = this.STACK[this.STACK.length - 1],
          attrs = node.attrs;
        if (parent && attrs.src)
          if (parent.name == 'video' || parent.name == 'audio')
            parent.attrs.source.push(attrs.src);
          else {
            var i, media = attrs.media;
            if (parent.name == 'picture' && !parent.attrs.src && (!media || (media.includes('px') &&
                (((i = media.indexOf('min-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth > parseInt(media.substr(i + 1))) ||
                  ((i = media.indexOf('max-width')) != -1 && (i = media.indexOf(':', i + 8)) != -1 && screenWidth < parseInt(media.substr(i + 1)))))))
              parent.attrs.src = attrs.src;
          }
      } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
    }
    if (this.data[this.i] == '/') this.i++;
    this.start = this.i + 1;
    this.state = this.Text;
  }
  // 移除标签
  remove(node) {
    var j = this.i;
    while (this.i < this.data.length) {
      if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) this.i = this.data.length;
      this.start = (this.i += 2);
      while (!blankChar[this.data[this.i]] && !this.isClose()) this.i++;
      if (this.section().toLowerCase() == node.name) {
        // 代码块高亮
        if (node.name == 'pre') {
          this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);
          return this.i = j;
        } else if (node.name == 'style')
          this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));
        else if (node.name == 'title')
          this.title = this.data.substring(j + 1, this.i - 7);
        if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
        // 处理 svg
        if (node.name == 'svg') {
          var src = this.data.substring(j, this.i + 1);
          if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
          var i = j;
          while (this.data[j] != '<') j--;
          src = this.data.substring(j, i) + src;
          this.siblings().push({
            name: 'img',
            attrs: {
              src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23')
            },
            svg: 1
          })
        }
        return;
      }
    }
  }
  // 处理属性
  matchAttr(node) {
    var attrs = node.attrs,
      style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
      styleObj = {};
    switch (node.name) {
      case 'div':
      case 'p':
        if (attrs.align) {
          styleObj['text-align'] = attrs.align;
          attrs.align = void 0;
        }
        break;
      case 'a':
      case 'ad':
        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;
          else if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + (++this[`${node.name}Num`]);
        else this[`${node.name}Num`]++;
        if (node.name == 'video' && this.videoNum > 3) node.lazyLoad = 1;
        attrs.source = [];
        if (attrs.src) attrs.source.push(attrs.src);
        if (!attrs.controls && !attrs.autoplay)
          console.warn(`存在没有 controls 属性的 ${node.name} 标签，可能导致无法播放`, node);
        this.bubble();
    }
    if (attrs.width) {
      styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
      attrs.width = void 0;
    }
    if (attrs.height) {
      styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
      attrs.height = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    for (var i = 0, len = styles.length, style = ''; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var key = info[0].trim().toLowerCase(),
        value = info.slice(1).join(':').trim();
      if (value.includes('-webkit') || value.includes('-moz') || value.includes('-ms') || value.includes('-o') || value.includes('safe'))
        style += `;${key}:${value}`;
      else if (!styleObj[key] || value.includes('import') || !styleObj[key].includes('import'))
        styleObj[key] = value;
    }
    if (node.name == 'img' || node.name == 'picture') {
      if (attrs['data-src']) {
        attrs.src = attrs.src || attrs['data-src'];
        attrs['data-src'] = void 0;
      }
      if ((attrs.src || node.name == 'picture') && !attrs.ignore) {
        if (this.bubble()) {
          if ((attrs.src || '').includes('.webp')) node.webp = 1;
          attrs.i = (this.imgNum++).toString();
        } else attrs.ignore = 'T';
      }
      if (attrs.ignore) styleObj['max-width'] = '100%';
      var check = item => styleObj[item] && !styleObj[item].includes('auto');
      if (check('width')) {
        var parent = this.STACK[this.STACK.length - 1];
        if (styleObj.width.includes('%') && parent && (parent.attrs.style || '').includes('display:inline')) {
          parent.attrs.style += ';max-width:100%'
          node.auto = 1;
        }
        if (parseInt(styleObj.width) > screenWidth)
          styleObj.height = 'auto';
        if (check('height')) node.mode = 'scaleToFill';
      } else if (check('height')) node.mode = 'heightFix';
      else node.auto = 1;
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) j++;
          value = value.substr(0, j) + this.getUrl(value.substr(j, 2)) + value.substr(j + 2);
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.\s]*rpx/g, $ => parseFloat($) * screenWidth / 750 + 'px');
      else if (key == 'white-space' && value.includes('pre'))
        this.pre = node.pre = true;
      style += `;${key}:${value}`;
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (attrs.id) {
      if (this.compress & 1) attrs.id = void 0;
      else if (this.useAnchor) this.bubble();
    }
    if ((this.compress & 2) && attrs.class) attrs.class = void 0;
  }
  // 节点出栈处理
  popNode(node) {
    // 空白符处理
    if (node.pre) {
      node.pre = this.pre = void 0;
      for (let i = this.STACK.length; i--;)
        if (this.STACK[i].pre)
          this.pre = true;
    }
    if (node.name == 'head' || (cfg.filter && cfg.filter(node, this) == false))
      return this.siblings().pop();
    // 替换一些标签名
    if (node.name == 'picture') {
      node.name = 'img';
      if (!node.attrs.src && (node.children[0] || '').name == 'img')
        node.attrs.src = node.children[0].attrs.src;
      return node.children = void 0;
    }
    if (cfg.blockTags[node.name]) node.name = 'div';
    else if (!cfg.trustTags[node.name]) node.name = 'span';
    // 处理列表
    if (node.c) {
      if (node.name == 'ul') {
        var floor = 1;
        for (let i = this.STACK.length; i--;)
          if (this.STACK[i].name == 'ul') floor++;
        if (floor != 1)
          for (let i = node.children.length; i--;)
            node.children[i].floor = floor;
      } else if (node.name == 'ol') {
        for (let i = 0, num = 1, child; child = node.children[i++];)
          if (child.name == 'li') {
            child.type = 'ol';
            child.num = ((num, type) => {
              if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
              if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
              if (type == 'i' || type == 'I') {
                num = (num - 1) % 99 + 1;
                var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
                  ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
                  res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
                if (type == 'i') return res.toLowerCase();
                return res;
              }
              return num;
            })(num++, node.attrs.type) + '.';
          }
      }
    }
    // 处理表格的边框
    if (node.name == 'table') {
      if (node.attrs.border)
        node.attrs.style = `border:${node.attrs.border}px solid gray;${node.attrs.style || ''}`;
      if (node.attrs.cellspacing)
        node.attrs.style = `border-spacing:${node.attrs.cellspacing}px;${node.attrs.style || ''}`;
      if (node.attrs.border || node.attrs.cellpadding)
        (function f(ns) {
          for (var i = 0, n; n = ns[i]; i++) {
            if (n.name == 'th' || n.name == 'td') {
              if (node.attrs.border)
                n.attrs.style = `border:${node.attrs.border}px solid gray;${n.attrs.style || ''}`;
              if (node.attrs.cellpadding)
                n.attrs.style = `padding:${node.attrs.cellpadding}px;${n.attrs.style || ''}`;
            } else f(n.children || []);
          }
        })(node.children)
    }
    this.CssHandler.pop && this.CssHandler.pop(node);
    // 自动压缩
    if (node.name == 'div' && !Object.keys(node.attrs).length) {
      var siblings = this.siblings();
      if (!(node.children || []).length) siblings.pop();
      else if (node.children.length == 1 && node.children[0].name == 'div')
        siblings[siblings.length - 1] = node.children[0];
    }
  }
  // 工具函数
  bubble() {
    for (var i = this.STACK.length; i--;) {
      if (cfg.richOnlyTags[this.STACK[i].name]) break;
      this.STACK[i].c = 1;
    }
    return i == -1;
  }
  getUrl(url) {
    if (this.domain) {
      if (url[0] == '/') {
        if (url[1] == '/') url = this.protocol + ':' + url;
        else url = this.domain + url;
      } else if (!url.includes('://'))
        url = this.domain + '/' + url;
    }
    return url;
  }
  isClose = () => this.data[this.i] == '>' || (this.data[this.i] == '/' && this.data[this.i + 1] == '>');
  section = () => this.data.substring(this.start, this.i);
  siblings = () => this.STACK.length ? this.STACK[this.STACK.length - 1].children : this.DOM;
  // 状态机
  Text(c) {
    if (c == '<') {
      var next = this.data[this.i + 1],
        isLetter = c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
      if (isLetter(next)) {
        this.setText();
        this.start = this.i + 1;
        this.state = this.TagName;
      } else if (next == '/') {
        this.setText();
        if (isLetter(this.data[++this.i + 1])) {
          this.start = this.i + 1;
          this.state = this.EndTag;
        } else this.Comment();
      } else if (next == '!') {
        this.setText();
        this.Comment();
      }
    }
  }
  Comment() {
    var key;
    if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';
    else if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';
    else key = '>';
    if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;
    else this.i += key.length - 1;
    this.start = this.i + 1;
    this.state = this.Text;
  }
  TagName(c) {
    if (blankChar[c]) {
      this.tagName = this.section();
      while (blankChar[this.data[this.i]]) this.i++;
      if (this.isClose()) this.setNode();
      else {
        this.start = this.i;
        this.state = this.AttrName;
      }
    } else if (this.isClose()) {
      this.tagName = this.section();
      this.setNode();
    }
  }
  AttrName(c) {
    var blank = blankChar[c];
    if (blank) {
      this.attrName = this.section();
      c = this.data[this.i];
    }
    if (c == '=') {
      if (!blank) this.attrName = this.section();
      while (blankChar[this.data[++this.i]]);
      this.start = this.i--;
      this.state = this.AttrValue;
    } else if (blank) this.setAttr();
    else if (this.isClose()) {
      this.attrName = this.section();
      this.setAttr();
    }
  }
  AttrValue(c) {
    if (c == '"' || c == "'") {
      this.start++;
      if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
      this.attrVal = this.section();
      this.i++;
    } else {
      for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++);
      this.attrVal = this.section();
    }
    while (this.attrVal.includes('&quot;')) this.attrVal = this.attrVal.replace('&quot;', '"');
    this.setAttr();
  }
  EndTag(c) {
    if (blankChar[c] || c == '>' || c == '/') {
      var name = this.section().toLowerCase();
      for (var i = this.STACK.length; i--;)
        if (this.STACK[i].name == name) break;
      if (i != -1) {
        var node;
        while ((node = this.STACK.pop()).name != name);
        this.popNode(node);
      } else if (name == 'p' || name == 'br')
        this.siblings().push({
          name,
          attrs: {}
        });
      this.i = this.data.indexOf('>', this.i);
      this.start = this.i + 1;
      if (this.i == -1) this.i = this.data.length;
      else this.state = this.Text;
    }
  }
}
module.exports = MpHtmlParser;