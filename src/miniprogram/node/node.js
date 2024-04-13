/**
 * @fileoverview 递归子组件，用于显示节点树
 */
Component({
  data: {
    ctrl: {}, // 控制信号
    // #ifdef MP-WEIXIN
    isiOS: wx.getSystemInfoSync().system.includes('iOS')
    // #endif
  },
  properties: {
    childs: Array, // 子节点列表
    opts: Array // 设置 [是否开启懒加载, 加载中占位图, 错误占位图, 是否使用长按菜单]
  },
  options: {
    addGlobalClass: true
  },
  // #ifndef MP-TOUTIAO
  attached () {
    // #ifndef MP-ALIPAY
    this.triggerEvent('add', this, {
      bubbles: true,
      composed: true
    })
    // #endif
    // #ifdef MP-ALIPAY
    this.props.onAdd(this)
    // #endif
  },
  // #endif
  methods: {
    noop () { },
    /**
     * @description 获取标签
     * @param {String} path 路径
     */
    getNode (path) {
      try {
        const nums = path.split('_')
        let node = this.properties.childs[nums[0]]
        for (let i = 1; i < nums.length; i++) {
          node = node.children[nums[i]]
        }
        return node
      } catch {
        return {
          text: '',
          attrs: {},
          children: []
        }
      }
    },
    /**
     * @description 播放视频事件
     * @param {Event} e
     */
    play (e) {
      const i = e.target.dataset.i
      const node = this.getNode(i)
      this.root.triggerEvent('play', {
        source: node.name,
        attrs: {
          ...node.attrs,
          src: node.src[this.data.ctrl[i] || 0]
        }
      })
      if (this.root.properties.pauseVideo) {
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
          const ctx = wx.createVideoContext(id
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
    },

    /**
     * @description 图片点击事件
     * @param {Event} e
     */
    imgTap (e) {
      const node = this.getNode(e.target.dataset.i)
      // 父级中有链接
      if (node.a) return this.linkTap(node.a)
      if (node.attrs.ignore) return
      this.root.triggerEvent('imgtap', node.attrs)
      if (this.root.properties.previewImg) {
        const current =
          // #ifndef MP-ALIPAY
          this.root.imgList[node.i]
        // #endif
        // #ifdef MP-ALIPAY
        node.i // eslint-disable-line
        // #endif
        // 自动预览图片
        wx.previewImage({
          // #ifdef MP-WEIXIN
          showmenu: this.root.properties.showImgMenu,
          // #endif
          // #ifdef MP-ALIPAY
          enablesavephoto: this.root.properties.showImgMenu,
          enableShowPhotoDownload: this.root.properties.showImgMenu,
          // #endif
          current,
          urls: this.root.imgList
        })
      }
    },

    /**
     * @description 图片加载完成事件
     * @param {Event} e
     */
    imgLoad (e) {
      const i = e.target.dataset.i
      const node = this.getNode(i)
      let val
      if (!node.w) {
        val = e.detail.width
      } else if ((this.properties.opts[1] && !this.data.ctrl[i]) || this.data.ctrl[i] === -1) {
        // 加载完毕，取消加载中占位图
        val = 1
      }
      if (val
        // #ifdef MP-TOUTIAO
        && val !== this.data.ctrl[i] // eslint-disable-line
        // #endif
      ) {
        this.setData({
          ['ctrl.' + i]: val
        })
      }
      this.checkReady()
    },

    /**
     * @description 检查是否所有图片加载完毕
     */
    checkReady () {
      if (!this.root.properties.lazyLoad) {
        this.root.imgList._unloadimgs -= 1
        if (!this.root.imgList._unloadimgs) {
          setTimeout(() => {
            this.root.getRect().then(rect => {
              this.root.triggerEvent('ready', rect)
            }).catch(() => {
              this.root.triggerEvent('ready', {})
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
      const node = e.currentTarget ? this.getNode(e.currentTarget.dataset.i) : {}
      const attrs = node.attrs || e
      const href = attrs.href
      this.root.triggerEvent('linktap', Object.assign({
        innerText: this.root.getText(node.children || []) // 链接内的文本内容
      }, attrs))
      if (href) {
        if (href[0] === '#') {
          // 跳转锚点
          this.root.navigateTo(href.substring(1)).catch(() => { })
        } else if (href.split('?')[0].includes('://')) {
          // 复制外部链接
          if (this.root.properties.copyLink) {
            wx.setClipboardData({
              data: href,
              success: () =>
                wx.showToast({
                  title: '链接已复制'
                })
            })
          }
        } else {
          // 跳转页面
          wx.navigateTo({
            url: href,
            fail () {
              wx.switchTab({
                url: href,
                fail () { }
              })
            }
          })
        }
      }
    },

    /**
     * @description 错误事件
     * @param {Event} e
     */
    mediaError (e) {
      const i = e.target.dataset.i
      const node = this.getNode(i)
      if (node.name === 'video' || node.name === 'audio') {
        // 加载其他源
        let index = (this.data.ctrl[i] || 0) + 1
        if (index > node.src.length) {
          index = 0
        }
        if (index < node.src.length) {
          return this.setData({
            ['ctrl.' + i]: index
          })
        }
      } else if (node.name === 'img') {
        // 显示错误占位图
        if (this.properties.opts[2]) {
          this.setData({
            ['ctrl.' + i]: -1
          })
        }
        this.checkReady()
      }
      if (this.root) {
        this.root.triggerEvent('error', {
          source: node.name,
          attrs: node.attrs,
          errMsg: e.detail.errMsg
        })
      }
    }
  }
})
