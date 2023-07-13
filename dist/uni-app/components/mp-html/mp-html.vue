<template>
  <view id="_root" :class="(selectable?'_select ':'')+'_root'" :style="(editable?'min-height:200px;':'')+containerStyle" @tap="_containTap">
    <slot v-if="!nodes[0]" />
    <!-- #ifndef APP-PLUS-NVUE -->
    <node v-else :childs="nodes" :opts="[lazyLoad,loadingImg,errorImg,showImgMenu,selectable,editable,placeholder,'nodes']" name="span" />
    <!-- #endif -->
    <!-- #ifdef APP-PLUS-NVUE -->
    <web-view ref="web" src="/static/app-plus/mp-html/local.html" :style="'margin-top:-2px;height:' + height + 'px'" @onPostMessage="_onMessage" />
    <!-- #endif -->
    <view v-if="tooltip" class="_tooltip_contain" :style="'top:'+tooltip.top+'px'">
      <view class="_tooltip">
        <view v-for="(item, index) in tooltip.items" v-bind:key="index" class="_tooltip_item" :data-i="index" @tap="_tooltipTap">{{item}}</view>
      </view>
    </view>
    <view v-if="slider" class="_slider" :style="'top:'+slider.top+'px'">
      <slider :value="slider.value" :min="slider.min" :max="slider.max" handle-size="14" block-size="14" show-value activeColor="white" style="padding:3px" @changing="_sliderChanging" @change="_sliderChange" />
    </view>
    <view v-if="color" class="_tooltip_contain" :style="'top:'+color.top+'px'">
      <view class="_tooltip" style="overflow-y: hidden;">
        <view v-for="(item, index) in color.items" v-bind:key="index" class="_color_item" :style="'background-color:'+item" :data-i="index" @tap="_colorTap"></view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * mp-html v2.4.2
 * @description 富文本组件
 * @tutorial https://github.com/jin-yufeng/mp-html
 * @property {String} container-style 容器的样式
 * @property {String} content 用于渲染的 html 字符串
 * @property {Boolean} copy-link 是否允许外部链接被点击时自动复制
 * @property {String} domain 主域名，用于拼接链接
 * @property {String} error-img 图片出错时的占位图链接
 * @property {Boolean} lazy-load 是否开启图片懒加载
 * @property {string} loading-img 图片加载过程中的占位图链接
 * @property {Boolean} pause-video 是否在播放一个视频时自动暂停其他视频
 * @property {Boolean} preview-img 是否允许图片被点击时自动预览
 * @property {Boolean} scroll-table 是否给每个表格添加一个滚动层使其能单独横向滚动
 * @property {Boolean | String} selectable 是否开启长按复制
 * @property {Boolean} set-title 是否将 title 标签的内容设置到页面标题
 * @property {Boolean} show-img-menu 是否允许图片被长按时显示菜单
 * @property {Object} tag-style 标签的默认样式
 * @property {Boolean | Number} use-anchor 是否使用锚点链接
 * @event {Function} load dom 结构加载完毕时触发
 * @event {Function} ready 所有图片加载完毕时触发
 * @event {Function} imgtap 图片被点击时触发
 * @event {Function} linktap 链接被点击时触发
 * @event {Function} play 音视频播放时触发
 * @event {Function} error 媒体加载出错时触发
 */
