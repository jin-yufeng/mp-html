/*
  document补丁包
  github地址：https://github.com/jin-yufeng/Parser
  文档地址：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
const _setData = function(Component, key, value) {
  Component._refresh = true;
  Component.setData({
    [key]: value
  })
}
const _search = function(nodes, id, site, Component) {
  if (!nodes || !nodes.length) return null;
  for (var i = nodes.length; i--;) {
    if (nodes[i].type == "text") continue;
    site += '[' + i + ']';
    if (nodes[i].attrs && nodes[i].attrs.id == id)
      return new element(nodes[i], site, Component);
    else {
      site += ".children";
      var find = _search(nodes[i].children, id, site, Component);
      if (find != null) return find;
      site = site.substring(0, site.length - 9);
    }
    site = site.substring(0, site.length - ('[' + i + ']').length);
  }
  return null;
}
class element {
  constructor(nodes, site, Component) {
    this.id = (nodes.type == "text" ? "" : nodes.attrs.id);
    this.nodes = nodes;
    this.styles = {};
    var styleArr = (nodes.attrs.style || '').split(';');
    for (var i = styleArr.length; i--;)
      if (styleArr[i].includes(':')) {
        var info = styleArr[i].split(':');
        this.styles[info[0]] = info[1];
      }
    this._site = site;
    this._Component = Component;
    this.nodes.attrs = this.nodes.attrs || {};
    this.nodes.children = this.nodes.children || [];
    if (nodes.children[0].type == "text")
      this._text = true;
  }
  // 设置文本，设置成功返回 true
  setText(text) {
    if (this._text && typeof text == "string") {
      this.nodes.children[0].text = text;
      _setData(this._Component, this._site, this.nodes);
      return true;
    }
    return false;
  }
  // 获取文本
  getText() {
    if (this._text) return this.nodes.children[0].text;
    else return null;
  }
  // 增加子节点
  addChildren(nodes, i) {
    if (typeof nodes == "object" && i >= 0 && i <= this.nodes.children.length) {
      this.nodes.children.splice(i, 0, nodes);
      _setData(this._Component, this._site, this.nodes);
      return true;
    }
    return false;
  }
  // 移除第 i 个子节点
  removeChildren(i) {
    if (i >= 0 && i < this.nodes.children.length) {
      this.nodes.children.splice(i, 1);
      _setData(this._Component, this._site, this.nodes);
      return true;
    }
    return false;
  }
  // 获取第 i 个子节点
  getChildren(i) {
    if (i >= 0 && i < this.nodes.children.length)
      return new element(this.nodes.childrens[i], this._site + ".children[" + i + ']', this._Component);
    else return null;
  }
  // 获取某个属性
  getAttr(key) {
    if (this.nodes.attrs.hasOwnProperty(key))
      return this.nodes.attrs[key];
    else return null;
  }
  // 设置某个属性
  setAttr(key, value) {
    this.nodes.attrs[key] = value;
    _setData(this._Component, this._site, this.nodes);
    return true;
  }
  // 获取某个样式
  getStyle(key) {
    key = key.replace(/(A-Z)/g, "-$1").toLowerCase();
    if (this.styles.hasOwnProperty(key)) return this.styles[key];
    else return null;
  }
  // 设置某个样式
  setStyle(key, value) {
    if (typeof key == "string") {
      key = key.replace(/(A-Z)/g, "-$1").toLowerCase();
      if (this.styles.hasOwnProperty(key)) {
        this.styles[key] = value;
        var style = '';
        for (var item in this.styles)
          style += item + ':' + this.styles[item] + ';';
        this.nodes.attrs.style = style;
      } else this.nodes.attrs.style = (this.nodes.attrs.style || '') + ';' + key + ':' + value;
      _setData(this._Component, this._site, this.nodes);
    }
    return false;
  }
  // 移除某个属性
  removeAttr(key) {
    this.nodes.attrs[key] = undefined;
    _setData(this._Component, this._site, this.nodes);
    return true;
  }
  // 查找子节点
  getElementById(id) {
    return _search(this.nodes, id, this._site, this._Component);
  }
  // 更新结点
  update() {
    _setData(this._Component, this._site, this.nodes);
    return true;
  }
}
class dom {
  constructor(root, nodes, Component) {
    this._root = root;
    this.nodes = nodes;
    this._Component = Component;
  }
  // 按id查找节点
  getElementById(id) {
    return _search(this.nodes, id, this._root, this._Component);
  }
  getChildren(i) {
    if (i >= 0 && i < (this.nodes.children || []).length)
      return new element(this.nodes.childrens[i], this._root + ".children[" + i + ']', this._Component);
    else return null;
  }
}
module.exports = dom;