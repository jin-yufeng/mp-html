//Parser.js
var Tokenizer = require("./Tokenizer.js");
var DomHandler = require("./DomHandler.js");
var trustAttrs = {
  align: true,
  alt: true,
  author: true,
  autoplay: true,
  class: true,
  color: true,
  colspan: true,
  controls: true,
  "data-src": true,
  face: true,
  height: true,
  href: true,
  id: true,
  ignore: true,
  loop: true,
  muted: true,
  name: true,
  poster: true,
  rowspan: true,
  span: true,
  src: true,
  start: true,
  style: true,
  type: true,
  width: true,
};
var voidTag = {
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  path: true,
  circle: true,
  ellipse: true,
  line: true,
  rect: true,
  use: true,
  stop: true,
  polyline: true,
  polygon: true
};

function Parser(cbs, callback) {
  this._cbs = cbs;
  this._callback = callback;
  this._tagname = "";
  this._attribname = "";
  this._attribvalue = "";
  this._attribs = null;
  this._stack = [];
  this._tokenizer = new Tokenizer(this);
}
Parser.prototype.ontext = function(data) {
  this._cbs.ontext(data);
};
Parser.prototype.onopentagname = function(name) {
  name = name.toLowerCase();
  this._tagname = name;
  this._attribs = {
    style: ''
  };
  if (!voidTag[name]) this._stack.push(name);
};
Parser.prototype.onopentagend = function() {
  if (this._attribs) {
    this._cbs.onopentag(this._tagname, this._attribs);
    this._attribs = null;
  }
  if (voidTag[this._tagname]) this._cbs.onclosetag(this._tagname);
  this._tagname = "";
};
Parser.prototype.onclosetag = function(name) {
  name = name.toLowerCase();
  if (this._stack.length && !voidTag[name]) {
    var pos = this._stack.lastIndexOf(name);
    if (pos !== -1) {
      pos = this._stack.length - pos;
      while (pos--) this._cbs.onclosetag(this._stack.pop());
    } else if (name === "p") {
      this.onopentagname(name);
      this._closeCurrentTag();
    }
  } else if (name === "br" || name === "hr" || name === "p") {
    this.onopentagname(name);
    this._closeCurrentTag();
  }
};
Parser.prototype._closeCurrentTag = function() {
  var name = this._tagname;
  this.onopentagend();
  if (this._stack[this._stack.length - 1] === name) {
    this._cbs.onclosetag(name);
    this._stack.pop();
  }
};
Parser.prototype.onattribname = function(name) {
  this._attribname = name;
};
Parser.prototype.onattribdata = function(value) {
  this._attribvalue += value;
};
Parser.prototype.onattribend = function() {
  this._attribname = this._attribname.toLowerCase();
  this._attribvalue = this._attribvalue.replace(/&quot;/g, '"');
  if (this._attribs && trustAttrs[this._attribname]) {
    this._attribs[this._attribname] = this._attribvalue;
  }
  this._attribname = "";
  this._attribvalue = "";
};
Parser.prototype.onend = function() {
  for (
    var i = this._stack.length; i > 0; this._cbs.onclosetag(this._stack[--i])
  );
  this._callback({
    'nodes': this._cbs.nodes,
    'title': this._tokenizer.title,
    'imgList': this._cbs.imgList
  });
};
Parser.prototype.write = function(chunk) {
  this._tokenizer.parse(chunk);
};

function html2nodes(data, tagStyle) {
  return new Promise(function(resolve, reject) {
    try {
      var style = '';
      data = data.replace(/<style.*?>([\s\S]*?)<\/style>/gi, function() {
        style += arguments[1];
        return '';
      });
      style = style.toLowerCase();
      var handler = new DomHandler(style, tagStyle);
      new Parser(handler, function(res) {
        return resolve(res);
      }).write(data);
    } catch (err) {
      return reject(err);
    }
  })
}
module.exports = html2nodes;