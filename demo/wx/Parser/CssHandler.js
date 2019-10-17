//CssHandler.js
const CanIUse = require('./api.js').versionHigherThan('2.7.1');
function CssHandler(style, tagStyle) {
  this._style = new CssTokenizer(style, tagStyle).parse();
}
CssHandler.prototype.match = function(name, attrs) {
  let matched = this._style[name] ? (this._style[name] + ';') : '';
  if (attrs.id)
    matched += (this._style['#' + attrs.id] ? (this._style['#' + attrs.id] + ';') : '');
  if (attrs.class)
    for (var Class of attrs.class.split(' '))
      matched += (this._style['.' + Class] ? (this._style['.' + Class] + ';') : '');
  return matched;
}

function CssTokenizer(style = '', tagStyle = {}) {
  this.res = this.initClass(tagStyle);
  this._state = "SPACE";
  this._buffer = style;
  this._sectionStart = 0;
  this._index = 0;
  this._name = '';
  this._content = '';
  this._list = [];
  this._comma = false;
}
CssTokenizer.prototype.initClass = function(tagStyle) {
  let initStyle = JSON.parse(JSON.stringify(tagStyle));
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
  //低版本兼容
  if (!CanIUse) {
    initStyle.big = "display:inline;font-size:1.2em;" + (initStyle.big || "");
    initStyle.small = "display:inline;font-size:0.8em;" + (initStyle.small || "");
    initStyle.pre = "font-family:monospace;white-space:pre;" + initStyle.pre;
  }
  return initStyle;
}
CssTokenizer.prototype.SPACE = function(c) {
  if (/[a-zA-Z.#]/.test(c)) {
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
    this._list.push(this._buffer.substring(this._sectionStart, this._index))
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (c == ',') {
    this._list.push(this._buffer.substring(this._sectionStart, this._index));
    this._sectionStart = this._index + 1;
    this._comma = true;
  } else if ((c == '.' || c == '#') && !this._comma) {
    this._buffer = this._buffer.splice(this._index, 1, ' ');
  } else if (/\s/.test(c)) {
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._state = "NameSpace";
  } else if (/[>:\[]/.test(c)) {
    if (this._list.length) this._state = "IgnoreName";
    else this._state = "Ignore1";
  } else this._comma = false;
};
CssTokenizer.prototype.NameSpace = function(c) {
  if (c == '{') {
    this._list.push(this._name);
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (c == ',') {
    this._comma = true;
    this._list.push(this._name);
    this._sectionStart = this._index + 1;
    this._state = "InName"
  } else if (/\S/.test(c)) {
    if (this._comma) {
      this._sectionStart = this._index;
      this._index--;
      this._state = "InName";
    } else if (this._list.length) this._state = "IgnoreName";
    else this._state = "Ignore1"
  }
};
CssTokenizer.prototype.InContent = function(c) {
  if (c == '}') {
    this._content = this._buffer.substring(this._sectionStart, this._index);
    for (let item of this._list)
      this.res[item] = (this.res[item] || '') + ";" + this._content;
    this._list = [];
    this._comma = false;
    this._state = "SPACE";
  }
};
CssTokenizer.prototype.IgnoreName = function(c) {
  if (c == ',') {
    this._sectionStart = this._index + 1;
    this._state = "InName";
  } else if (c == '{') {
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  }
}
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