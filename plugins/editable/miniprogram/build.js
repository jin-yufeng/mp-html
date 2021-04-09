const path = require('path')
/* global getTop */
module.exports = {
  style: `/* #ifndef MP-ALIPAY */
  ._address,
  ._article,
  ._aside,
  ._body,
  ._caption,
  ._center,
  ._cite,
  ._footer,
  ._header,
  ._html,
  ._nav,
  ._pre,
  ._section {
    display: block;
  }
  
  /* #endif */`,
  methods: {
    /**
     * @description 开始编辑文本
     * @param {Event} e 
     */
    editStart(e) {
      if (this.properties.opts[4]) {
        var i = e.currentTarget.dataset.i
        if (!this.data.ctrl['e' + i]) {
          // 显示虚线框
          this.setData({
            ['ctrl.e' + i]: 1
          })
          // 点击其他地方则取消虚线框
          setTimeout(() => {
            this.root._mask.push(() => {
              this.setData({
                ['ctrl.e' + i]: 0
              })
            })
          }, 50)
          this.root._edit = this
          this.i = i
          this.cursor = this.getNode(i).text.length
        } else {
          this.root._mask.pop()
          this.root._maskTap()
          // 将 text 转为 textarea
          this.setData({
            ['ctrl.e' + i]: 2
          })
          // 延时对焦，避免高度错误
          setTimeout(() => {
            this.setData({
              ['ctrl.e' + i]: 3
            })
          }, 50)
        }
      }
    },
    /**
     * @description 输入文本
     * @param {Event} e 
     */
    editInput(e) {
      var i = e.target.dataset.i,
        // 替换连续空格
        value = e.detail.value.replace(/ {2,}/, $ => {
          var res = '\xa0'
          for (var i = 1; i < $.length; i++)
            res += '\xa0'
          return res
        })
      this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].text', this.getNode(i).text, value) // 记录编辑历史
      this.cursor = e.detail.cursor
    },
    /**
     * @description 完成编辑文本
     * @param {Event} e 
     */
    editEnd(e) {
      var i = e.target.dataset.i
      // 更新到视图
      this.root.setData({
        ['nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].text']: e.detail.value
      })
      this.setData({
        ['ctrl.e' + i]: 0
      })
    },
    /**
     * @description 插入一个标签
     * @param {Object} node 要插入的标签
     */
    insert(node) {
      setTimeout(() => {
        var arr = this.i.split('_'),
          i = parseInt(arr.pop()),
          path = arr.join('_'),
          children = path ? this.getNode(path).children : this.properties.childs,
          childs = children.slice(0)
        if (!childs[i])
          childs.push(node)
        // 在文本中插入
        else if (childs[i].text) {
          var text = childs[i].text,
            list = []
          if (this.cursor)
            list.push({
              type: 'text',
              text: text.substring(0, this.cursor)
            })
          list.push(node)
          if (this.cursor < text.length)
            list.push({
              type: 'text',
              text: text.substring(this.cursor)
            })
          childs.splice(i, 1, ...list)
        } else
          childs.splice(i + 1, 0, node)
        path = this.properties.opts[6] + path
        if (path[path.length - 1] == '_')
          path = path.slice(0, -1)
        this.root._editVal('nodes' + (path ? '[' + path.replace(/_/g, '].children[') + '].children' : ''), children, childs, true)
      }, 200)
    },
    /**
     * @description 移除第 i 个标签
     * @param {Number} i 
     */
    remove(i) {
      var arr = i.split('_'),
        j = arr.pop(),
        path = arr.join('_'),
        children = path ? this.getNode(path).children : this.properties.childs,
        childs = children.slice(0)
      childs.splice(j, 1)
      this.root._edit = void 0
      this.root._maskTap()
      path = this.properties.opts[6] + path
      if (path[path.length - 1] == '_')
        path = path.slice(0, -1)
      this.root._editVal('nodes' + (path ? '[' + path.replace(/_/g, '].children[') + '].children' : ''), children, childs, true)
    },
    /**
     * @description 标签被点击
     * @param {Event} e 
     */
    nodeTap(e) {
      if (this.properties.opts[4]) {
        if (this.root._lock)
          return
        // 阻止上层出现点击态
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
        var i = e.currentTarget.dataset.i,
          node = this.getNode(i)
        if (this.data.ctrl['e' + this.i] == 3)
          return
        this.root._maskTap()
        // 显示实线框
        this.setData({
          ['ctrl.e' + i]: 1
        })
        this.root._mask.push(() => {
          this.setData({
            ['ctrl.e' + i]: 0
          })
        })
        this.root._edit = this
        if (node.children.length == 1 && node.children[0].type == 'text') {
          var ii = i + '_0'
          if (!this.data.ctrl['e' + ii]) {
            this.setData({
              ['ctrl.e' + ii]: 1
            })
            this.root._mask.push(() => {
              this.setData({
                ['ctrl.e' + ii]: 0
              })
            })
            this.cursor = node.children[0].text.length
          }
          this.i = ii
        } else if (!(this.i || '').includes(i))
          this.i = i + '_'
        var items = this.root._getItem(node)
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] == '大小') {
              // 改变字体大小
              let style = node.attrs.style || '',
                value = style.match(/;font-size:([0-9]+)px/)
              if (value)
                value = parseInt(value[1])
              else
                value = 16
              this.root._slider({
                min: 10,
                max: 30,
                value,
                top: getTop(e),
                changing: val => {
                  if (Math.abs(val - value) > 2) {
                    // 字号变换超过 2 时更新到视图
                    this.changeStyle('font-size', i, val + 'px', value + 'px')
                    value = e.detail.value
                  }
                },
                change: val => {
                  if (val != value)
                    this.changeStyle('font-size', i, val + 'px', value + 'px')
                  this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.style', style, this.getNode(i).attrs.style)
                }
              })
            } else if (items[tapIndex] == '删除')
              this.remove(i)
            else {
              let style = node.attrs.style || '',
                newStyle = '',
                item = items[tapIndex], name, value
              if (item == '斜体') {
                name = 'font-style'
                value = 'italic'
              } else if (item == '粗体') {
                name = 'font-weight'
                value = 'bold'
              } else if (item == '下划线') {
                name = 'text-decoration'
                value = 'underline'
              } else if (item == '居中') {
                name = 'text-align'
                value = 'center'
              } else if (item == '缩进') {
                name = 'text-indent'
                value = '2em'
              }
              // 已有则取消
              if (style.includes(name + ':'))
                newStyle = style.replace(new RegExp(name + ':[^;]+'), '')
              // 没有则添加
              else
                newStyle = style + ';' + name + ':' + value
              this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.style', style, newStyle, true)
            }
          }
        })
      }
    },
    /**
     * @description 音视频被点击
     * @param {Event} e 
     */
    mediaTap(e) {
      if (this.properties.opts[4]) {
        var i = e.target.dataset.i,
          node = this.getNode(i),
          items = this.root._getItem(node)
        this.root._edit = this
        this.i = i
        this.root._tooltip({
          top: e.target.offsetTop - 30,
          items,
          success: tapIndex => {
            // 设置封面
            if (items[tapIndex] == '封面')
              this.root.getSrc('img', node.attrs.poster).then(url => {
                this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.poster', node.attrs.poster, url, true)
              }).catch(() => { })
            else if (items[tapIndex] == '删除')
              this.remove(i)
            // 切换循环播放
            else {
              this.root.setData({
                ['nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.loop']: !node.attrs.loop
              })
              wx.showToast({
                title: '成功'
              })
            }
          }
        })
        // 避免上层出现点击态
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
      }
    },
    /**
     * 改变样式
     * @param {String} name 属性名
     * @param {Number} i 第几个标签
     * @param {String} value 新值
     * @param {String} oldVal 旧值
     */
    changeStyle(name, i, value, oldVal) {
      var style = this.getNode(i).attrs.style || ''
      // style 中已经有
      if (style.includes(';' + name + ':' + oldVal))
        style = style.replace(';' + name + ':' + oldVal, ';' + name + ':' + value)
      // 没有则新增
      else
        style += ';' + name + ':' + value
      this.root.setData({
        ['nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.style']: style
      })
    }
  },
  handler(file) {
    if (file.isBuffer()) {
      var content = file.contents.toString()
      if (file.path.includes('miniprogram' + path.sep + 'index.wxml')) {
        // 传递 editable 属性和路径
        content = content.replace(/opts\s*=\s*"{{\[([^\]]+)\]}}"/, 'opts="{{[$1,editable,placeholder,\'\']}}"')
          .replace(/<view(.*?)style\s*=\s*"{{containerStyle}}"/, '<view$1style="{{editable?\'position:relative;min-height:200px;\':\'\'}}{{containerStyle}}" bindtap="_containTap"')
          // 工具弹窗
          .replace('</view>', `<view wx:if="{{tooltip}}" class="_tooltip_contain" style="top:{{tooltip.top}}px">
  <view class="_tooltip">
    <view wx:for="{{tooltip.items}}" wx:key="index" class="_tooltip_item" data-i="{{index}}" bindtap="_tooltipTap">{{item}}</view>
  </view>
</view>
<view wx:if="{{slider}}" class="_slider" style="top:{{slider.top}}px">
  <slider value="{{slider.value}}" min="{{slider.min}}" max="{{slider.max}}" block-size="14" show-value activeColor="white" mp-alipay:style="padding:10px" bindchanging="_sliderChanging" bindchange="_sliderChange" />
</view>
</view>`)
      }
      else if (file.path.includes('miniprogram' + path.sep + 'index.js')) {
        // 添加 editable 属性，发生变化时重新解析
        content = content.replace(/properties\s*:\s*{/, `properties: {
  editable: {
    type: Boolean,
    observer(val) {
      if (this.properties.content)
        this.setContent(val?this.properties.content:this.getContent())
      else if(val)
        this.setData({
          nodes: [{
            name: 'p',
            attrs: {},
            children: [{
              type: 'text',
              text: ''
            }]
          }]
        })
      if (!val)
        this._maskTap()
    }
  },
  placeholder: String,`)
          .replace(/didUpdate\(e\)\s*{/, `didUpdate(e) {
  if (e.editable!=this.properties.editable) {
    var val = this.properties.editable
    if (this.properties.content)
      this.setContent(val?this.properties.content:this.getContent())
    else if(val)
      this.setData({
        nodes: [{
          name: 'p',
          attrs: {},
          children: [{
            type: 'text',
            text: ''
          }]
        }]
      })
    if (!val)
      this._maskTap()
  }`)
          // 处理各类弹窗的事件
          .replace(/methods\s*:\s*{/, `methods: {
  _containTap() {
    if (!this._lock && !this.data.slider) {
      this._edit = void 0
      this._maskTap()
    }
  },
  _tooltipTap(e) {
    this._tooltipcb(e.currentTarget.dataset.i)
    this.setData({
      tooltip: null
    })
  },
  _sliderChanging(e) {
    this._slideringcb(e.detail.value)
  },
  _sliderChange(e) {
    this._slidercb(e.detail.value)
  },`)
      }
      else if (file.path.includes('miniprogram' + path.sep + 'index.wxss')) {
        // 工具弹窗的样式
        content += `/* 提示条 */
._tooltip_contain {
  position: absolute;
  width: 100vw;
  text-align: center;
}

._tooltip {
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 0 3px;
  font-size: 14px;
  line-height: 30px;
}

._tooltip_item {
  display: inline-block;
  width: auto;
  padding: 0 2vw;
  line-height: 30px;
  background-color: black;
  color: white;
}

/* 图片宽度滚动条 */
._slider {
  position: absolute;
  left: 20px;
  width: 220px;
}

._tooltip,
._slider {
  background-color: black;
  border-radius: 3px;
  opacity: 0.75;
}`
      }
      else if (file.path.includes('parser.js')) {
        content = content.replace(/popNode\s*=\s*function\s*\(\)\s*{/, "popNode=function(){var editable=this.options.editable")
          // 不转换标签名
          .replace(/if\s*\(config.blockTags\[node.name\]\)\s*node.name\s*=\s*'div'/, "if(config.blockTags[node.name]){if(!editable)node.name='div'}")
          // 转换表格和列表
          .replace(/node.c(\)|\s*&&|\s*\n)/g, '(node.c||editable)$1')
          .replace(/while\s*\(map\[row\s*\+\s*'.'\s*\+\s*col\]\)\s*col\+\+/, "while(map[row+'.'+col])col++;if(editable)td.r=row")
          // 不做 expose 处理
          .replace(/parser.prototype.expose\s*=\s*function\s*\(\)\s*{/, 'parser.prototype.expose=function(){if(this.options.editable)return')
      }
      else if (file.path.includes('node.wxml')) {
        content = content.replace(/opts\s*=\s*"{{opts}}"/, 'opts="{{[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+i+\'_\']}}"')
          .replace(/opts\s*=\s*"{{opts}}"/, 'opts="{{[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+i1+\'_\'+i2+\'_\'+i3+\'_\'+i4+\'_\'+i5+\'_\']}}"')
          .replace(/!(n.*)\.c/g, '(opts[4]?!$1.children||$1.name==\'a\':!$1.c)')
          .replace(/use\((n.)\)/g, 'opts[4]?!$1.children||$1.name==\'a\':use($1)')
          // 修改普通标签
          .replace(/<view\s*wx:else\s*id(.+?)style="/, '<view wx:else data-i="{{path+i}}" bindtap="nodeTap" id$1style="{{ctrl[\'e\'+path+i]?\'border:1px solid black;padding:5px;display:block;\':\'\'}}')
          .replace(/<view\s*wx:else\s*id(.+?)style="/, '<view wx:else data-i="{{\'\'+i1}}" bindtap="nodeTap" id$1style="{{ctrl[\'e\'+i1]?\'border:1px solid black;padding:5px;display:block;\':\'\'}}')
          .replace(/<view\s*wx:else\s*id(.+?)style="/, '<view wx:else data-i="{{i1+\'_\'+i2}}" bindtap="nodeTap" id$1style="{{ctrl[\'e\'+i1+\'_\'+i2]?\'border:1px solid black;padding:5px;display:block;\':\'\'}}')
          .replace(/<view\s*wx:else\s*id(.+?)style="/, '<view wx:else data-i="{{i1+\'_\'+i2+\'_\'+i3}}" bindtap="nodeTap" id$1style="{{ctrl[\'e\'+i1+\'_\'+i2+\'_\'+i3]?\'border:1px solid black;padding:5px;display:block;\':\'\'}}')
          .replace(/<view\s*wx:else\s*id(.+?)style="/, '<view wx:else data-i="{{i1+\'_\'+i2+\'_\'+i3+\'_\'+i4}}" bindtap="nodeTap" id$1style="{{ctrl[\'e\'+i1+\'_\'+i2+\'_\'+i3+\'_\'+i4]?\'border:1px solid black;padding:5px;display:block;\':\'\'}}')
          // 修改文本块
          .replace(/<!--\s*文本\s*-->[\s\S]+?<!--\s*链接\s*-->/,
            `<block wx:elif="{{n.type=='text'}}">
  <text wx:if="{{!ctrl['e'+i]}}" data-i="{{i}}" decode="{{!opts[4]}}" bindtap="editStart">{{n.text}}
    <text wx:if="{{!n.text}}" style="color:gray">{{opts[5]||'请输入'}}</text>
  </text>
  <text wx:elif="{{ctrl['e'+i]==1}}" data-i="{{i}}" style="border:1px dashed black;min-width:50px;width:auto;padding:5px;display:block" catchtap="editStart">{{n.text}}
    <text wx:if="{{!n.text}}" style="color:gray">{{opts[5]||'请输入'}}</text>
  </text>
  <textarea wx:else style="border:1px dashed black;min-width:50px;width:auto;padding:5px" auto-height maxlength="-1" focus="{{ctrl['e'+i]==3}}" value="{{n.text}}" data-i="{{i}}" bindinput="editInput" bindblur="editEnd" />
</block>
<text wx:elif="{{n.name=='br'}}">\\n</text>`)
          // 修改图片
          .replace(/<image(.+?)id="\{\{n.attrs.id/, '<image$1id="{{n.attrs.id||(\'n\'+i)')
          .replace('height:1px', "height:{{ctrl['h'+i]||1}}px")
          .replace('style="{{ctrl[i]', 'style="{{ctrl[\'e\'+i]?\'border:1px dashed black;padding:3px;\':\'\'}}{{ctrl[i]')
          .replace(/weixin:show-menu-by-longpress\s*=\s*"{{(\S+?)}}"\s*baidu:image-menu-prevent\s*=\s*"{{(\S+?)}}"/, 'weixin:show-menu-by-longpress="{{!opts[4]&&$1}}" baidu:image-menu-prevent="{{opts[4]||$2}}"')
          // 修改音视频
          .replace('<video', '<video bindtap="mediaTap"')
          .replace('audio ', 'audio bindtap="mediaTap" ')
      } else if (file.path.includes('node.js') && file.extname == '.js') {
        content = `function getTop(e) {
  var top
  // #ifndef MP-ALIPAY
  top = e.detail.y
  // #endif
  // #ifdef MP-ALIPAY
  top = top = e.detail.pageY
  // #endif
  if (top - e.currentTarget.offsetTop < 150)
    top = e.currentTarget.offsetTop
  if (top < 30)
    top += 70
  return top - 30
}` + content.replace('methods:', 'detached() {if(this.root&&this.root._edit==this)this.root._edit=void 0},methods:')
            // 记录图片宽度
            .replace(/imgLoad\s*\(e\)\s*{/, `imgLoad(e) {
  // #ifdef MP-WEIXIN || MP-QQ
  if (this.properties.opts[4])
    setTimeout(() => {
      var id = this.getNode(i).attrs.id || ('n' + i)
      wx.createSelectorQuery().in(this).select('#' + id).boundingClientRect().exec(res => {
        this.setData({
          ['ctrl.h'+i]: res[0].height
        })
      })
    }, 50)
  // #endif`)
            .replace(/if\s*\(!node.w\)\s*val\s*=\s*e.detail.width/,
              `if (!node.w) {
  val = e.detail.width
  if (this.properties.opts[4]) {
    var data = {},
      path = 'nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.'
    if (val < 150)
      data[path + 'ignore'] = 'T'
    data[path + 'width'] = val.toString()
    this.root.setData(data)
  }
}`)
            // 处理图片点击
            .replace(/imgTap\s*\(e\)\s*{([\s\S]+?)},\s*\/\*/,
              `imgTap (e) {
  if (!this.properties.opts[4]) {$1}
  else {
    var i = e.target.dataset.i,
      node = this.getNode(i),
      items = this.root._getItem(node)
    this.root._edit = this
    this.i = i
    this.root._maskTap()
    this.setData({
      ['ctrl.e' + i]: 1
    })
    this.root._mask.push(() => {
      this.setData({
        ['ctrl.e' + i]: 0
      })
    })
    this.root._tooltip({
      top: getTop(e),
      items,
      success: tapIndex => {
        // 换图
        if (items[tapIndex] == '换图')
          this.root.getSrc('img', node.attrs.src).then(src => {
            this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.src', node.attrs.src, src, true)
          }).catch(() => { })
        // 更改宽度
        else if (items[tapIndex] == '宽度') {
          var style = node.attrs.style || '',
            value = style.match(/max-width:([0-9]+)%/)
          if (value)
            value = parseInt(value[1])
          else
            value = 100
          this.root._slider({
            min: 0,
            max: 100,
            value,
            top: getTop(e),
            changing: val => {
              // 变化超过 5% 更新时视图
              if (Math.abs(val - value) > 5) {
                this.changeStyle('max-width', i, val + '%', value + '%')
                value = val
              }
            },
            change: val => {
              if (val != value) {
                this.changeStyle('max-width', i, val + '%', value + '%')
                value = val
              }
              this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.style', style, this.getNode(i).attrs.style)
            }
          })
        }
        // 将图片设置为链接
        else if (items[tapIndex] == '超链接')
          this.root.getSrc('link').then(url => {
            this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + ']', node, {
              name: 'a',
              attrs: {
                href: url
              },
              children: [node]
            }, true)
            wx.showToast({
              title: '成功'
            })
          }).catch(() => { })
        // 设置预览图链接
        else if (items[tapIndex] == '预览图')
          this.root.getSrc('img', node.attrs['original-src']).then(url => {
            this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.original-src', node.attrs['original-src'], url, true)
            wx.showToast({
              title: '成功'
            })
          }).catch(() => { })
        else if (items[tapIndex] == '删除')
          this.remove(i)
        // 禁用 / 启用预览
        else {
          this.root.setData({
            ['nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.ignore']: !node.attrs.ignore
          })
          wx.showToast({
            title: '成功'
          })
        }
      }
    })
    this.root._lock = true
    setTimeout(() => {
      this.root._lock = false
    }, 50)
  }
},
/*`)
            // 处理链接点击
            .replace(/linkTap\s*\(e\)\s*{([\s\S]+?)},\s*\/\*/,
              `linkTap (e) {
  if (!this.properties.opts[4]) {$1}
  else  {
    var i = e.currentTarget.dataset.i,
      node = this.getNode(i),
      items = this.root._getItem(node)
    this.root._tooltip({
      top: getTop(e),
      items,
      success: tapIndex => {
        if (items[tapIndex] == '更换链接')
          this.root.getSrc('link', node.attrs.href).then(url => {
            this.root._editVal('nodes[' + (this.properties.opts[6] + i).replace(/_/g, '].children[') + '].attrs.href', node.attrs.href, url, true)
            wx.showToast({
              title: '成功'
            })
          }).catch(() => { })
        else
          this.remove(i)
      }
    })
  }
},
/*`)
      }
      file.contents = Buffer.from(content)
    }
  }
}
