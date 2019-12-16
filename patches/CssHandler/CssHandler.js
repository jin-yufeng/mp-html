/*
 CssHandler 补丁包
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
const config = require("./config.js");
function _matchClass(match_class, selector_class) {
  if (!match_class || !match_class.length || !selector_class || !selector_class.length) return false;
  else if (match_class.length == 1 && selector_class.length == 1) {
    if (match_class[0] == selector_class[0]) return true;
    else return false;
  } else if (match_class.length < selector_class.length) return false;
  else {
    for (var i of selector_class) {
      var matched = false;
      for (var j of match_class) {
        if (j == i) matched = true;
      }
      if (matched == false) return false;
    }
    return true;
  }
}

function _matchId(match_id, selector_id) {
  if (!match_id || !match_id.length || !selector_id || !selector_id.length) return false;
  if (match_id.length == 1 && selector_id.length == 1) {
    if (match_id[0] == selector_id[0]) return true;
    else return false;
  } else if (match_id.length < selector_id.length) return false;
  else {
    for (var i of selector_id) {
      var matched = false;
      for (var j of match_id) {
        if (j == i) matched = true;
      }
      if (matched == false) return false;
    }
    return true;
  }
}

function matchClass(match_name, match_class, match_id, selector) {
  if (selector == '*') return 0;
  var selector_name = selector.match(/^[^\.#\[\]\s]+/);
  var selector_class = selector.match(/\.[^\.#\[\]\s]+/g);
  var selector_id = selector.match(/#[^\.#\[\]\s]+/g);
  if (selector_id) {
    if (_matchId(match_id, selector_id)) {
      if ((selector_class && !_matchClass(match_class, selector_class)) || (selector_name && match_name != selector_name[0]))
        return -1;
      else
        return 2;
    } else
      return -1;
  } else if (selector_class) {
    if (_matchClass(match_class, selector_class)) {
      if (selector_name && match_name != selector_name[0])
        return -1;
      else
        return 1;
    } else
      return -1;
  } else if (selector_name && match_name == selector_name[0]) return 0;
  return -1;
}
class CssHandler {
  constructor(tagStyle) {
    this.styles = tagStyle;
  };
  getStyle(data) {
    var style = '';
    data = data.replace(/<style[\s\S]*?>([\s\S]*?)<\/style[\s\S]*?>/g, function () {
      style += arguments[1];
      return '';
    })
    this.styles = new CssParser(style, this.styles).parse();
    return data;
  };
  parseCss = (css) => new CssParser(css, {}, true).parse();
  match(name, attrs, element) {
    var match_class = [];
    if (attrs.class) {
      var matchs = attrs.class.split(/\s/);
      for (var i of matchs) {
        match_class.push('.' + i);
      }
    }
    var match_id = [];
    if (attrs.id) {
      var matchs = attrs.id.split(/\s/);
      for (var i of matchs) {
        match_id.push('#' + i);
      }
    }
    var matchedName = '',
      matchedClass = '',
      matchedId = '',
      key, sign = false,
      item;
    element.i = [];
    element.index = [];
    element.pseudo = [];

    for (var i = 0; i < this.styles.length; i++) {
      item = this.styles[i];
      if (item.key[0] == '>') {
        key = item.key.substring(1);
        sign = true;
      } else {
        key = item.key;
        sign = false;
      }
      var matchRes = matchClass(name, match_class, match_id, key);
      if (matchRes != -1) {
        if (!item.hasOwnProperty('index') || item.index == (item.list.length - 1)) {
          if (item.pseudo) element.pseudo.push(item);
          else if (matchRes == 0)
            matchedName += (';' + item.content);
          else if (matchRes == 1)
            matchedClass += (';' + item.content);
          else
            matchedId += (';' + item.content);
        } else {
          element.i.push(i);
          element.index.push(item.index);
          item.index++;
          item.key = item.list[item.index];
        }
      }
      if (sign) {
        element.i.push(i);
        element.index.push(item.index);
        item.index--;
        item.key = item.list[item.index];
      }
    }
    if (!element.i.length) {
      delete element.i;
      delete element.index;
    }
    if (!element.pseudo.length)
      delete element.pseudo;
    return (matchedName ? (matchedName + ';') : '') + (matchedClass ? (matchedClass + ";") : '') + (matchedId ? (matchedId + ";") : '');
  };
  pop(element) {
    // 多层class匹配标记
    if (element.hasOwnProperty("i")) {
      for (var i = 0; i < element.i.length; i++) {
        this.styles[element.i[i]].key = this.styles[element.i[i]].list[element.index[i]];
        this.styles[element.i[i]].index = element.index[i];
      }
      delete element.i;
      delete element.index;
    }
    // 伪类
    if (element.hasOwnProperty("pseudo")) {
      for (var item of element.pseudo) {
        var content;
        var style = item.content.replace(/content\s*:\s*['"]([\S]*?)['"];*/, function () {
          content = arguments[1];
          return '';
        })
        var child = {
          name: "span",
          attrs: {
            style
          },
          children: [{
            type: "text",
            text: content
          }]
        }
        if (item.pseudo == "before")
          element.children.unshift(child);
        else
          element.children.push(child);
      }
    }
  }
}
function isBlankChar(c) {
  return c == ' ' || c == '\t' || c == '\r' || c == '\n' || c == '\v' || c == '\f';
};
class CssParser {
  constructor(data, tagStyle = {}, api) {
    this.data = data;
    this.res = this.merge(tagStyle, api);
    this._floor = 0;
    this._i = 0;
    this._name = '';
    this._content = '';
    this._sectionStart = 0;
    this._stateHandler = this.SpaceHandler;
  };
  merge(tagStyle, api) {
    var merge;
    if (api) merge = JSON.parse(JSON.stringify(tagStyle));
    else {
      merge = JSON.parse(JSON.stringify(config.userAgentStyles));
      for (var key in tagStyle)
        merge[key] = (merge[key] || '') + tagStyle[key];
    }
    var res = [];
    for (var key in merge) {
      res.push({
        key,
        content: merge[key]
      })
    }
    return res;
  };
  parse() {
    for (; this._i < this.data.length; this._i++)
      this._stateHandler(this.data[this._i]);
    return this.res;
  };
  SpaceHandler(c) {
    if (c == '.' || c == '#' || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
      this._sectionStart = this._i;
      this._stateHandler = this.StyleNameHandler;
    } else if (c == '/' && this.data[this._i + 1] == '*')
      this.CommentHandler();
    else if (!isBlankChar(c) && c != ';')
      this._stateHandler = this.IgnoreHandler;
  };
  CommentHandler() {
    this._i = this.data.indexOf("*/", this._i);
    if (this._i == -1) this._i = this.data.length;
    this._i++;
    this._stateHandler = this.SpaceHandler;
  };
  IgnoreHandler(c) {
    if (c == '{') this._floor++;
    else if (c == '}' && --this._floor <= 0)
      this._stateHandler = this.SpaceHandler;
  };
  StyleNameHandler(c) {
    if (c == '{') {
      this._name = this.data.substring(this._sectionStart, this._i);
      this._sectionStart = this._i + 1;
      this.ContentHandler();
    } else if (isBlankChar(c)) {
      this._name = this.data.substring(this._sectionStart, this._i);
      this._stateHandler = this.NameSpaceHandler;
    } else if (c == '[') this._stateHandler = this.IgnoreHandler;
  };
  NameSpaceHandler(c) {
    if (c == '{') {
      this._sectionStart = this._i + 1;
      this.ContentHandler();
    } else if (!isBlankChar(c))
      this._stateHandler = this.StyleNameHandler;
  };
  ContentHandler() {
    this._i = this.data.indexOf('}', this._i);
    if (this._i == -1) this._i = this.data.length;
    // 去除空白符
    var flag = false,
      pos, content = this.data.substring(this._sectionStart, this._i);
    for (var i = 0; i < content.length; i++) {
      if (isBlankChar(content[i])) {
        if (!flag) {
          pos = i;
          flag = true;
        }
      } else {
        if (flag) {
          if (pos == 0) content = content.substring(i);
          else if (i - pos > 1) content = content.substring(0, pos) + ' ' + content.substring(i);
          i = pos;
          flag = false;
        }
      }
    }
    if (flag) content = content.substring(0, pos);
    this._content = content;
    var items = this._name.split(/\s*,\s*/);
    for (let item of items)
      this.setClass(item);
    this._stateHandler = this.SpaceHandler;
  };
  setClass(key) {
    var pseudo;
    if (key.includes(':')) {
      var info = key.split(/\s*:+\s*/);
      key = info[0];
      pseudo = info[1];
      if (pseudo != "before" && pseudo != "after") return;
    }
    if (!/[\s>]/.test(key)) {
      this.res.push({
        key: key,
        content: this._content,
        pseudo
      })
    } else {
      key = key.replace(/\s*>\s*/g, ' >').split(/\s/);
      this.res.push({
        key: key[0],
        index: 0,
        list: key,
        content: this._content,
        pseudo
      })
    }
  };
}
module.exports = CssHandler;