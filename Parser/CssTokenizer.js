//CssTokenizer.js
function CssTokenizer(style = '', tagStyle = {}) {
  this.res = tagStyle;
  this._state = "SPACE";
  this._buffer = style;
  this._sectionStart = 0;
  this._index = 0;
  this._name = '';
  this._content = '';
  this._list = [];
  this._comma = false;
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
      this.res[item] = (this.res[item] || '') + this._content;
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
module.exports = CssTokenizer;