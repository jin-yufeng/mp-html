/**
 * @fileoverview 插件入口文件模板
 */

const data = {} // 全局数据

/**
 * @description 组件被创建时将实例化插件
 * @param {Component} vm 组件实例
 */
function Plugin (vm) {
  this.vm = vm // 保存实例在其他周期使用
  this.compData = {} // 仅在单个组件中使用的数据
  data.xxx = 'xxx' // 记录全局数据
}

/**
 * @description html 数据更新时触发
 * @param {string} content 要更新的 html 字符串
 * @param {object} config 解析配置
 * @returns {string|void} 如果要对 html 字符串进行一些预处理，则返回处理后的字符串
 */
Plugin.prototype.onUpdate = function (content, config) {
  config.ignoreTags.xxx = true // 移除 xxx 标签
  // 对 html 内容进行预处理并返回修改，没有修改则不需要返回
  return content
}

/**
 * @description 解析到一个标签时触发
 * @param {object} node 标签
 * @param {object} parser 解析器实例
 * @returns {boolean|void} 如果返回 false 将移除该标签
 */
Plugin.prototype.onParse = function (node, parser) {
  // 处理文本标签
  if (node.type === 'text') {
    // node.text 文本内容
  } else {
    // 处理元素标签
    // node.name 标签名
    // node.attrs 属性列表
    // node.children 子节点（非自闭合标签有）

    if (node.name === 'xxx') {
      parser.expose() // 如果该标签不能被 rich-text 包含，需要调用此方法暴露出来
      // parser.options 组件传入的一些解析属性
      // parser.stack 可以从栈中获取祖先节点
    }
  }
}

/**
 * @description dom 树加载完毕时触发（load 事件）
 */
Plugin.prototype.onLoad = function () {
  // 可以获取媒体 context 对象等
}

/**
 * @description 组件被移除时触发
 */
Plugin.prototype.onDetached = function () {
  // 可以释放一些必要的资源（计时器等）
}

module.exports = Plugin
