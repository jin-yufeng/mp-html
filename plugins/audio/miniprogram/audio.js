/**
 * @fileoverview audio 组件
 */
const context = require('./context')

Component({
  data: {
    time: '00:00'
  },
  properties: {
    name: String, // 音乐名
    author: String, // 作者
    poster: String, // 海报图片地址
    autoplay: Boolean, // 是否自动播放
    controls: Boolean, // 是否显示控件
    loop: Boolean, // 是否循环播放
    src: { // 源地址
      type: String,
      observer (src) {
        this.setSrc(src)
      }
    }
  },
  created () {
    // 创建内部 context
    this._ctx = wx.createInnerAudioContext()
    this._ctx.onError(err => {
      this.setData({
        error: true
      })
      this.triggerEvent('error', err)
    })
    this._ctx.onTimeUpdate(() => {
      const time = this._ctx.currentTime
      const min = parseInt(time / 60)
      const sec = Math.ceil(time % 60)
      const data = {}
      data.time = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      // 不在拖动状态下需要更新进度条
      if (!this.lastTime) {
        data.value = time / this._ctx.duration * 100
      }
      this.setData(data)
    })
    this._ctx.onEnded(() => {
      if (!this.properties.loop) {
        this.setData({
          playing: false
        })
      }
    })
    // #ifndef ALIPAY
  },
  attached () {
    context.set(this.id, this)
    // #endif
    // #ifdef MP-ALIPAY
    context.set(this.properties.id, this)
    this.setSrc(this.properties.src)
    // #endif
  },
  // #ifdef MP-ALIPAY
  didUpdate (e) {
    if (e.src !== this.properties.src) {
      this.setSrc(this.properties.src)
    }
  },
  // #endif
  detached () {
    this._ctx.destroy()
    // #ifndef MP-ALIPAY
    context.remove(this.id)
    // #endif
    // #ifdef MP_ALIPAY
    context.remove(this.properties.id)
    // #endif
  },
  // #ifndef ALIPAY | TOUTIAO
  pageLifetimes: {
    show () {
      // 播放被后台打断时，页面显示后自动继续播放
      if (this.data.playing && this._ctx.paused) {
        this._ctx.play()
      }
    }
  },
  // #endif
  methods: {
    /**
     * @description 设置源
     * @param {string} src 源地址
     */
    setSrc (src) {
      this._ctx.autoplay = this.properties.autoplay
      this._ctx.loop = this.properties.loop
      this._ctx.src = src
      if (this.properties.autoplay && !this.data.playing) {
        this.setData({
          playing: true
        })
      }
    },

    /**
     * @description 播放音乐
     */
    play () {
      this._ctx.play()
      this.setData({
        playing: true
      })
      this.triggerEvent('play'
        // #ifdef MP-ALIPAY
        , {
          target: {
            id: this.props.id
          }
        }
        // #endif
      )
    },

    /**
     * @description 暂停音乐
     */
    pause () {
      this._ctx.pause()
      this.setData({
        playing: false
      })
      this.triggerEvent('pause')
    },

    /**
     * @description 设置播放速率
     * @param {Number} rate 播放速率
     */
    playbackRate (rate) {
      this._ctx.playbackRate = rate
    },

    /**
     * @description 停止音乐
     */
    stop () {
      this._ctx.stop()
      this.setData({
        playing: false,
        time: '00:00'
      })
      this.triggerEvent('stop')
    },

    /**
     * @description 控制进度
     * @param {number} sec 秒数
     */
    seek (sec) {
      this._ctx.seek(sec)
    },

    /**
     * @description 移动进度条
     * @param {event} e
     * @private
     */
    _seeking (e) {
      // 避免过于频繁 setData
      if (e.timeStamp - this.lastTime < 200) return
      const time = Math.round(e.detail.value / 100 * this._ctx.duration)
      const min = parseInt(time / 60)
      const sec = time % 60
      this.setData({
        time: (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      })
      this.lastTime = e.timeStamp
    },

    /**
     * @description 进度条移动完毕
     * @param {event} e
     * @private
     */
    _seeked (e) {
      this._ctx.seek(e.detail.value / 100 * this._ctx.duration)
      this.lastTime = undefined
    }
  }
})
