//DomHandler.js
const CssTokenizer = require('./CssTokenizer.js');
const CanIUse = require('./api.js').versionHigherThan('2.7.1');
const Common = 1,
  Rich = 2;
const trustTag = {
  a: Rich,
  abbr: Common,
  audio: Rich,
  b: Common,
  blockquote: Common,
  br: Rich,
  code: Common,
  col: Rich,
  colgroup: Rich,
  dd: Common,
  del: Common,
  dl: Common,
  dt: Common,
  div: Common,
  em: Common,
  fieldset: Rich,
  font: Common,
  h1: Rich,
  h2: Rich,
  h3: Rich,
  h4: Rich,
  h5: Rich,
  h6: Rich,
  hr: Rich,
  i: Common,
  img: Common,
  ins: Common,
  label: Common,
  legend: Rich,
  li: Rich,
  ol: Rich,
  p: Common,
  q: Common,
  source: Rich,
  span: Common,
  strong: Common,
  sub: Rich,
  sup: Rich,
  table: Rich,
  tbody: Rich,
  td: Rich,
  tfoot: Rich,
  th: Rich,
  thead: Rich,
  tr: Rich,
  u: Common,
  ul: Rich,
  video: Common
};
const blockTag = {
  address: true,
  article: true,
  aside: true,
  body: true,
  center: true,
  cite: true,
  footer: true,
  header: true,
  html: true,
  nav: true,
  pre: true,
  section: true
}
const textTag = {
  a: true,
  abbr: true,
  b: true,
  big: true,
  code: true,
  del: true,
  em: true,
  font: true,
  i: true,
  ins: true,
  label: true,
  mark: true,
  q: true,
  s: true,
  small: true,
  span: true,
  strong: true,
  u: true
};
const ignoreTag = {
  area: true,
  base: true,
  basefont: true,
  canvas: true,
  circle: true,
  command: true,
  ellipse: true,
  embed: true,
  frame: true,
  head: true,
  iframe: true,
  input: true,
  isindex: true,
  keygen: true,
  line: true,
  link: true,
  map: true,
  meta: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  script: true,
  stop: true,
  textarea: true,
  title: true,
  track: true,
  use: true,
  wbr: true
};
if (CanIUse) {
  trustTag.bdi = Rich;
  trustTag.bdo = Rich;
  trustTag.caption = Rich;
  trustTag.rt = Rich;
  trustTag.ruby = Rich;
  ignoreTag.rp = true;
  trustTag.big = Common;
  trustTag.small = Common;
  trustTag.pre = Rich;
  delete blockTag.pre;
}
//添加默认值
function initStyle(tagStyle) {
  tagStyle.a = "display:inline;color:#366092;word-break:break-all;" + (tagStyle.a || "");
  tagStyle.address = "font-style:italic;" + (tagStyle.address || "");
  tagStyle.blockquote = tagStyle.blockquote || 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px';
  tagStyle.center = 'text-align:center;' + (tagStyle.center || "");
  tagStyle.cite = "font-style:italic;" + (tagStyle.cite || "");
  tagStyle.code = tagStyle.code || 'padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border:1px solid #cccccc;border-radius:3px';
  tagStyle.dd = "margin-left:40px;" + (tagStyle.dd || "");
  tagStyle.img = "max-width:100%;" + (tagStyle.img || "");
  tagStyle.mark = "display:inline;background-color:yellow;" + (tagStyle.mark || "");
  tagStyle.pre = "overflow:scroll;" + (tagStyle.pre || 'background-color:#f6f8fa;padding:5px;border-radius:5px;');
  tagStyle.s = "display:inline;text-decoration:line-through;" + (tagStyle.s || "");
  tagStyle.u = "display:inline;text-decoration:underline;" + (tagStyle.u || "");
  //低版本兼容
  if (!CanIUse) {
    blockTag.caption = true;
    tagStyle.big = "display:inline;font-size:1.2em;" + (tagStyle.big || "");
    tagStyle.small = "display:inline;font-size:0.8em;" + (tagStyle.small || "");
    tagStyle.pre = "font-family:monospace;white-space:pre;" + tagStyle.pre;
  }
  return tagStyle;
}

