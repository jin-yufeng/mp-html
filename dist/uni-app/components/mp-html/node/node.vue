<template>
  <view @tap="nodeTap" :id="attrs.id" :class="'_block _'+name+' '+attrs.class" :style="(ctrl.root?'border:1px solid black;padding:5px;display:block;':'')+attrs.style">
    <block v-for="(n, i) in childs" v-bind:key="i">
      <!-- 图片 -->
      <!-- 占位图 -->
      <image v-if="n.name==='img'&&!n.t&&((opts[1]&&!ctrl[i])||ctrl[i]<0)" class="_img" :style="n.attrs.style" :src="ctrl[i]<0?opts[2]:opts[1]" mode="widthFix" />
      <!-- 显示图片 -->
      <!-- #ifdef H5 || (APP-PLUS && VUE2) -->
      <img v-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl['e'+i]?'border:1px dashed black;padding:3px;':'')+(ctrl[i]===-1?'display:none;':'')+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifndef H5 || (APP-PLUS && VUE2) -->
      <!-- 表格中的图片，使用 rich-text 防止大小不正确 -->
      <rich-text v-if="n.name==='img'&&n.t" :style="'display:'+n.t" :nodes="[{attrs:{style:n.attrs.style,src:n.attrs.src},name:'img'}]" :data-i="i" @tap.stop="imgTap" />
      <!-- #endif -->
      <!-- #ifndef H5 || APP-PLUS -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id||('n'+i)" :class="'_img '+n.attrs.class" :style="(ctrl['e'+i]?'border:1px dashed black;padding:3px;':'')+(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;height:'+(ctrl['h'+i]||1)+'px;'+n.attrs.style" :src="n.attrs.src" :mode="!n.h?'widthFix':(!n.w?'heightFix':'')" :lazy-load="opts[0]" :webp="n.webp" :show-menu-by-longpress="!opts[5]&&opts[3]&&!n.attrs.ignore" :image-menu-prevent="opts[5]||!opts[3]||n.attrs.ignore" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifdef APP-PLUS && VUE3 -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl['e'+i]?'border:1px dashed black;padding:3px;':'')+(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;'+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :mode="!n.h?'widthFix':(!n.w?'heightFix':'')" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- 文本 -->
      <text v-else-if="n.type==='text'&&!ctrl['e'+i]" :data-i="i" :user-select="opts[4]" :decode="!opts[5]" @tap="editStart">{{n.text}}
        <text v-if="!n.text" style="color:gray">{{opts[6]||'请输入'}}</text>
      </text>
      <text v-else-if="n.type==='text'&&ctrl['e'+i]===1" :data-i="i" style="border:1px dashed black;min-width:50px;width:auto;padding:5px;display:block" @tap.stop="editStart">{{n.text}}
        <text v-if="!n.text" style="color:gray">{{opts[6]||'请输入'}}</text>
      </text>
      <textarea v-else-if="n.type==='text'" style="border:1px dashed black;min-width:50px;width:auto;padding:5px" auto-height maxlength="-1" :focus="ctrl['e'+i]===3" :value="n.text" :data-i="i" @input="editInput" @blur="editEnd" />
      <text v-else-if="n.name==='br'">\n</text>
      <!-- 链接 -->
      <view v-else-if="n.name==='a'" :id="n.attrs.id" :class="(n.attrs.href?'_a ':'')+n.attrs.class" hover-class="_hover" :style="'display:inline;'+n.attrs.style" :data-i="i" @tap.stop="linkTap">
        <node name="span" :childs="n.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children']" style="display:inherit" />
      </view>
      <!-- 视频 -->
      <!-- #ifdef APP-PLUS -->
      <view v-else-if="n.html" :data-i="i" @tap="mediaTap" :id="n.attrs.id" :class="'_video '+n.attrs.class" :style="n.attrs.style" v-html="n.html" @vplay.stop="play" />
      <!-- #endif -->
      <!-- #ifndef APP-PLUS -->
      <video :show-center-play-btn="!opts[5]" @tap="mediaTap" v-else-if="n.name==='video'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :autoplay="n.attrs.autoplay" :controls="n.attrs.controls" :loop="n.attrs.loop" :muted="n.attrs.muted" :object-fit="n.attrs['object-fit']" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <!-- #ifdef H5 || APP-PLUS -->
      <iframe v-else-if="n.name==='iframe'" :style="n.attrs.style" :allowfullscreen="n.attrs.allowfullscreen" :frameborder="n.attrs.frameborder" :src="n.attrs.src" />
      <embed v-else-if="n.name==='embed'" :style="n.attrs.style" :src="n.attrs.src" />
      <!-- #endif -->
      <!-- #ifndef MP-TOUTIAO || ((H5 || APP-PLUS) && VUE3) -->
      <!-- 音频 -->
      <audio @tap="mediaTap" v-else-if="n.name==='audio'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :author="n.attrs.author" :controls="n.attrs.controls" :loop="n.attrs.loop" :name="n.attrs.name" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <view v-else-if="(n.name==='table'&&(n.c||opts[5]))||n.name==='li'" :id="n.attrs.id" :class="'_'+n.name+' '+n.attrs.class" :style="n.attrs.style">
        <node v-if="n.name==='li'" :childs="n.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children']" />
        <view v-else v-for="(tbody, x) in n.children" v-bind:key="x" :class="'_'+tbody.name+' '+tbody.attrs.class" :style="tbody.attrs.style">
          <node v-if="tbody.name==='td'||tbody.name==='th'" :childs="tbody.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children.'+x+'.children']" />
          <block v-else v-for="(tr, y) in tbody.children" v-bind:key="y">
            <view v-if="tr.name==='td'||tr.name==='th'" :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <node :childs="tr.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children.'+x+'.children.'+y+'.children']" />
            </view>
            <view v-else :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <view v-for="(td, z) in tr.children" v-bind:key="z" :class="'_'+td.name+' '+td.attrs.class" :style="td.attrs.style">
                <node :childs="td.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children.'+x+'.children.'+y+'.children.'+z+'.children']" />
              </view>
            </view>
          </block>
        </view>
      </view>
      <my-card v-else-if="n.name=='card'" :class="n.attrs.class" :style="n.attrs.style" :oid="n.attrs.oid" :type="n.attrs.type" :src="n.attrs.src" :title="n.attrs.title" :url="n.attrs.url" :color="n.attrs.color" :bgColor="n.attrs.bgColor" :name="n.attrs.name" :data-i="i" data-source="card" />
      <!-- 富文本 -->
      <!-- #ifdef H5 || ((MP-WEIXIN || MP-QQ || APP-PLUS || MP-360) && VUE2) -->
      <rich-text v-else-if="!opts[5]&&!n.c&&!handler.isInline(n.name, n.attrs.style)" :id="n.attrs.id" :style="n.f" :user-select="opts[4]" :nodes="[n]" />
      <!-- #endif -->
      <!-- #ifndef H5 || ((MP-WEIXIN || MP-QQ || APP-PLUS || MP-360) && VUE2) -->
      <rich-text v-else-if="!opts[5]&&!n.c" :id="n.attrs.id" :style="'display:inline;'+n.f" :preview="false" :selectable="opts[4]" :user-select="opts[4]" :nodes="[n]" />
      <!-- #endif -->
      <!-- 继续递归 -->
      <view v-else-if="n.c===2" :id="n.attrs.id" :class="'_block _'+n.name+' '+n.attrs.class" :style="n.f+';'+n.attrs.style">
        <node v-for="(n2, j) in n.children" v-bind:key="j" :style="n2.f" :name="n2.name" :attrs="n2.attrs" :childs="n2.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children.'+j+'.children']" />
      </view>
      <node v-else :style="n.f" :name="n.name" :attrs="n.attrs" :childs="n.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6],opts[7]+'.'+i+'.children']" />
    </block>
  </view>
