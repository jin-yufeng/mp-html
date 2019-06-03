//CssTokenizer.js
function CssTokenizer(style = '', tagStyle = {}) {
  this.res = tagStyle;
  this._state = "SPACE";
  this._buffer = style;
  this._sectionStart = 0;
  this._index = 0;
  this._name = '';
  this._content = '';
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
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (/\s/.test(c)) {
    this._name = this._buffer.substring(this._sectionStart, this._index);
    this._state = "NameSpace";
  } else if (/[>:\[]/.test(c)) this._state = "Ignore1";
};
CssTokenizer.prototype.NameSpace = function(c) {
  if (c == '{') {
    this._sectionStart = this._index + 1;
    this._state = "InContent";
  } else if (!/\s/.test(c)) {
    this._state = "Ignore1";
  }
};
CssTokenizer.prototype.InContent = function(c) {
  if (c == '}') {
    this._content = this._buffer.substring(this._sectionStart, this._index);
    let items = this._name.split(',');
    for (let item of items) {
      item = item[0] + item.substring(1).replace(/[\.\#]/g, ' ');
      this.res[item] = this._content;
    }
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
  this.res.blockquote = this.res.blockquote || 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px';
  this.res.code = this.res.code || 'padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border:1px solid #cccccc;border-radius:3px';
  this.res.pre = this.res.pre || 'background-color:#f6f8fa;padding:5px;border-radius:5px;font-family:monospace;white-space:pre;overflow:scroll';
  this.res.address = 'font-style:italic;' + (this.res.address || '');
  this.res.center = 'text-align:center;' + (this.res.center || '');
  return this.res;
};
module.exports = CssTokenizer;