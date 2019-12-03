//CssHandler.js
function CssHandler(style, tagStyle) {
  this._style = new CssTokenizer(style, tagStyle).parse();
}

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
CssHandler.prototype.match = function(name, attrs, element) {
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

  for (var i = 0; i < this._style.length; i++) {
    item = this._style[i];
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
  return matchedName + ';' + matchedClass + ";" + matchedId + ";";
}
CssHandler.prototype.pop = function(element) {
  // 多层class匹配标记
  if (element.hasOwnProperty("i")) {
    for (var i = 0; i < element.i.length; i++) {
      this._style[element.i[i]].key = this._style[element.i[i]].list[element.index[i]];
      this._style[element.i[i]].index = element.index[i];
    }
    delete element.i;
    delete element.index;
  }
  // 伪类
  if (element.hasOwnProperty("pseudo")) {
    for (var item of element.pseudo) {
      var content;
      var style = item.content.replace(/content\s*:\s*['"]([\S]*?)['"];*/, function() {
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

function CssTokenizer(style = '', tagStyle = {}) {
  this.res = this.initClass(tagStyle);
  this._state = "SPACE";
  this._buffer = style;
  this._sectionStart = 0;
  this._index = 0;
  this._name = '';
  this._content = '';
}
CssTokenizer.prototype.initClass = function(tagStyle) {
  var initStyle = JSON.parse(JSON.stringify(tagStyle));
  initStyle.a = "display:inline;color:#366092;word-break:break-all;" + (initStyle.a || "");
  initStyle.address = "font-style:italic;" + (initStyle.address || "");
  initStyle.blockquote = initStyle.blockquote || 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px;';
  initStyle.center = 'text-align:center;' + (initStyle.center || "");
  initStyle.cite = "font-style:italic;" + (initStyle.cite || "");
  initStyle.code = initStyle.code || 'padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border:1px solid #cccccc;border-radius:3px;';
  initStyle.dd = "margin-left:40px;" + (initStyle.dd || "");
  initStyle.img = "max-width:100%;" + (initStyle.img || "");
  initStyle.mark = "display:inline;background-color:yellow;" + (initStyle.mark || "");
  initStyle.pre = "overflow:scroll;" + (initStyle.pre || 'background-color:#f6f8fa;padding:5px;border-radius:5px;');
  initStyle.s = "display:inline;text-decoration:line-through;" + (initStyle.s || "");
  initStyle.u = "display:inline;text-decoration:underline;" + (initStyle.u || "");
  initStyle.big = "display:inline;font-size:1.2em;" + (initStyle.big || "");
  initStyle.small = "display:inline;font-size:0.8em;" + (initStyle.small || "");
  initStyle.pre = "font-family:monospace;white-space:pre;" + initStyle.pre;
  var res = [];
  for (let item in initStyle) {
    res.push({
      key: item,
      content: initStyle[item]
    })
  }
  return res;
};
CssTokenizer.prototype.setClass = function(key) {
  var pseudo;
  if (/:/.test(key)) {
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
CssTokenizer.prototype.SPACE = function(c) {
  if (/[a-zA-Z.#*]/.test(c)) {
    this._sectionStart = this._index;
    this._state = "InName";
  } else if (c == '@') this._state = "Ignore1";
  else if (c == '/') this._state = "BeforeComment";
};
CssTokenizer.prototype.BeforeComment = function(c) {
  if (c == '*') this._state = "InComment";
  else {
    this._index--;
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.InComment = function(c) {
  if (c == '*') this._state = "AfterComment";
};
CssTokenizer.prototype.AfterComment = function(c) {
  if (c == '/') this._state = "SPACE";
  else {
    this._index--;
    this._state = "InComment"
  }
};
CssTokenizer.prototype.InName = function(c) {
  if (c == '{') {
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (/\s/.test(c)) {
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._state = "NameSpace";
  } else if (/[\[]/.test(c)) this._state = "Ignore1";
};
CssTokenizer.prototype.NameSpace = function(c) {
  if (c == '{') {
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (!/\s/.test(c)) {
    this._state = "InName";
  }
};
CssTokenizer.prototype.InContent = function(c) {
  if (c == '}') {
    this._content = this._buffer.substring(this._sectionStart, this._index);
    let items = this._name.split(/\s*,\s*/);
    for (let item of items)
      this.setClass(item);
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.Ignore1 = function(c) {
  if (c == ';') {
    this._state = "SPACE";
    this._sectionStart = this._index + 1;
  } else if (c == '{') this._state = "Ignore2";
};
CssTokenizer.prototype.Ignore2 = function(c) {
  if (c == '}') {
    this._state = "SPACE";
    this._sectionStart = this._index + 1;
  } else if (c == '{') this._state = "Ignore3";
};
CssTokenizer.prototype.Ignore3 = function(c) {
  if (c == '}') this._state = "Ignore2";
};
CssTokenizer.prototype.parse = function() {
  for (; this._index < this._buffer.length; this._index++)
    this[this._state](this._buffer[this._index]);
  return this.res;
};
module.exports = CssHandler;