</template>
<script module="handler" lang="wxs">
// 行内标签列表
var inlineTags = {
  abbr: true,
  b: true,
  big: true,
  code: true,
  del: true,
  em: true,
  i: true,
  ins: true,
  label: true,
  q: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true
}
/**
 * @description 判断是否为行内标签
 */
module.exports = {
  isInline: function (tagName, style) {
    return inlineTags[tagName] || (style || '').indexOf('display:inline') !== -1
  }
}
</script>
<script>
import Parser from '../parser'
function getTop(e) {
  let top
  // #ifdef H5 || APP-PLUS
  top = e.touches[0].pageY
  // #endif
  // #ifdef MP-ALIPAY
  top = e.detail.pageY
  // #endif
  // #ifndef H5 || MP-ALIPAY || APP-PLUS
  top = e.detail.y
  // #endif
  if (top - e.currentTarget.offsetTop < 150 || top < 600) {
    top = e.currentTarget.offsetTop
  }
  if (top < 30) {
    top += 70
  }
  return top - 30
}
import myCard from '../card/card'

import node from './node'
export default {
  name: 'node',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true,
    // #endif
    // #ifdef MP-TOUTIAO
    addGlobalClass: false
    // #endif
  },
  data () {
    return {
      ctrl: {},
      // #ifdef MP-WEIXIN
      isiOS: uni.getSystemInfoSync().system.includes('iOS')
      // #endif
    }
  },
  props: {
    name: String,
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    childs: Array,
    opts: Array
  },
  components: {
myCard,

    // #ifndef (H5 || APP-PLUS) && VUE3
    node
    // #endif
  },
  mounted () {
    this.$nextTick(() => {
      for (this.root = this.$parent; this.root.$options.name !== 'mp-html'; this.root = this.root.$parent);
    })
    // #ifdef H5 || APP-PLUS
    if (this.opts[0]) {
      let i
      for (i = this.childs.length; i--;) {
        if (this.childs[i].name === 'img') break
      }
      if (i !== -1) {
        this.observer = uni.createIntersectionObserver(this).relativeToViewport({
          top: 500,
          bottom: 500
        })
        this.observer.observe('._img', res => {
          if (res.intersectionRatio) {
            this.$set(this.ctrl, 'load', 1)
            this.observer.disconnect()
          }
        })
      }
    }
    // #endif
  },
  beforeDestroy () {
  if (this.root._edit === this) {
    this.root._edit = undefined
  }
    // #ifdef H5 || APP-PLUS
    if (this.observer) {
      this.observer.disconnect()
    }
    // #endif
  },
  methods:{editStart (e) {
      if (this.opts[5]) {
        const i = e.currentTarget.dataset.i
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
          // 将 text 转为 textarea
          this.$set(this.ctrl, 'e' + i, 2)
          // 延时对焦，避免高度错误
          setTimeout(() => {
            this.$set(this.ctrl, 'e' + i, 3)
          }, 50)
        }
      }
    },editInput (e) {
      const i = e.target.dataset.i
      // 替换连续空格
      const value = e.detail.value.replace(/ {2,}/, $ => {
        let res = '\xa0'
        for (let i = 1; i < $.length; i++) {
          res += '\xa0'
        }
        return res
      })
      this.root._editVal(`${this.opts[7]}.${i}.text`, this.childs[i].text, value) // 记录编辑历史
      this.cursor = e.detail.cursor
    },editEnd (e) {
      const i = e.target.dataset.i
      this.$set(this.ctrl, 'e' + i, 0)
      // 更新到视图
      this.root._setData(`${this.opts[7]}.${i}.text`, e.detail.value.replace(/ {2}/g, '\xa0 '))
      if (e.detail.cursor !== undefined) {
        this.cursor = e.detail.cursor
      }
    },insert (node) {
      setTimeout(() => {
        const childs = this.childs.slice(0)
        if (!childs[this.i]) {
          childs.push(node)
        } else if (childs[this.i].text) {
          // 在文本中插入
          const text = childs[this.i].text
          if (node.type === 'text') {
            if (this.cursor) {
              childs[this.i].text = text.substring(0, this.cursor) + node.text + text.substring(this.cursor)
            } else {
              childs[this.i].text += node.text
            }
          } else {
            const list = []
            if (this.cursor) {
              list.push({
                type: 'text',
                text: text.substring(0, this.cursor)
              })
            }
            list.push(node)
            if (this.cursor < text.length) {
              list.push({
                type: 'text',
                text: text.substring(this.cursor)
              })
            }
            childs.splice(this.i, 1, ...list)
          }
        } else {
          childs.splice(parseInt(this.i) + 1, 0, node)
        }
        this.root._editVal(this.opts[7], this.childs, childs, true)
        this.i = parseInt(this.i) + 1
      }, 200)
    },remove (i) {
      const arr = this.childs.slice(0)
      const delEle = arr.splice(i, 1)[0]
      if (delEle.name === 'img' || delEle.name === 'video' || delEle.name === 'audio') {
        let src = delEle.attrs.src
        if (delEle.src) {
          src = delEle.src.length === 1 ? delEle.src[0] : delEle.src
        }
        this.root.$emit('remove', {
          type: delEle.name,
          src
        })
      }
      this.root._edit = undefined
      this.root._maskTap()
      this.root._editVal(this.opts[7], this.childs, arr, true)
    },nodeTap (e) {
      if (this.opts[5]) {
        if (this.root._lock) return
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
        if (this.ctrl['e' + this.i] === 3) return
        this.root._maskTap()
        this.root._edit = this
        let start = this.opts[7].lastIndexOf('children.')
        if (start !== -1) {
          start += 9
        } else {
          start = 6
        }
        const i = parseInt(this.opts[7].substring(start, this.opts[7].lastIndexOf('.children')))
        let parent = this.$parent
        while (parent && parent.$options.name !== 'node') {
          parent = parent.$parent
        }
        if (!parent || this.opts[7].length - parent.opts[7].length > 15) return
        // 显示实线框
        this.$set(this.ctrl, 'root', 1)
        this.root._mask.push(() => this.$set(this.ctrl, 'root', 0))
        if (this.childs.length === 1 && this.childs[0].type === 'text' && !this.ctrl.e0) {
          this.$set(this.ctrl, 'e0', 1)
          this.root._mask.push(() => this.$set(this.ctrl, 'e0', 0))
          this.i = 0
          this.cursor = this.childs[0].text.length
        }
        const items = this.root._getItem(parent.childs[i], i !== 0, i !== parent.childs.length - 1)
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] === '大小') {
              // 改变字体大小
              const style = parent.childs[i].attrs.style || ''
              let value = style.match(/;font-size:([0-9]+)px/)
              if (value) {
                value = parseInt(value[1])
              } else {
                value = 16
              }
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
                  if (val !== value) {
                    parent.changeStyle('font-size', i, val + 'px', value + 'px')
                  }
                  this.root._editVal(`${parent.opts[7]}.${i}.attrs.style`, style, parent.childs[i].attrs.style)
                }
              })
            } else if (items[tapIndex] === '颜色') {
              // 改变文字颜色
              const items = this.root._getItem('color')
              this.root._color({
                top: getTop(e),
                items,
                success: tapIndex => {
                  const style = parent.childs[i].attrs.style || ''
                  const value = style.match(/;color:([^;]+)/)
                  parent.changeStyle('color', i, items[tapIndex], value ? value[1] : undefined)
                  this.root._editVal(`${parent.opts[7]}.${i}.attrs.style`, style, parent.childs[i].attrs.style)
                }
              })
            } else if (items[tapIndex] === '上移' || items[tapIndex] === '下移') {
              const arr = parent.childs.slice(0)
              const item = arr[i]
              if (items[tapIndex] === '上移') {
                arr[i] = arr[i - 1]
                arr[i - 1] = item
              } else {
                arr[i] = arr[i + 1]
                arr[i + 1] = item
              }
              this.root._editVal(parent.opts[7], parent.childs, arr, true)
            } else if (items[tapIndex] === '删除') {
              parent.remove(i)
            } else {
              const style = parent.childs[i].attrs.style || ''
              let newStyle = ''
              const item = items[tapIndex]
              let name
              let value
              if (item === '斜体') {
                name = 'font-style'
                value = 'italic'
              } else if (item === '粗体') {
                name = 'font-weight'
                value = 'bold'
              } else if (item === '下划线') {
                name = 'text-decoration'
                value = 'underline'
              } else if (item === '居中') {
                name = 'text-align'
                value = 'center'
              } else if (item === '缩进') {
                name = 'text-indent'
                value = '2em'
              }
              if (style.includes(name + ':')) {
                // 已有则取消
                newStyle = style.replace(new RegExp(name + ':[^;]+'), '')
              } else {
                // 没有则添加
                newStyle = style + ';' + name + ':' + value
              }
              this.root._editVal(`${parent.opts[7]}.${i}.attrs.style`, style, newStyle, true)
            }
          }
        })
      }
    },mediaTap (e) {
      if (this.opts[5]) {
        const i = e.target.dataset.i
        const node = this.childs[i]
        const items = this.root._getItem(node)
        this.root._maskTap()
        this.root._edit = this
        this.i = i
        this.root._tooltip({
          top: e.target.offsetTop - 30,
          items,
          success: tapIndex => {
            switch (items[tapIndex]) {
              case '封面':
                // 设置封面
                this.root.getSrc('img', node.attrs.poster || '').then(url => {
                  this.root._editVal(`${this.opts[7]}.${i}.attrs.poster`, node.attrs.poster, url instanceof Array ? url[0] : url, true)
                }).catch(() => { })
                break
              case '删除':
                this.remove(i)
                break
              case '循环':
              case '不循环':
                // 切换循环播放
                this.root._setData(`${this.opts[7]}.${i}.attrs.loop`, !node.attrs.loop)
                uni.showToast({
                  title: '成功'
                })
                break
              case '自动播放':
              case '不自动播放':
                // 切换自动播放播放
                this.root._setData(`${this.opts[7]}.${i}.attrs.autoplay`, !node.attrs.autoplay)
                uni.showToast({
                  title: '成功'
                })
                break
            }
          }
        })
        // 避免上层出现点击态
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
      }
    },changeStyle (name, i, value, oldVal) {
      let style = this.childs[i].attrs.style || ''
      if (style.includes(';' + name + ':' + oldVal)) {
        // style 中已经有
        style = style.replace(';' + name + ':' + oldVal, ';' + name + ':' + value)
      } else {
        // 没有则新增
        style += ';' + name + ':' + value
      }
      this.root._setData(`${this.opts[7]}.${i}.attrs.style`, style)
    },
    // #ifdef MP-WEIXIN
    toJSON () { return this },
    // #endif
    /**
     * @description 播放视频事件
     * @param {Event} e
     */
    play (e) {
      this.root.$emit('play')
      // #ifndef APP-PLUS
      if (this.root.pauseVideo) {
        let flag = false
        const id = e.target.id
        for (let i = this.root._videos.length; i--;) {
          if (this.root._videos[i].id === id) {
            flag = true
          } else {
            this.root._videos[i].pause() // 自动暂停其他视频
          }
        }
        // 将自己加入列表
        if (!flag) {
          const ctx = uni.createVideoContext(id
            // #ifndef MP-BAIDU
            , this
            // #endif
          )
          ctx.id = id
          if (this.root.playbackRate) {
            ctx.playbackRate(this.root.playbackRate)
          }
          this.root._videos.push(ctx)
        }
      }
      // #endif
    },

    /**
     * @description 图片点击事件
     * @param {Event} e
     */
    imgTap (e) {
      if (!this.opts[5]) {
      const node = this.childs[e.currentTarget.dataset.i]
      if (node.a) {
        this.linkTap(node.a)
        return
      }
      if (node.attrs.ignore) return
      // #ifdef H5 || APP-PLUS
      node.attrs.src = node.attrs.src || node.attrs['data-src']
      // #endif
      this.root.$emit('imgtap', node.attrs)
      // 自动预览图片
      if (this.root.previewImg) {
        uni.previewImage({
          // #ifdef MP-WEIXIN
          showmenu: this.root.showImgMenu,
          // #endif
          // #ifdef MP-ALIPAY
          enablesavephoto: this.root.showImgMenu,
          enableShowPhotoDownload: this.root.showImgMenu,
          // #endif
          current: parseInt(node.attrs.i),
          urls: this.root.imgList
        })
      }
    } else {
        const i = e.currentTarget.dataset.i
        const node = this.childs[i]
        const items = this.root._getItem(node)
        const parser = new Parser(this.root)
        this.root._edit = this
        this.i = i
        this.root._maskTap()
        this.$set(this.ctrl, 'e' + i, 1)
        this.root._mask.push(() => this.$set(this.ctrl, 'e' + i, 0))
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] === '换图') {
              // 换图
              this.root.getSrc('img', node.attrs.src || '').then(url => {
                this.root._editVal(this.opts[7] + '.' + i + '.attrs.src', node.attrs.src, parser.getUrl(url instanceof Array ? url[0] : url), true)
              }).catch(() => { })
            } else if (items[tapIndex] === '宽度') {
              // 更改宽度
              const style = node.attrs.style || ''
              let value = style.match(/max-width:([0-9]+)%/)
              if (value) {
                value = parseInt(value[1])
              } else {
                value = 100
              }
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
                  if (val !== value) {
                    this.changeStyle('max-width', i, val + '%', value + '%')
                    value = val
                  }
                  this.root._editVal(this.opts[7] + '.' + i + '.attrs.style', style, this.childs[i].attrs.style)
                }
              })
            } else if (items[tapIndex] === '超链接') {
              // 将图片设置为链接
              this.root.getSrc('link', node.a ? node.a.href : '').then(url => {
                // 如果有 a 标签则替换 href
                if (node.a) {
                  this.root._editVal(this.opts[7] + '.' + i + '.a.href', node.a.href, parser.getUrl(url), true)
                } else {
                  const link = {
                    name: 'a',
                    attrs: {
                      href: parser.getUrl(url)
                    },
                    children: [node]
                  }
                  node.a = link.attrs
                  this.root._editVal(this.opts[7] + '.' + i, node, link, true)
                }
                wx.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else if (items[tapIndex] === '预览图') {
              // 设置预览图链接
              this.root.getSrc('img', node.attrs['original-src'] || '').then(url => {
                this.root._editVal(this.opts[7] + '.' + i + '.attrs.original-src', node.attrs['original-src'], parser.getUrl(url instanceof Array ? url[0] : url), true)
                uni.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else if (items[tapIndex] === '删除') {
              this.remove(i)
            } else {
              // 禁用 / 启用预览
              this.root._setData(this.opts[7] + '.' + i + '.attrs.ignore', !node.attrs.ignore)
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
    /**
     * @description 图片长按
     */
    imgLongTap (e) {
      // #ifdef APP-PLUS
      const attrs = this.childs[e.currentTarget.dataset.i].attrs
      if (this.opts[3] && !attrs.ignore) {
        uni.showActionSheet({
          itemList: ['保存图片'],
          success: () => {
            const save = path => {
              uni.saveImageToPhotosAlbum({
                filePath: path,
                success () {
                  uni.showToast({
                    title: '保存成功'
                  })
                }
              })
            }
            if (this.root.imgList[attrs.i].startsWith('http')) {
              uni.downloadFile({
                url: this.root.imgList[attrs.i],
                success: res => save(res.tempFilePath)
              })
            } else {
              save(this.root.imgList[attrs.i])
            }
          }
        })
      }
      // #endif
    },

    /**
     * @description 图片加载完成事件
     * @param {Event} e
     */
    imgLoad(e) {
      // #ifdef MP-WEIXIN || MP-QQ
      if (this.opts[5])
        this.$nextTick(() => {
          const id = this.childs[i].attrs.id || ('n' + i)
          uni.createSelectorQuery().in(this).select('#' + id).boundingClientRect().exec(res => {
            this.$set(this.ctrl, 'h'+i, res[0].height)
          })
        })
      // #endif
      const i = e.currentTarget.dataset.i
      /* #ifndef H5 || (APP-PLUS && VUE2) */
      if (!this.childs[i].w) {
        this.$set(this.ctrl, i, e.detail.width)
        if (this.opts[5]) {
          const path = this.opts[7] + '.' + i + '.attrs.'
          if (e.detail.width < 150)
            this.root._setData(path + 'ignore', 'T')
          this.root._setData(path + 'width', e.detail.width.toString())
        }
      } else /* #endif */ if ((this.opts[1] && !this.ctrl[i]) || this.ctrl[i] === -1) {
        // 加载完毕，取消加载中占位图
        this.$set(this.ctrl, i, 1)
      }
      this.checkReady()
    },

    /**
     * @description 检查是否所有图片加载完毕
     */
    checkReady () {
      if (this.root && !this.root.lazyLoad) {
        this.root._unloadimgs -= 1
        if (!this.root._unloadimgs) {
          setTimeout(() => {
            this.root.getRect().then(rect => {
              this.root.$emit('ready', rect)
            }).catch(() => {
              this.root.$emit('ready', {})
            })
          }, 350)
        }
      }
    },

    /**
     * @description 链接点击事件
     * @param {Event} e
     */
    linkTap (e) {
      if (!this.opts[5]) {
      const node = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {}
      const attrs = node.attrs || e
      const href = attrs.href
      this.root.$emit('linktap', Object.assign({
        innerText: this.root.getText(node.children || []) // 链接内的文本内容
      }, attrs))
      if (href) {
        if (href[0] === '#') {
          // 跳转锚点
          this.root.navigateTo(href.substring(1)).catch(() => { })
        } else if (href.split('?')[0].includes('://')) {
          // 复制外部链接
          if (this.root.copyLink) {
            // #ifdef H5
            window.open(href)
            // #endif
            // #ifdef MP
            uni.setClipboardData({
              data: href,
              success: () =>
                uni.showToast({
                  title: '链接已复制'
                })
            })
            // #endif
            // #ifdef APP-PLUS
            plus.runtime.openWeb(href)
            // #endif
          }
        } else {
          // 跳转页面
          uni.navigateTo({
            url: href,
            fail () {
              uni.switchTab({
                url: href,
                fail () { }
              })
            }
          })
        }
      }
    } else {
        const i = e.currentTarget.dataset.i
        const node = this.childs[i]
        const items = this.root._getItem(node)
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] === '更换链接') {
              this.root.getSrc('link', node.attrs.href).then(url => {
                this.root._editVal(this.opts[7] + '.' + i + '.attrs.href', node.attrs.href, url, true)
                uni.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else {
              this.remove(i)
            }
          }
        })
      }
    },
    /**
     * @description 错误事件
     * @param {Event} e
     */
    mediaError (e) {
      const i = e.currentTarget.dataset.i
      const node = this.childs[i]
      // 加载其他源
      if (node.name === 'video' || node.name === 'audio') {
        let index = (this.ctrl[i] || 0) + 1
        if (index > node.src.length) {
          index = 0
        }
        if (index < node.src.length) {
          this.$set(this.ctrl, i, index)
          return
        }
      } else if (node.name === 'img') {
        // #ifdef H5 && VUE3
        if (this.opts[0] && !this.ctrl.load) return
        // #endif
        // 显示错误占位图
        if (this.opts[2]) {
          this.$set(this.ctrl, i, -1)
        }
        this.checkReady()
      }
      if (this.root) {
        this.root.$emit('error', {
          source: node.name,
          attrs: node.attrs,
          // #ifndef H5 && VUE3
          errMsg: e.detail.errMsg
          // #endif
        })
      }
    }
  }
}
</script>
<style>/* #ifndef H5 || MP-ALIPAY || APP-PLUS */
  /deep/ ._address,
  /deep/ ._article,
  /deep/ ._aside,
  /deep/ ._body,
  /deep/ ._caption,
  /deep/ ._center,
  /deep/ ._cite,
  /deep/ ._footer,
  /deep/ ._header,
  /deep/ ._html,
  /deep/ ._nav,
  /deep/ ._pre,
  /deep/ ._section {
    display: block;
  }
  
  /* #endif */
  /deep/ ._video {
    width: 300px;
    height: 225px;
    display: inline-block;
    background-color: black;
  }
/* a 标签默认效果 */
._a {
  padding: 1.5px 0 1.5px 0;
  color: #366092;
  word-break: break-all;
}

/* a 标签点击态效果 */
._hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* 图片默认效果 */
._img {
  max-width: 100%;
  -webkit-touch-callout: none;
}

/* 内部样式 */

._block {
  display: block;
}

._b,
._strong {
  font-weight: bold;
}

._code {
  font-family: monospace;
}

._del {
  text-decoration: line-through;
}

._em,
._i {
  font-style: italic;
}

._h1 {
  font-size: 2em;
}

._h2 {
  font-size: 1.5em;
}

._h3 {
  font-size: 1.17em;
}

._h5 {
  font-size: 0.83em;
}

._h6 {
  font-size: 0.67em;
}

._h1,
._h2,
._h3,
._h4,
._h5,
._h6 {
  display: block;
  font-weight: bold;
}

._image {
  height: 1px;
}

._ins {
  text-decoration: underline;
}

._li {
  display: list-item;
}

._ol {
  list-style-type: decimal;
}

._ol,
._ul {
  display: block;
  padding-left: 40px;
  margin: 1em 0;
}

._q::before {
  content: '"';
}

._q::after {
  content: '"';
}

._sub {
  font-size: smaller;
  vertical-align: sub;
}

._sup {
  font-size: smaller;
  vertical-align: super;
}

._thead,
._tbody,
._tfoot {
  display: table-row-group;
}

._tr {
  display: table-row;
}

._td,
._th {
  display: table-cell;
  vertical-align: middle;
}

._th {
  font-weight: bold;
  text-align: center;
}

._ul {
  list-style-type: disc;
}

._ul ._ul {
  margin: 0;
  list-style-type: circle;
}

._ul ._ul ._ul {
  list-style-type: square;
}

._abbr,
._b,
._code,
._del,
._em,
._i,
._ins,
._label,
._q,
._span,
._strong,
._sub,
._sup {
  display: inline;
}

/* #ifdef APP-PLUS */
._video {
  width: 300px;
  height: 225px;
}
/* #endif */
</style>