/* global getTop */
module.exports = {
  style: `/* #ifndef H5 || MP-ALIPAY || APP-PLUS */
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
  
  /* #endif */
  ._video {
    width: 300px;
    height: 225px;
    display: inline-block;
    background-color: black;
	}`,
  methods: {
    /**
     * @description 开始编辑文本
     * @param {Event} e 
     */
    editStart(e) {
      if (this.opts[4]) {
        var i = e.currentTarget.dataset.i
        if (!this.ctrl['e' + i]) {
          // 显示虚线框
          this.$set(this.ctrl, 'e' + i, 1)
          setTimeout(() => {
            this.root._mask.push(() => this.$set(this.ctrl, 'e' + i, 0))
          }, 50)
          this.root._edit = this
          this.i = i
          this.cursor = this.childs[i].text.length
        } else {
          this.root._mask.pop()
          this.root._maskTap()
          // 将 text 转为 
          this.$set(this.ctrl, 'e' + i, 2)
          // 延时对焦，避免高度错误
          setTimeout(() => {
            this.$set(this.ctrl, 'e' + i, 3)
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
      this.root._editVal(`${this.opts[6]}.${i}.text`, this.childs[i].text, value) // 记录编辑历史
      this.cursor = e.detail.cursor
    },
    /**
     * @description 完成编辑文本
     * @param {Event} e 
     */
    editEnd(e) {
      var i = e.target.dataset.i
      this.$set(this.ctrl, 'e' + i, 0)
      // 更新到视图
      this.root._setData(`${this.opts[6]}.${i}.text`, e.detail.value)
    },
    /**
     * @description 插入一个标签
     * @param {Object} node 要插入的标签
     */
    insert(node) {
      setTimeout(() => {
        var childs = this.childs.slice(0)
        if (!childs[this.i])
          childs.push(node)
        // 在文本中插入
        else if (childs[this.i].text) {
          var text = childs[this.i].text,
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
          childs.splice(this.i, 1, ...list)
        } else
          childs.splice(parseInt(this.i) + 1, 0, node)
        this.root._editVal(this.opts[6], this.childs, childs, true)
      }, 200)
    },
    /**
     * @description 移除第 i 个标签
     * @param {Number} i 
     */
    remove(i) {
      var arr = this.childs.slice(0)
      arr.splice(i, 1)
      this.root._edit = void 0
      this.root._maskTap()
      this.root._editVal(this.opts[6], this.childs, arr, true)
    },
    /**
     * @description 标签被点击
     * @param {Event} e 
     */
    nodeTap(e) {
      if (this.opts[4]) {
        if (this.root._lock)
          return
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
        if (this.ctrl['e' + this.i] == 3)
          return
        this.root._maskTap()
        this.root._edit = this
        var start = this.opts[6].lastIndexOf('children.')
        if (start != -1)
          start += 9
        else
          start = 6
        var i = parseInt(this.opts[6].substring(start, this.opts[6].lastIndexOf('.children'))),
          parent = this.$parent
        while (parent && parent.$options.name != 'node')
          parent = parent.$parent
        if (!parent || this.opts[6].length - parent.opts[6].length > 15)
          return
        // 显示实线框
        this.$set(this.ctrl, 'root', 1)
        this.root._mask.push(() => this.$set(this.ctrl, 'root', 0))
        if (this.childs.length == 1 && this.childs[0].type == 'text' && !this.ctrl.e0) {
          this.$set(this.ctrl, 'e0', 1)
          this.root._mask.push(() => this.$set(this.ctrl, 'e0', 0))
          this.i = 0
          this.cursor = this.childs[0].text.length
        }
        var items = this.root._getItem(parent.childs[i])
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] == '大小') {
              // 改变字体大小
              let style = parent.childs[i].attrs.style || '',
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
                    parent.changeStyle('font-size', i, val + 'px', value + 'px')
                    value = e.detail.value
                  }
                },
                change: val => {
                  if (val != value)
                    parent.changeStyle('font-size', i, val + 'px', value + 'px')
                  this.root._editVal(`${parent.opts[6]}.${i}.attrs.style`, style, parent.childs[i].attrs.style)
                }
              })
            } else if (items[tapIndex] == '删除')
              parent.remove(i)
            else {
              let style = parent.childs[i].attrs.style || '',
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
              this.root._editVal(`${parent.opts[6]}.${i}.attrs.style`, style, newStyle, true)
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
      if (this.opts[4]) {
        var i = e.target.dataset.i,
          node = this.childs[i],
          items = this.root._getItem(node)
        this.root._edit = this
        this.i = i
        this.root._tooltip({
          top: e.target.offsetTop,
          items,
          success: tapIndex => {
            // 设置封面
            if (items[tapIndex] == '封面') {
              this.root.getSrc('img', node.attrs.poster).then(url => {
                this.root._editVal(`${this.opts[6]}.${i}.attrs.poster`, node.attrs.poster, url, true)
              }).catch(() => { })
            }
            else if (items[tapIndex] == '删除')
              this.remove(i)
            // 切换循环播放
            else {
              this.root._setData(`${this.opts[6]}.${i}.attrs.loop`, !node.attrs.loop)
              uni.showToast({
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
      var style = this.childs[i].attrs.style || ''
      // style 中已经有
      if (style.includes(';' + name + ':' + oldVal))
        style = style.replace(';' + name + ':' + oldVal, ';' + name + ':' + value)
      // 没有则新增
      else
        style += ';' + name + ':' + value
      this.root._setData(`${this.opts[6]}.${i}.attrs.style`, style)
    }
  },
  handler(file) {
    if (file.isBuffer()) {
      var content = file.contents.toString()
      if (file.path.includes('mp-html.vue')) {
        // 传递 editable 属性和路径
        content = content.replace(/opts\s*=\s*"\[([^\]]+)\]"/, 'opts="[$1,editable,placeholder,\'nodes\']"')
          .replace(/<view(.*?):style\s*=\s*"containerStyle"/, '<view$1:style="(editable?\'position:relative;min-height:200px;\':\'\')+containerStyle" @tap="_containTap"')
          // 工具弹窗
          .replace(/<\/view>\s*<\/template>/, `  <view v-if="tooltip" class="_tooltip_contain" :style="'top:'+tooltip.top+'px'">
      <view class="_tooltip">
        <view v-for="(item, index) in tooltip.items" v-bind:key="index" class="_tooltip_item" :data-i="index" @tap="_tooltipTap">{{item}}</view>
      </view>
    </view>
    <view v-if="slider" class="_slider" :style="'top:'+slider.top+'px'">
      <slider :value="slider.value" :min="slider.min" :max="slider.max" handle-size="14" block-size="14" show-value activeColor="white" style="padding:3px" @changing="_sliderChanging" @change="_sliderChange" />
    </view>
  </view>
</template>`)
          // 添加 data
          .replace(/data\s*\(\)\s*{\s*return\s*{/, `data() {
    return {
      tooltip: null,
      slider: null,`)
          // 添加 editable 属性
          .replace(/props\s*:\s*{/, `props: {
    editable: Boolean,
    placeholder: String,`)
          // 添加 watch
          .replace(/watch\s*:\s*{/, `watch: {
    editable(val) {
      this.setContent(val ? this.content : this.getContent())
      if (!val)
        this._maskTap()
    },`)
          .replace(/if\s*\(this.content/, 'if ((this.content || this.editable)')
          // 处理各类弹窗的事件
          .replace(/methods\s*:\s*{/, `methods: {
    _containTap() {
      if (!this._lock && !this.slider) {
        this._edit = void 0
        this._maskTap()
      }
    },
    _tooltipTap(e) {
      this._tooltipcb(e.currentTarget.dataset.i)
      this.$set(this, 'tooltip', null)
    },
    _sliderChanging(e) {
      this._slideringcb(e.detail.value)
    },
    _sliderChange(e) {
      this._slidercb(e.detail.value)
    },`)
          // 工具弹窗的样式
          .replace('</style>', `
/* 提示条 */
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
}
</style>`)
      }
      else if (file.path.includes('parser.js')) {
        // 不做 expose 处理
        content = content.replace(/parser.prototype.expose\s*=\s*function\s*\(\)\s*{/, 'parser.prototype.expose=function(){if(this.options.editable)return')
          .replace(/popNode\s*=\s*function\s*\(\)\s*{/, "popNode=function(){var editable=this.options.editable")
          // 不转换标签名
          .replace(/if\s*\(config.blockTags\[node.name\]\)\s*node.name\s*=\s*'div'/, "if(config.blockTags[node.name]){if(!editable)node.name='div'}")
          // 转换表格和列表
          .replace(/else\s*if\s*\(node.c\)/, 'else if (!editable && node.c )')
          .replace(/node.c(\)|\s*&&|\s*\n)/g, '(node.c||editable)$1')
          .replace(/while\s*\(map\[row\s*\+\s*'.'\s*\+\s*col\]\)\s*col\+\+/, "while(map[row+'.'+col])col++;if(editable)td.r=row")
          .replace(/var\s+str\s*=\s*'<video style="max-width:100%"'/, 'var str=\'<video style="max-width:100%"\'\nif(editable)attrs.controls=\'\'')
      }
      else if (file.path.includes('node.vue')) {
        content =
          // 传递 opts
          content.replace(/:childs\s*=\s*"tbody.children"\s*:opts="opts"/, ':childs="tbody.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+\'.\'+i+\'.children.\'+x+\'.children\']"')
            .replace(/:childs\s*=\s*"n2.children"\s*:opts="opts"/, ':childs="n2.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+\'.\'+i+\'.children.\'+j+\'.children\']"')
            .replace(/:childs\s*=\s*"tr.children"\s*:opts="opts"/, ':childs="tr.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+\'.\'+i+\'.children.\'+x+\'.children.\'+y+\'.children\']"')
            .replace(/:childs\s*=\s*"td.children"\s*:opts="opts"/, ':childs="td.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+\'.\'+i+\'.children.\'+x+\'.children.\'+y+\'.children.\'+z+\'.children\']"')
            .replace(/opts\s*=\s*"opts"/g, 'opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+\'.\'+i+\'.children\']"')
            // 不使用 rich-text
            .replace(/handler\.use\(n\)/g, '!opts[4]&&handler.use(n)').replace(/!n.c/g, '!opts[4]&&!n.c').replace('&&n.c', '&&(n.c||opts[4])')
            // 修改普通标签
            .replace(/<view\s+:id(.+?)style="/, '<view @tap="nodeTap" :id$1style="(ctrl.root?\'border:1px solid black;padding:5px;display:block;\':\'\')+')
            // 修改文本块
            .replace(/<!--\s*文本\s*-->[\s\S]+?<!--\s*链接\s*-->/,
              `<!-- 文本 -->
      <text v-else-if="n.type=='text'&&!ctrl['e'+i]" :data-i="i" @tap="editStart">{{n.text}}
        <text v-if="!n.text" style="color:gray">{{opts[5]||'请输入'}}</text>
      </text>
      <text v-else-if="n.type=='text'&&ctrl['e'+i]==1" :data-i="i" style="border:1px dashed black;min-width:50px;width:auto;padding:5px;display:block" @tap.stop="editStart">{{n.text}}
        <text v-if="!n.text" style="color:gray">{{opts[5]||'请输入'}}</text>
      </text>
      <textarea v-else-if="n.type=='text'" style="border:1px dashed black;min-width:50px;width:auto;padding:5px" auto-height maxlength="-1" :focus="ctrl['e'+i]==3" :value="n.text" :data-i="i" @input="editInput" @blur="editEnd" />
      <text v-else-if="n.name=='br'">\\n</text>
      <!-- 链接 -->`)
            // 修改图片
            .replace(/<image(.+?)id="n.attrs.id/, '<image$1id="n.attrs.id||(\'n\'+i)')
            .replace('height:1px', "height:'+(ctrl['h'+i]||1)+'px")
            .replace(/:style\s*=\s*"\(ctrl\[i\]/g, ':style="(ctrl[\'e\'+i]?\'border:1px dashed black;padding:3px;\':\'\')+(ctrl[i]')
            .replace(/show-menu-by-longpress\s*=\s*"(\S+?)"\s*:image-menu-prevent\s*=\s*"(\S+?)"/, 'show-menu-by-longpress="!opts[4]&&$1" :image-menu-prevent="opts[4]||$2"')
            // 修改音视频
            .replace(/<!--\s*视频\s*-->/, `<!-- 视频 -->
		  <view v-else-if="opts[4]&&n.name=='video'" :class="'_video '+n.attrs.class" :style="(n.attrs.poster?'background-image:url('+n.attrs.poster+');background-size:100% 100%;':'')+n.attrs.style" :data-i="i" @tap="mediaTap" />`)
            .replace('audio ', 'audio @tap="mediaTap" ')
            .replace('<script>',
              `<script>
function getTop(e) {
  var top
  // #ifdef H5 || APP-PLUS
  top = e.touches[0].pageY
  // #endif
  // #ifdef MP-ALIPAY
  top = e.detail.pageY
  // #endif
  // #ifndef H5 || MP-ALIPAY || APP-PLUS
  top = e.detail.y
  // #endif
  if (top - e.currentTarget.offsetTop < 150)
    top = e.currentTarget.offsetTop
  if (top < 30)
    top += 70
  return top - 30
}`)
            // 周期处理
            .replace(/beforeDestroy\s*\(\)\s*{/, 'beforeDestroy() {if(this.root._edit==this)this.root._edit=void 0')
            // 记录图片宽度
            .replace(/imgLoad\s*\(e\)\s*{/, `imgLoad(e) {
      // #ifdef MP-WEIXIN || MP-QQ
      if (this.opts[4])
        this.$nextTick(() => {
          var id = this.childs[i].attrs.id || ('n' + i)
          uni.createSelectorQuery().in(this).select('#' + id).boundingClientRect().exec(res => {
            this.$set(this.ctrl, 'h'+i, res[0].height)
          })
        })
      // #endif`)
            .replace(/if\s*\(!this.childs\[i\].w\)\s*this.\$set\(this.ctrl\s*,\s*i\s*,\s*e.detail.width\)/,
              `if (!this.childs[i].w) {
        this.$set(this.ctrl, i, e.detail.width)
        if (this.opts[4]) {
          var path = this.opts[6] + '.' + i + '.attrs.'
          if (e.detail.width < 150)
            this.root._setData(path + 'ignore', 'T')
          this.root._setData(path + 'width', e.detail.width.toString())
        }
      }`)
            // 处理图片长按
            .replace(/imgLongTap\s*\(\)\s*{/, `imgLongTap() {
      if (this.opts[4])
        return`)
            // 处理图片点击
            .replace(/imgTap\s*\(e\)\s*{([\s\S]+?)},\s*\/\*/,
              `imgTap (e) {
      if (!this.opts[4]) {$1}
      else {
        var i = e.currentTarget.dataset.i,
          node = this.childs[i],
          items = this.root._getItem(node)
        this.root._edit = this
        this.i = i
        this.root._maskTap()
        this.$set(this.ctrl, 'e' + i, 1)
        this.root._mask.push(() => this.$set(this.ctrl, 'e' + i, 0))
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            // 换图
            if (items[tapIndex] == '换图')
              this.root.getSrc('img', node.attrs.src).then(src => {
                this.root._editVal(this.opts[6] + '.' + i + '.attrs.src', node.attrs.src, src, true)
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
                  this.root._editVal(this.opts[6] + '.' + i + '.attrs.style', style, this.childs[i].attrs.style)
                }
              })
            }
            // 将图片设置为链接
            else if (items[tapIndex] == '超链接')
              this.root.getSrc('link').then(url => {
                this.root._editVal(this.opts[6] + '.' + i, node, {
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
                this.root._editVal(this.opts[6] + '.' + i + '.attrs.original-src', node.attrs['original-src'], url, true)
                uni.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            else if (items[tapIndex] == '删除')
              this.remove(i)
            // 禁用 / 启用预览
            else {
              this.root._setData(this.opts[6] + '.' + i + '.attrs.ignore', !node.attrs.ignore)
              uni.showToast({
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
      if (!this.opts[4]) {$1}
      else  {
        var i = e.currentTarget.dataset.i,
          node = this.childs[i],
          items = this.root._getItem(node)
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] == '更换链接') {
              this.root.getSrc('link', node.attrs.href).then(url => {
                this.root._editVal(this.opts[6] + '.' + i + '.attrs.href', node.attrs.href, url, true)
                uni.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else
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
