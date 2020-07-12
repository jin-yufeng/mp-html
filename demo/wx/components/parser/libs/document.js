/*
  document 扩展包
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
const MpHtmlParser = require('./MpHtmlParser.js');

function element(node, path, context) {
  node.attrs = node.attrs || {};
  node.children = node.children || [];
  this.nodeName = node.name;
  this.id = node.attrs.id;
  this._node = node;
  this.childNodes = [];
  for (let i = 0; i < node.children.length; i++)
    if (node.children[i].name)
      this.childNodes.push(new element(node.children[i], `${path}.children[${i}]`, this._context));
  this.attributes = this._node.attrs;
  this.style = {};
  var styleArr = (node.attrs.style || '').split(';');
  for (let i = 0; i < styleArr.length; i++)
    if (styleArr[i].includes(':')) {
      var info = styleArr[i].split(':');
      this.style[info[0]] = info[1];
    }
  this._path = path;
  this._context = context;
  this._dirty = false;
}
// 获取 / 设置 文本v
element.prototype.__defineGetter__('innerText', function () {
  return this._context.getText([this._node]);
})
element.prototype.__defineSetter__('innerText', function (text) {
  this._node.children = [{
    type: 'text',
    text
  }];
  this.childNodes = [];
  this._setData();
})
// 获取 / 设置 html
element.prototype.__defineGetter__('outerHTML', function () {
  return (function f(node) {
    var html = '';
    if (node.type == 'text')
      html += node.text;
    else {
      html += '<' + node.name;
      for (var attr in node.attrs)
        if (node.attrs[attr])
          html += ` ${attr}="${node.attrs[attr]}"`;
      if (!node.children || !node.children.length) html += '/>';
      else {
        html += '>';
        for (var i = 0; i < node.children.length; i++)
          html += f(node.children[i]);
        html += '</' + node.name + '>';
      }
    }
    return html;
  })(this._node);
})
element.prototype.__defineGetter__('innerHTML', function () {
  var outerHTML = this.outerHTML;
  return outerHTML.substring(outerHTML.indexOf('>') + 1, outerHTML.lastIndexOf('<'));
})
element.prototype.__defineSetter__('innerHTML', function (value) {
  this._node.children = new MpHtmlParser(value, this._context.data).parse();
  for (var i = 0; i < this._node.children.length; i++)
    if (this._node.children[i].name)
      this.childNodes.push(new element(this._node.children[i], `${this._path}.children[${i}]`, this._context));
  this._setData();
})
// 添加 / 删除 / 替换 节点
element.prototype.appendChild = function (child) {
  if (child.constructor != element) return false;
  this.childNodes.push(child);
  this._node.children.push(child._node);
  child.path = `${this._path}.children[${this._node.children.length - 1}]`;
  this._setData();
  return true;
}
element.prototype.removeChild = function (child) {
  if (child.constructor != element) return false;
  var i = this.childNodes.indexOf(child);
  if (i == -1) return false;
  this.childNodes.splice(i, 1);
  this._node.children.splice(i, 1);
  this._setData();
  return true;
}
element.prototype.replaceChild = function (newVal, oldVal) {
  if (oldVal.constructor != element) return false;
  if (newVal.constructor != element) return false;
  var i = this.childNodes.indexOf(oldVal);
  if (i == -1) return false;
  this.childNodes[i] = newVal;
  this._node.children[i] = newVal._node;
  newVal.path = `${this._path}.children[${i}]`;
  this._setData();
  return true;
}
// 获取 / 设置 某个属性
element.prototype.getAttribute = function (key) {
  if (Object.hasOwnProperty.call(this._node.attrs, key))
    return this._node.attrs[key];
  else return null;
}
element.prototype.setAttribute = function (key, value) {
  this._node.attrs[key] = value;
  this._setData();
  return true;
}
// 获取某个样式
element.prototype.getStyle = function (key) {
  key = key.replace(/(A-Z)/g, '-$1').toLowerCase();
  if (Object.hasOwnProperty.call(this.style, key)) return this.style[key];
  else return null;
}
// 设置某个样式
element.prototype.setStyle = function (key, value) {
  key = key.replace(/(A-Z)/g, '-$1').toLowerCase();
  if (Object.hasOwnProperty.call(this.style, key)) {
    this.style[key] = value;
    var style = '';
    for (var item in this.style)
      style += item + ':' + this.style[item] + ';';
    this._node.attrs.style = style;
  } else this._node.attrs.style = `${this._node.attrs.style || ''};${key}:${value}`;
  this._setData();
  return true;
}
// 查找节点
element.prototype._search = function (node, path, search, type) {
  if (node.type == 'text') return;
  if (type == 'id' && node.attrs && node.attrs.id == search)
    return this._nodeList.push(new element(node, path, this._context));
  if ((type == 'name' && node.name == search) || (type == 'class' && node.attrs && node.attrs.class == search))
    this._nodeList.push(new element(node, path, this._context));
  if (node.children && node.children.length)
    for (var i = node.children.length; i--;)
      this._search(node.children[i], `${path}.children[${i}]`, search, type);
}
element.prototype.getElementById = function (id) {
  this._nodeList = [];
  this._search(this._node, this._path, id, 'id');
  return this._nodeList[0];
}
element.prototype.getElementsByClassName = function (className) {
  this._nodeList = [];
  this._search(this._node, this._path, className, 'class');
  return this._nodeList;
}
element.prototype.getElementsByTagName = function (name) {
  this._nodeList = [];
  this._search(this._node, this._path, name, 'name');
  return this._nodeList;
}
// 更新视图
element.prototype._setData = function () {
  if (!this._path) return;
  this._dirty = true;
  setTimeout(() => {
    if (this._dirty) {
      this._context._refresh = true;
      this._context.setData({
        [this._path]: this._node
      })
      this._dirty = false;
    }
  }, 0)
}

function dom(context) {
  this._path = 'nodes';
  this._context = context;
}
dom.prototype._search = function (nodes, path, search, type) {
  for (var i = 0, node; node = (nodes || [])[i]; i++) {
    if (node.type == 'text') continue;
    if (type == 'id' && node.attrs && node.attrs.id == search)
      return this._nodeList.push(new element(node, `${path}[${i}]`, this._context));
    if ((type == 'name' && node.name == search) || (type == 'class' && node.attrs && node.attrs.class == search))
      this._nodeList.push(new element(node, `${path}[${i}]`, this._context));
    this._search(node.children, `${path}[${i}].children`, search, type);
  }
}
dom.prototype.__defineGetter__('body', function () {
  return new element({
    name: 'body',
    children: this._context.data.nodes
  }, 'nodes', this._context)
})
dom.prototype.getElementById = function (id) {
  this._nodeList = [];
  this._search(this._context.data.nodes, 'nodes', id, 'id');
  return this._nodeList[0];
}
dom.prototype.getElementsByClassName = function (className) {
  this._nodeList = [];
  this._search(this._context.data.nodes, 'nodes', className, 'class');
  return this._nodeList;
}
dom.prototype.getElementsByTagName = function (name) {
  this._nodeList = [];
  this._search(this._context.data.nodes, 'nodes', name, 'name');
  return this._nodeList;
}
dom.prototype.createElement = function (name) {
  return new element({
    name
  }, '', this._context);
}
dom.prototype.write = function (value) {
  this._context.setContent(value);
  return true;
}
module.exports = dom;