function DomHandler(style, tagStyle = {}) {
  this.imgList = [];
  this.nodes = [];
  this.title = "";
  this._videoNum = 0;
  this._audioNum = 0;
  this._style = new CssTokenizer(style, initStyle(tagStyle)).parse();
  this._tagStack = [];
}
DomHandler.prototype._addDomElement = function(element) {
  let parent = this._tagStack[this._tagStack.length - 1];
  let siblings = parent ? parent.children : this.nodes;
  siblings.push(element);
};
DomHandler.prototype._bubbling = function() {
  for (let i = this._tagStack.length - 1; i >= 0; i--) {
    if (trustTag[this._tagStack[i].name] == Common) this._tagStack[i].continue = true;
    else return this._tagStack[i].name;
  }
}
DomHandler.prototype.onopentag = function(name, attrs) {
  let element = {
    children: []
  };
  //匹配样式
  let matched =
    (this._style[name] ? (this._style[name] + ';') : '') +
    (this._style['#' + attrs.id] ? (this._style['#' + attrs.id] + ';') : '') +
    (this._style['.' + attrs.class] ? (this._style['.' + attrs.class] + ';') : '');
  delete attrs.class;
  delete attrs.id;
  //处理属性
  switch (name) {
    case 'div':
    case 'p':
      if (attrs.align) {
        attrs.style += (';text-align:' + attrs.align);
        delete attrs.align;
      }
      break;
    case 'img':
      if (attrs.width) {
        attrs.style = 'width:' + attrs.width + (/[0-9]/.test(attrs.width[attrs.width.length - 1]) ? 'px' : '') + ';' + attrs.style;
        delete attrs.width;
      }
      if (attrs['data-src']) {
        attrs.src = attrs.src || attrs['data-src'];
        delete attrs['data-src'];
      }
      if (!attrs.hasOwnProperty('ignore') && attrs.src) {
        this.imgList.push(attrs.src);
        if (this._bubbling() == 'a') attrs.ignore = "";
      };
      break;
    case 'font':
      name = 'span';
      if (attrs.color) {
        attrs.style += (';color:' + attrs.color);
        delete attrs.color;
      }
      if (attrs.face) {
        attrs.style += (";font-family:" + attrs.face);
        delete attrs.face;
      }
      break;
    case 'a':
      this._bubbling();
      break;
    case 'video':
    case 'audio':
      attrs.loop = attrs.hasOwnProperty('loop');
      attrs.controls = attrs.hasOwnProperty('controls');
      attrs.autoplay = attrs.hasOwnProperty('autoplay');
      if (name == 'video') {
        attrs.muted = attrs.hasOwnProperty('muted');
        if (attrs.width) {
          attrs.style = 'width:' + parseFloat(attrs.width) + 'px;' + attrs.style;
          delete attrs.width;
        }
        if (attrs.height) {
          attrs.style = 'height:' + parseFloat(attrs.height) + 'px;' + attrs.style;
          delete attrs.height;
        }
      }
      attrs.id = (name + (++this['_' + name + 'Num']));
      attrs.source = [];
      if (attrs.src) attrs.source.push(attrs.src);
      if (!attrs.controls && !attrs.autoplay)
        console.warn('存在没有controls属性的' + name + '标签，可能导致无法播放', attrs);
      this._bubbling();
      break;
    case 'source':
      let parent = this._tagStack[this._tagStack.length - 1];
      if (parent && (parent.name == 'video' || parent.name == 'audio')) {
        parent.attrs.source.push(attrs.src);
        if (!parent.attrs.src) parent.attrs.src = attrs.src;
      }
      this._tagStack.push(element);
      return;
  }
  attrs.style = matched + attrs.style;
  if (textTag[name]) element.continue = true;
  else if (blockTag[name]) name = 'div';
  else if (!trustTag[name]) name = 'span';
  element.name = name;
  element.attrs = attrs;
  this._addDomElement(element);
  this._tagStack.push(element);
};
DomHandler.prototype.ontext = function(data) {
  if (/\S/.test(data)) {
    let element = {
      text: data.replace(/&nbsp;/g, '\u00A0'),
      type: 'text'
    };
    if (/&#*((?!sp|lt|gt).){2,5};/.test(data)) element.decode = true;
    this._addDomElement(element);
  }
};
DomHandler.prototype.onclosetag = function(name) {
  let element = this._tagStack.pop();
  if (ignoreTag[name]) {
    if (name == 'title') {
      try {
        this.title = element.children[0].text;
      } catch (e) {}
    }
    let parent = this._tagStack[this._tagStack.length - 1];
    let siblings = parent ? parent.children : this.nodes;
    siblings.pop();
  }
};
module.exports = DomHandler;