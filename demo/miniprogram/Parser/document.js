const _setData = function(Component, key, value) {
  Component.setData({
    [key]: value
  })
}
const _search = function(nodes, id, site, Component) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].type == "text")
      continue;
    site += ("[" + i + "]");
    if (nodes[i].attrs.id == id)
      return new element(nodes[i], site, Component);
    else {
      site += ".children";
      var find = _search(nodes[i].children, id, site, Component);
      if (find != null)
        return find;
      site = site.substring(0, site.length - 9);
    }
    site = site.substring(0, site.length - ("[" + i + "]").length);
  }
  return null;
}
const error1 = {
  ok: false,
  errCode: 1,
  errMsg: "仅允许对文本标签进行修改"
};
const error2 = {
  ok: false,
  errCode: 2,
  errMsg: "错误的类型"
};
const error3 = {
  ok: false,
  errCode: 3,
  errMsg: "传入值超出范围"
}
const error4 = {
  ok: false,
  errCode: 4,
  errMsg: "没有找到对应的标签"
}
class element {
  constructor(nodes, site, Component) {
    this.id = (nodes.type == "text" ? "" : nodes.attrs.id);
    this.nodes = nodes;
    this._site = site;
    this._Component = Component;
    if (nodes.children[0].type == "text")
      this._text = true;
  }
  // 设置文本
  setText(text) {
    if (!this._text)
      return error1;
    if (typeof text != "string")
      return error2;
    this.nodes.children[0].text = text;
    _setData(this._Component, this._site, this.nodes);
    return {
      ok: true
    };
  }
  // 获取文本
  getText() {
    if (!this._text)
      return error1;
    return {
      ok: true,
      data: this.nodes.children[0].text
    };
  }
  /* 增加子节点
   * @param nodes 需要增加的节点数组（格式同rich-text）
   * @param i     加入的位置
   */
  addChildren(nodes, i) {
    if (!nodes || typeof nodes != "object" || typeof i != "number")
      return error2;
    if (i < 0 || i > this.nodes.children.length)
      return error3;
    this.nodes.children.splice(i, 0, nodes);
    _setData(this._Component, this._site, this.nodes);
    return {
      ok: true
    };
  }
  // 移除第i个子节点
  removeChildren(i) {
    if (typeof i != "number")
      return error2;
    if (i < 0 || i >= this.nodes.children.length)
      return error3;
    this.nodes.children.splice(i, 1);
    _setData(this._Component, this._site, this.nodes);
    return {
      ok: true
    };
  }
  // 获取第i个子节点
  getChildren(i) {
    if (typeof i != "number")
      return error2;
    if (i < 0 || i >= this.nodes.children.length)
      return error3;
    return {
      ok: true,
      data: new element(this.nodes.childrens[i], this._site + ".children[" + i + "]", this._Component)
    };
  }
  // 获取某个属性
  getAttr(key) {
    if (typeof key != "string")
      return error2;
    return {
      ok: true,
      data: this.nodes.attrs[key]
    };
  }
  // 设置某个属性
  setAttr(key, value) {
    if (typeof key != "string")
      return error2;
    this.nodes.attrs[key] = value;
    _setData(this._Component, this._site, this.nodes);
    return {
      ok: true
    }
  }
  // 移除某个属性
  removeAttr(key) {
    if (typeof key != "string")
      return error2;
    _setData(this._Component, this._site, this.nodes);
    delete this.nodes.attrs[key];
    return {
      ok: true
    }
  }
  // 查找子节点
  getElementById(id) {
    if (typeof id != "string")
      return error2;
    var find = _search(this.nodes, id, this._site, this._Component);
    if (find != null)
      return {
        ok: true,
        data: find
      };
    else
      return error4;
  }
  /* 更新这个结点
   *  修改了this.nodes后需要调用这个方法同步到UI
   */
  update() {
    _setData(this._Component, this._site, this.nodes);
    return {
      ok: true
    };
  }
}
class document {
  constructor() {
    this._root = '';
    this.nodes = [];
    this._Component = null;
  }
  init(root, nodes, Component) {
    this._root = root;
    this.nodes = nodes;
    this._Component = Component;
  }
  // 按id查找节点
  getElementById(id) {
    if (typeof id != "string")
      return error2;
    var find = _search(this.nodes, id, this._root, this._Component);
    if (find != null)
      return {
        ok: true,
        data: find
      };
    else
      return error4;
  }
  getChildren(i) {
    if (typeof i != number)
      return error2;
    if (i < 0 || i >= this.nodes.children.length)
      return error3;
    return {
      ok: true,
      data: new element(this.nodes.childrens[i], this._root + ".children[" + i + "]", this._Component)
    };
  }
}
module.exports = document;