// #ifndef APP-PLUS-NVUE
import node from './node/node'
// #endif
import Parser from './parser'
import emoji from './emoji/index.js'
import card from './card/index.js'
import editable from './editable/index.js'
const plugins=[emoji,card,editable,]
// #ifdef APP-PLUS-NVUE
const dom = weex.requireModule('dom')
// #endif
export default {
  name: 'mp-html',
  data() {
    return {
      tooltip: null,
      slider: null,
      color: null,
      nodes: [],
      // #ifdef APP-PLUS-NVUE
      height: 3
      // #endif
    }
  },
  props: {
    editable: Boolean,
    placeholder: String,
    containerStyle: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    copyLink: {
      type: [Boolean, String],
      default: true
    },
    domain: String,
    errorImg: {
      type: String,
      default: ''
    },
    lazyLoad: {
      type: [Boolean, String],
      default: false
    },
    loadingImg: {
      type: String,
      default: ''
    },
    pauseVideo: {
      type: [Boolean, String],
      default: true
    },
    previewImg: {
      type: [Boolean, String],
      default: true
    },
    scrollTable: [Boolean, String],
    selectable: [Boolean, String],
    setTitle: {
      type: [Boolean, String],
      default: true
    },
    showImgMenu: {
      type: [Boolean, String],
      default: true
    },
    tagStyle: Object,
    useAnchor: [Boolean, Number]
  },
  // #ifdef VUE3
  emits: ['load', 'ready', 'imgtap', 'linktap', 'play', 'error'],
  // #endif
  // #ifndef APP-PLUS-NVUE
  components: {
    node
  },
  // #endif
  watch: {
    editable(val) {
      this.setContent(val ? this.content : this.getContent())
      if (!val)
        this._maskTap()
    },
    content (content) {
      this.setContent(content)
    }
  },
  created () {
    this.plugins = []
    for (let i = plugins.length; i--;) {
      this.plugins.push(new plugins[i](this))
    }
  },
  mounted () {
    if ((this.content || this.editable) && !this.nodes.length) {
      this.setContent(this.content)
    }
  },
  beforeDestroy () {
    this._hook('onDetached')
  },
  methods: {
    _containTap() {
      if (!this._lock && !this.slider && !this.color) {
        this._edit = undefined
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
    },
    _colorTap(e) {
      this._colorcb(e.currentTarget.dataset.i)
      this.$set(this, 'color', null)
    },
    /**
     * @description 将锚点跳转的范围限定在一个 scroll-view 内
     * @param {Object} page scroll-view 所在页面的示例
     * @param {String} selector scroll-view 的选择器
     * @param {String} scrollTop scroll-view scroll-top 属性绑定的变量名
     */
    in (page, selector, scrollTop) {
      // #ifndef APP-PLUS-NVUE
      if (page && selector && scrollTop) {
        this._in = {
          page,
          selector,
          scrollTop
        }
      }
      // #endif
    },

    /**
     * @description 锚点跳转
     * @param {String} id 要跳转的锚点 id
     * @param {Number} offset 跳转位置的偏移量
     * @returns {Promise}
     */
    navigateTo (id, offset) {
      return new Promise((resolve, reject) => {
        if (!this.useAnchor) {
          reject(Error('Anchor is disabled'))
          return
        }
        offset = offset || parseInt(this.useAnchor) || 0
        // #ifdef APP-PLUS-NVUE
        if (!id) {
          dom.scrollToElement(this.$refs.web, {
            offset
          })
          resolve()
        } else {
          this._navigateTo = {
            resolve,
            reject,
            offset
          }
          this.$refs.web.evalJs('uni.postMessage({data:{action:"getOffset",offset:(document.getElementById(' + id + ')||{}).offsetTop}})')
        }
        // #endif
        // #ifndef APP-PLUS-NVUE
        let deep = ' '
        // #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO
        deep = '>>>'
        // #endif
        const selector = uni.createSelectorQuery()
          // #ifndef MP-ALIPAY
          .in(this._in ? this._in.page : this)
          // #endif
          .select((this._in ? this._in.selector : '._root') + (id ? `${deep}#${id}` : '')).boundingClientRect()
        if (this._in) {
          selector.select(this._in.selector).scrollOffset()
            .select(this._in.selector).boundingClientRect()
        } else {
          // 获取 scroll-view 的位置和滚动距离
          selector.selectViewport().scrollOffset() // 获取窗口的滚动距离
        }
        selector.exec(res => {
          if (!res[0]) {
            reject(Error('Label not found'))
            return
          }
          const scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + offset
          if (this._in) {
            // scroll-view 跳转
            this._in.page[this._in.scrollTop] = scrollTop
          } else {
            // 页面跳转
            uni.pageScrollTo({
              scrollTop,
              duration: 300
            })
          }
          resolve()
        })
        // #endif
      })
    },

    /**
     * @description 获取文本内容
     * @return {String}
     */
    getText (nodes) {
      let text = '';
      (function traversal (nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          if (node.type === 'text') {
            text += node.text.replace(/&amp;/g, '&')
          } else if (node.name === 'br') {
            text += '\n'
          } else {
            // 块级标签前后加换行
            const isBlock = node.name === 'p' || node.name === 'div' || node.name === 'tr' || node.name === 'li' || (node.name[0] === 'h' && node.name[1] > '0' && node.name[1] < '7')
            if (isBlock && text && text[text.length - 1] !== '\n') {
              text += '\n'
            }
            // 递归获取子节点的文本
            if (node.children) {
              traversal(node.children)
            }
            if (isBlock && text[text.length - 1] !== '\n') {
              text += '\n'
            } else if (node.name === 'td' || node.name === 'th') {
              text += '\t'
            }
          }
        }
      })(nodes || this.nodes)
      return text
    },

    /**
     * @description 获取内容大小和位置
     * @return {Promise}
     */
    getRect () {
      return new Promise((resolve, reject) => {
        uni.createSelectorQuery()
          // #ifndef MP-ALIPAY
          .in(this)
          // #endif
          .select('#_root').boundingClientRect().exec(res => res[0] ? resolve(res[0]) : reject(Error('Root label not found')))
      })
    },

    /**
     * @description 暂停播放媒体
     */
    pauseMedia () {
      for (let i = (this._videos || []).length; i--;) {
        this._videos[i].pause()
      }
      // #ifdef APP-PLUS
      const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].pause()'
      // #ifndef APP-PLUS-NVUE
      let page = this.$parent
      while (!page.$scope) page = page.$parent
      page.$scope.$getAppWebview().evalJS(command)
      // #endif
      // #ifdef APP-PLUS-NVUE
      this.$refs.web.evalJs(command)
      // #endif
      // #endif
    },

    /**
     * @description 设置媒体播放速率
     * @param {Number} rate 播放速率
     */
    setPlaybackRate (rate) {
      this.playbackRate = rate
      for (let i = (this._videos || []).length; i--;) {
        this._videos[i].playbackRate(rate)
      }
      // #ifdef APP-PLUS
      const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].playbackRate=' + rate
      // #ifndef APP-PLUS-NVUE
      let page = this.$parent
      while (!page.$scope) page = page.$parent
      page.$scope.$getAppWebview().evalJS(command)
      // #endif
      // #ifdef APP-PLUS-NVUE
      this.$refs.web.evalJs(command)
      // #endif
      // #endif
    },

    /**
     * @description 设置内容
     * @param {String} content html 内容
     * @param {Boolean} append 是否在尾部追加
     */
    setContent (content, append) {
      if (!append || !this.imgList) {
        this.imgList = []
      }
      const nodes = new Parser(this).parse(content)
      // #ifdef APP-PLUS-NVUE
      if (this._ready) {
        this._set(nodes, append)
      }
      // #endif
      this.$set(this, 'nodes', append ? (this.nodes || []).concat(nodes) : nodes)

      // #ifndef APP-PLUS-NVUE
      this._videos = []
      this.$nextTick(() => {
        this._hook('onLoad')
        this.$emit('load')
      })

      if (this.lazyLoad || this.imgList._unloadimgs < this.imgList.length / 2) {
        // 设置懒加载，每 350ms 获取高度，不变则认为加载完毕
        let height = 0
        const callback = rect => {
          if (!rect || !rect.height) rect = {}
          // 350ms 总高度无变化就触发 ready 事件
          if (rect.height === height) {
            this.$emit('ready', rect)
          } else {
            height = rect.height
            setTimeout(() => {
              this.getRect().then(callback).catch(callback)
            }, 350)
          }
        }
        this.getRect().then(callback).catch(callback)
      } else {
        // 未设置懒加载，等待所有图片加载完毕
        if (!this.imgList._unloadimgs) {
          this.getRect().then(rect => {
            this.$emit('ready', rect)
          }).catch(() => {
            this.$emit('ready', {})
          })
        }
      }
      // #endif
    },

    /**
     * @description 调用插件钩子函数
     */
    _hook (name) {
      for (let i = plugins.length; i--;) {
        if (this.plugins[i][name]) {
          this.plugins[i][name]()
        }
      }
    },

    // #ifdef APP-PLUS-NVUE
    /**
     * @description 设置内容
     */
    _set (nodes, append) {
      this.$refs.web.evalJs('setContent(' + JSON.stringify(nodes).replace(/%22/g, '') + ',' + JSON.stringify([this.containerStyle.replace(/(?:margin|padding)[^;]+/g, ''), this.errorImg, this.loadingImg, this.pauseVideo, this.scrollTable, this.selectable]) + ',' + append + ')')
    },

    /**
     * @description 接收到 web-view 消息
     */
    _onMessage (e) {
      const message = e.detail.data[0]
      switch (message.action) {
        // web-view 初始化完毕
        case 'onJSBridgeReady':
          this._ready = true
          if (this.nodes) {
            this._set(this.nodes)
          }
          break
        // 内容 dom 加载完毕
        case 'onLoad':
          this.height = message.height
          this._hook('onLoad')
          this.$emit('load')
          break
        // 所有图片加载完毕
        case 'onReady':
          this.getRect().then(res => {
            this.$emit('ready', res)
          }).catch(() => {
            this.$emit('ready', {})
          })
          break
        // 总高度发生变化
        case 'onHeightChange':
          this.height = message.height
          break
        // 图片点击
        case 'onImgTap':
          this.$emit('imgtap', message.attrs)
          if (this.previewImg) {
            uni.previewImage({
              current: parseInt(message.attrs.i),
              urls: this.imgList
            })
          }
          break
        // 链接点击
        case 'onLinkTap': {
          const href = message.attrs.href
          this.$emit('linktap', message.attrs)
          if (href) {
            // 锚点跳转
            if (href[0] === '#') {
              if (this.useAnchor) {
                dom.scrollToElement(this.$refs.web, {
                  offset: message.offset
                })
              }
            } else if (href.includes('://')) {
              // 打开外链
              if (this.copyLink) {
                plus.runtime.openWeb(href)
              }
            } else {
              uni.navigateTo({
                url: href,
                fail () {
                  uni.switchTab({
                    url: href
                  })
                }
              })
            }
          }
          break
        }
        case 'onPlay':
          this.$emit('play')
          break
        // 获取到锚点的偏移量
        case 'getOffset':
          if (typeof message.offset === 'number') {
            dom.scrollToElement(this.$refs.web, {
              offset: message.offset + this._navigateTo.offset
            })
            this._navigateTo.resolve()
          } else {
            this._navigateTo.reject(Error('Label not found'))
          }
          break
        // 点击
        case 'onClick':
          this.$emit('tap')
          this.$emit('click')
          break
        // 出错
        case 'onError':
          this.$emit('error', {
            source: message.source,
            attrs: message.attrs
          })
      }
    }
    // #endif
  }
}
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* 根节点样式 */
._root {
  padding: 1px 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

/* 长按复制 */
._select {
  user-select: text;
}
/* #endif */

/* 提示条 */
._tooltip_contain {
  position: absolute;
  right: 20px;
  left: 20px;
  text-align: center;
}

._tooltip {
  box-sizing: border-box;
  display: inline-block;
  width: auto;
  max-width: 100%;
  height: 30px;
  padding: 0 3px;
  overflow: scroll;
  font-size: 14px;
  line-height: 30px;
  white-space: nowrap;
}

._tooltip_item {
  display: inline-block;
  width: auto;
  padding: 0 2vw;
  line-height: 30px;
  background-color: black;
  color: white;
}

._color_item {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 5px 2vw;
  border:1px solid #dfe2e5;
  border-radius: 50%;
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
</style>
