/*
  audio 扩展包
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
Component({
  data: {
    time: '00:00'
  },
  properties: {
    author: String,
    autoplay: Boolean,
    controls: Boolean,
    loop: Boolean,
    name: String,
    poster: String,
    src: {
      type: String,
      observer(src) {
        this.setSrc(src);
      }
    }
  },
  created() {
    this._ctx = wx.createInnerAudioContext();
    this._ctx.onError((err) => {
      this.setData({
        error: true
      })
      this.triggerEvent('error', err);
    })
    this._ctx.onTimeUpdate(() => {
      var time = this._ctx.currentTime,
        min = parseInt(time / 60),
        sec = Math.ceil(time % 60),
        data = {};
      data.time = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
      if (!this.lastTime) data.value = time / this._ctx.duration * 100; // 不在拖动状态下
      this.setData(data);
    })
    this._ctx.onEnded(() => {
      this.setData({
        playing: false
      })
    })
  },
  detached() {
    this._ctx.destroy();
  },
  pageLifetimes: {
    show() {
      if (this.data.playing && this._ctx.paused)
        this._ctx.play();
    }
  },
  methods: {
    // 设置源
    setSrc(src) {
      this._ctx.autoplay = this.data.autoplay;
      this._ctx.loop = this.data.loop;
      this._ctx.src = src;
    },
    // 播放
    play() {
      this._ctx.play();
      this.setData({
        playing: true
      })
      this.triggerEvent('play');
    },
    // 暂停
    pause() {
      this._ctx.pause();
      this.setData({
        playing: false
      })
      this.triggerEvent('pause');
    },
    // 移动进度条
    seek(sec) {
      this._ctx.seek(sec);
    },
    // 内部方法
    _seeking(e) {
      if (e.timeStamp - this.lastTime < 200) return;
      var time = Math.round(e.detail.value / 100 * this._ctx.duration),
        min = parseInt(time / 60),
        sec = time % 60;
      this.setData({
        time: (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      })
      this.lastTime = e.timeStamp;
    },
    _seeked(e) {
      this.seek(e.detail.value / 100 * this._ctx.duration);
      this.lastTime = void 0;
    }
  }
})