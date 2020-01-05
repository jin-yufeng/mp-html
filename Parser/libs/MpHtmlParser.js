/*
 将 html 解析为适用于小程序 rich-text 的 DOM 结构
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
const CssHandler = require("./CssHandler.js");
const config = require("./config.js");
var emoji;
try {
  emoji = require("./emoji.js");
} catch (e) {};
class MpHtmlParser {
  constructor(data, options = {}, cb) {
    this.cb = cb;
    this.CssHandler = new CssHandler(options.tagStyle);
    this.data = data;
    this.DOM = [];
    this._attrName = '';
    this._attrValue = '';
    this._attrs = {};
    this._domain = options.domain;
    this._protocol = options.domain ? (options.domain.includes("://") ? this._domain.split("://")[0] : "http") : undefined;
    this._i = 0;
    this._sectionStart = 0;
    this._state = this.Text;
    this._STACK = [];
    this._tagName = '';
    this._audioNum = 0;
    this._imgNum = 0;
    this._videoNum = 0;
    this._useAnchor = options.useAnchor;
    this._whiteSpace = false;
  };
  parse() {
    if (this.CssHandler) this.data = this.CssHandler.getStyle(this.data);
    if (emoji) this.data = emoji.parseEmoji(this.data);
    // 高亮处理
    if (config.highlight)
      this.data = this.data.replace(/<[pP][rR][eE]([\s\S]*?)>([\s\S]*?)<\/[pP][rR][eE][\s\S]*?>/g, function() {
        return "<pre" + arguments[1] + '>' + config.highlight(arguments[2], "<pre" + arguments[1] + '>') + "</pre>";
      })
    for (var len = this.data.length; this._i < len; this._i++)
      this._state(this.data[this._i]);
    if (this._state == this.Text) this.setText();
    while (this._STACK.length)
      this.popNode(this._STACK.pop());
    if (this.DOM.length) this.DOM[0].PoweredBy = "Parser";
    if (this.cb)
      this.cb(this.DOM)
    else return this.DOM;
  };
  // 设置属性
  setAttr() {
    if (config.trustAttrs[this._attrName])
      this._attrs[this._attrName] = (this._attrValue ? this._attrValue : (this._attrName == "src" ? "" : "true"));
    this._attrValue = '';
    while (config.blankChar[this.data[this._i]]) this._i++;
    if (this.checkClose()) this.setNode();
    else this._state = this.AttrName;
  };
  // 设置文本节点
  setText() {
    var text = this.getSelection();
    if (!text) return;
    if (!this._whiteSpace) {
      // 移除空白符
      for (var tmp = [], i = text.length, has = false; i--;)
        if ((!config.blankChar[text[i]] && (has = true)) || !config.blankChar[tmp[0]]) tmp.unshift(text[i]);
      if (!has) return;
      text = tmp.join('');
    }
    while (text.includes("&nbsp;")) text = text.replace("&nbsp;", '\u00A0');
    // 检查实体
    var i = text.indexOf('&'),
      j, decode;
    while (i != -1 && i < text.length) {
      j = text.indexOf(';', i);
      if (j - i >= 2 && j - i <= 7) {
        var entity = text.substring(i, j);
        if (!entity.includes("sp") && !entity.includes("lt") && !entity.includes("gt")) {
          decode = true
          break;
        }
      }
      i = text.indexOf('&', i + 1);
    }
    var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
    if (slibings.length && slibings[slibings.length - 1].type == "text") {
      slibings[slibings.length - 1].text += text;
      if (decode) slibings[slibings.length - 1].decode = true;
    } else
      slibings.push({
        type: "text",
        text,
        decode
      });
  };
  // 设置元素节点
  setNode() {
    var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
    var node = {
      name: this._tagName.toLowerCase(),
      attrs: this._attrs
    }
    config.LabelAttrsHandler(node, this);
    this._attrs = {};
    if (!config.selfClosingTags[node.name]) {
      if (config.ignoreTags[node.name]) {
        var j = this._i;
        // 处理要被移除的标签
        while (this._i < this.data.length) {
          (this._i = this.data.indexOf("</", this._i + 1)) == -1 ? this._i = this.data.length : null;
          this._i += 2;
          this._sectionStart = this._i;
          while (!config.blankChar[this.data[this._i]] && this.data[this._i] != '>' && this.data[this._i] != '/') this._i++;
          if (this.data.substring(this._sectionStart, this._i).toLowerCase() == node.name) {
            this._i = this.data.indexOf('>', this._i);
            if (this._i == -1) this._i = this.data.length;
            else this._sectionStart = this._i + 1;
            this._state = this.Text;
            // 处理svg
            if (node.name == "svg") {
              var src = this.data.substring(j, this._i + 1);
              if (!node.attrs.xmlns) src = " xmlns=\"http://www.w3.org/2000/svg\"" + src;
              this._i = j;
              while (this.data[j] != '<') j--;
              src = this.data.substring(j, this._i) + src;
              this._i = this._sectionStart - 1;
              node.name = "img";
              node.attrs = {
                src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
                ignore: "true"
              }
              slibings.push(node);
            }
            break;
          }
        }
        return;
      } else this._STACK.push(node);
      node.children = [];
    }
    if (this.data[this._i] == '/') this._i++;
    this._sectionStart = this._i + 1;
    this._state = this.Text;
    if (!config.ignoreTags[node.name]) {
      // 检查空白符是否有效
      if (node.name == "pre" || (node.attrs.style && node.attrs.style.toLowerCase().includes("white-space") && node.attrs.style.toLowerCase().includes("pre"))) {
        this._whiteSpace = true;
        node.pre = true;
      }
      slibings.push(node);
    }
  };
  // 节点出栈处理
  popNode(node) {
    // 替换一些标签名
    if (config.blockTags[node.name]) node.name = 'div';
    else if (!config.trustTags[node.name]) node.name = 'span';
    // 空白符处理
    if (node.pre) {
      this._whiteSpace = false;
      node.pre = undefined;
      for (var i = this._STACK.length; i--;)
        if (this._STACK[i].pre)
          this._whiteSpace = true;
    }
    // 处理表格的边框
    if (node.name == 'table') {
      if (node.attrs.border)
        node.attrs.style = "border:" + node.attrs.border + "px solid gray;" + (node.attrs.style || '');
      if (node.attrs.hasOwnProperty("cellspacing"))
        node.attrs.style = "border-spacing:" + node.attrs.cellspacing + "px;" + (node.attrs.style || '');

      function setBorder(elem) {
        if (elem.name == 'th' || elem.name == 'td') {
          if (node.attrs.border)
            elem.attrs.style = "border:" + node.attrs.border + "px solid gray;" + (elem.attrs.style || '');
          if (node.attrs.hasOwnProperty("cellpadding"))
            elem.attrs.style = "padding:" + node.attrs.cellpadding + "px;" + (elem.attrs.style || '');
          return;
        }
        if (elem.type == 'text') return;
        for (var i = elem.children.length; i--;)
          setBorder(elem.children[i]);
      }
      if (node.attrs.border || node.attrs.hasOwnProperty("cellpadding"))
        for (var i = node.children.length; i--;)
          setBorder(node.children[i]);
    }
    // 合并一些不必要的层，减小节点深度
    if (node.children.length == 1 && node.name == "div" && node.children[0].name == "div") {
      var child = node.children[0].attrs;
      node.attrs.style = node.attrs.style || '';
      child.style = child.style || '';
      if (node.attrs.style.includes("padding") && (node.attrs.style.includes("margin") || child.style.includes("margin")) && node.attrs.style.includes("display") && child.style.includes("display") && !(node.attrs.id && node.attrs.id) && !(node.attrs.class && child.class)) {
        if (child.style.includes("padding"))
          child.style = "box-sizing:border-box;" + child.style;
        node.attrs.style = node.attrs.style + ";" + child.style;
        node.attrs.id = (child.id || '') + (node.attrs.id || '');
        node.attrs.class = (child.class || '') + (node.attrs.class || '');
        node.children = node.children[0].children;
      } else if (!node.attrs.style) node.attrs.style = undefined;
      else if (!child.style) child.style = undefined;
      child = undefined;
    }
    // 多层样式处理
    if (this.CssHandler.pop)
      this.CssHandler.pop(node);
  };
  // 工具函数
  checkClose() {
    if (this.data[this._i] == '>' || (this.data[this._i] == '/' && this.data[this._i + 1] == '>'))
      return true;
    return false;
  };
  getSelection(trim) {
    var str = (this._sectionStart == this._i ? '' : this.data.substring(this._sectionStart, this._i));
    while (trim && (config.blankChar[this.data[++this._i]] || (this._i--, false)));
    this._sectionStart = this._i + 1;
    return str;
  };
  // 状态机
  Text(c) {
    if (c == '<') {
      var next = this.data[this._i + 1];
      if ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z')) {
        this.setText();
        this._state = this.TagName;
      } else if (next == '/') {
        this.setText();
        this._i++;
        next = this.data[this._i + 1];
        if ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z')) {
          this._sectionStart = this._i + 1;
          this._state = this.EndTag;
        } else
          this._state = this.Comment;
      } else if (next == '!') {
        this.setText();
        this._state = this.Comment;
      }
    }
  };
  Comment() {
    if (this.data.substring(this._i + 1, this._i + 3) == "--" || this.data.substring(this._i + 1, this._i + 7) == "[CDATA[") {
      this._i = this.data.indexOf("-->", this._i + 1);
      if (this._i == -1) return this._i = this.data.length;
      else this._i = this._i + 2;
    } else
      (this._i = this.data.indexOf(">", this._i + 1)) == -1 ? this._i = this.data.length : null;
    this._sectionStart = this._i + 1;
    this._state = this.Text;
  };
  TagName(c) {
    if (config.blankChar[c]) {
      this._tagName = this.getSelection(true);
      if (this.checkClose()) this.setNode();
      else this._state = this.AttrName;
    } else if (this.checkClose()) {
      this._tagName = this.getSelection();
      this.setNode();
    }
  };
  AttrName(c) {
    if (config.blankChar[c]) {
      this._attrName = this.getSelection(true).toLowerCase();
      if (this.data[this._i] == '=') {
        while (config.blankChar[this.data[++this._i]]);
        this._sectionStart = this._i--;
        this._state = this.AttrValue;
      } else this.setAttr();
    } else if (c == '=') {
      this._attrName = this.getSelection().toLowerCase();
      while (config.blankChar[this.data[++this._i]]);
      this._sectionStart = this._i--;
      this._state = this.AttrValue;
    } else if (this.checkClose()) {
      this._attrName = this.getSelection().toLowerCase();
      this.setAttr();
    }
  };
  AttrValue(c) {
    if (c == '"' || c == "'") {
      this._sectionStart++;
      if ((this._i = this.data.indexOf(c, this._i + 1)) == -1) return this._i = this.data.length;
    } else
      for (; !config.blankChar[this.data[this._i]] && this.data[this._i] != '>'; this._i++);
    this._attrValue = this.getSelection();
    while (this._attrValue.includes("&quot;")) this._attrValue = this._attrValue.replace("&quot;", '');
    this.setAttr();
  };
  EndTag(c) {
    if (config.blankChar[c] || c == '>' || c == '/') {
      var name = this.getSelection().toLowerCase();
      var flag = false;
      for (var i = this._STACK.length; i--;)
        if (this._STACK[i].name == name) {
          flag = true;
          break;
        }
      if (flag) {
        var node;
        while (flag) {
          node = this._STACK.pop();
          if (node.name == name) flag = false;
          this.popNode(node);
        }
      } else if (name == 'p' || name == "br") {
        var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
        var node = {
          name
        }
        slibings.push(node);
      }
      this._i = this.data.indexOf('>', this._i);
      if (this._i == -1) this._i = this.data.length;
      else this._state = this.Text;
    }
  };
};
module.exports = {
  parseHtml: (data, options) => new Promise((resolve) => new MpHtmlParser(data, options, resolve).parse()),
  parseHtmlSync: (data, options) => new MpHtmlParser(data, options).parse()
};