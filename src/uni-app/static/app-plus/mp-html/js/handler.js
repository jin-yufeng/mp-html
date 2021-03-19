// 等待初始化完毕
document.addEventListener('UniAppJSBridgeReady', () => {
  document.body.onclick = () =>
    uni.postMessage({
      data: {
        action: 'onClick'
      }
    })
  uni.postMessage({
    data: {
      action: 'onJSBridgeReady'
    }
  })
})

var options, medias = []

/**
 * @description 获取标签的所有属性
 * @param {Element} ele 
 */
function getAttrs(ele) {
  var attrs = Object.create(null)
  for (var i = ele.attributes.length; i--;)
    attrs[ele.attributes[i].name] = ele.attributes[i].value
  return attrs
}

/**
 * @description 图片加载出错
 */
function onImgError() {
  if (options[1]) {
    this.src = options[1]
    this.onerror = null
  }
  // 取消监听点击
  this.onclick = null
  this.ontouchstart = null
  uni.postMessage({
    data: {
      action: 'onError',
      source: 'img',
      attrs: getAttrs(this)
    }
  })
}

/**
 * @description 创建 dom 结构
 * @param {object[]} nodes 节点数组
 * @param {Element} parent 父节点
 * @param {string} namespace 命名空间
 */
function createDom(nodes, parent, namespace) {
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i], ele
    if (!node.type || node.type == 'node') {
      let name = node.name
      // svg 需要设置 namespace
      if (name == 'svg')
        namespace = 'http://www.w3.org/2000/svg'
      if (name == 'html' || name == 'body')
        name = 'div'
      // 创建标签
      if (!namespace)
        ele = document.createElement(name)
      else
        ele = document.createElementNS(namespace, name)
      // 设置属性
      for (let item in node.attrs)
        ele.setAttribute(item, node.attrs[item])
      // 递归创建子节点
      if (node.children)
        createDom(node.children, ele, namespace)

      // 处理图片
      if (name == 'img') {
        if (!ele.src && ele.getAttribute('data-src'))
          ele.src = ele.getAttribute('data-src')
        if (!node.attrs.ignore) {
          // 监听图片点击事件
          ele.onclick = function (e) {
            e.stopPropagation()
            uni.postMessage({
              data: {
                action: 'onImgTap',
                attrs: getAttrs(this)
              }
            })
          }
        }
        if (options[2]) {
          var image = new Image()
          image.src = ele.src
          ele.src = options[2]
          image.onload = function () {
            ele.src = this.src
          }
          image.onerror = function () {
            ele.onerror()
          }
        }
        ele.onerror = onImgError
      }

      // 处理链接
      else if (name == 'a') {
        ele.addEventListener('click', function (e) {
          e.stopPropagation()
          e.preventDefault() // 阻止默认跳转
          let href = this.getAttribute('href'),
            offset
          if (href && href[0] == '#')
            offset = (document.getElementById(href.substr(1)) || {}).offsetTop
          uni.postMessage({
            data: {
              action: 'onLinkTap',
              attrs: getAttrs(this),
              offset
            }
          })
        }, true)
      }

      // 处理音视频
      else if (name == 'video' || name == 'audio') {
        medias.push(ele)
        if (!node.attrs.autoplay) {
          if (!node.attrs.controls)
            ele.setAttribute('controls', 'true')
          // 空白图占位
          if (!node.attrs.poster)
            ele.setAttribute('poster', "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>")
        }
        if (options[3])
          ele.onplay = function () {
            for (let i = 0; i < medias.length; i++)
              if (medias[i] != this)
                medias[i].pause()
          }
        ele.onerror = function () {
          uni.postMessage({
            data: {
              action: 'onError',
              source: name,
              attrs: getAttrs(this)
            }
          })
        }
      }

      // 处理表格
      else if (name == 'table' && options[4] && !ele.style.cssText.includes('inline')) {
        let div = document.createElement('div')
        div.style.overflow = 'auto'
        div.appendChild(ele)
        ele = div
      }

      else if (name == 'svg')
        namespace = void 0
    } else
      ele = document.createTextNode(node.text.replace(/&amp;/g, '&'))
    parent.appendChild(ele)
  }
}

// 设置 html 内容
window.setContent = function (nodes, opts, append) {
  var ele = document.getElementById('content')

  // 容器样式
  if (opts[0])
    document.body.style.cssText = opts[0]

  // 长按复制
  if (!opts[5])
    ele.style.userSelect = 'none'

  if (!append) {
    ele.innerHTML = '' // 不追加则先清空
    medias = []
  }

  options = opts

  var fragment = document.createDocumentFragment()
  createDom(nodes, fragment)
  ele.appendChild(fragment)

  // 触发事件
  var height = ele.scrollHeight
  uni.postMessage({
    data: {
      action: 'onLoad',
      height
    }
  })

  clearInterval(window.timer)
  var ready = false
  window.timer = setInterval(() => {
    if (ele.scrollHeight != height) {
      height = ele.scrollHeight
      uni.postMessage({
        data: {
          action: 'onHeightChange',
          height: height
        }
      })
    } else if (!ready) {
      ready = true
      uni.postMessage({
        data: {
          action: 'onReady'
        }
      })
    }
  }, 350)
}

// 回收计时器
window.onunload = function () {
  clearInterval(window.timer)
}
