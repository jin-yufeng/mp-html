<template>
	<view v-if="controls" class="_contain">
    <!-- 海报和按钮 -->
		<view class="_poster" :style="'background-image:url('+poster+')'">
			<view class="_button" @tap="_buttonTap">
				<view :class="playing?'_pause':'_play'" />
			</view>
		</view>
    <!-- 曲名和作者 -->
		<view class="_title">
			<view class="_name">{{name||'未知音频'}}</view>
			<view class="_author">{{author||'未知作者'}}</view>
		</view>
    <!-- 进度条 -->
    <slider class="_slider" activeColor="#585959" block-size="12" handle-size="12" :disabled="error" :value="value" @changing="_seeking" @change="_seeked" />
    <!--播放时间-->
		<view class="_time">{{time||'00:00'}}</view>
	</view>
</template>

<script>
/**
 * @fileoverview audio 组件
 */
const context = require('./context')
export default {
  data () {
    return {
      error: false,
      playing: false,
      time: '00:00',
      value: 0
    }
  },
  props: {
    aid: String,
    name: String, // 音乐名
    author: String, // 作者
    poster: String, // 海报图片地址
    autoplay: [Boolean, String], // 是否自动播放
    controls: [Boolean, String], // 是否显示控件
    loop: [Boolean, String], // 是否循环播放
    src: String // 源地址
  },
  watch: {
    src (src) {
      this.setSrc(src)
    }
  },
  mounted () {
    this._ctx = uni.createInnerAudioContext()
    this._ctx.onError((err) => {
      this.error = true
      this.$emit('error', err)
    })
    this._ctx.onTimeUpdate(() => {
      const time = this._ctx.currentTime
      const min = parseInt(time / 60)
      const sec = Math.ceil(time % 60)
      this.time = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      if (!this.lastTime) {
        this.value = time / this._ctx.duration * 100 // 不在拖动状态下
      }
    })
    this._ctx.onEnded(() => {
      if (!this.loop) {
        this.playing = false
      }
    })
    context.set(this.aid, this)
    this.setSrc(this.src)
  },
  beforeDestroy () {
    this._ctx.destroy()
    context.remove(this.properties.audioId)
  },
  onPageShow () {
    if (this.playing && this._ctx.paused) {
      this._ctx.play()
    }
  },
  methods: {
    // 设置源
    setSrc (src) {
      this._ctx.autoplay = this.autoplay
      this._ctx.loop = this.loop
      this._ctx.src = src
      if (this.autoplay && !this.playing) {
        this.playing = true
      }
    },
    // 播放
    play () {
      this._ctx.play()
      this.playing = true
      this.$emit('play', {
        target: {
          id: this.aid
        }
      })
    },
    // 暂停
    pause () {
      this._ctx.pause()
      this.playing = false
      this.$emit('pause')
    },
    // 移动进度条
    seek (sec) {
      this._ctx.seek(sec)
    },
    // 内部方法
    _buttonTap () {
      if (this.playing) this.pause()
      else this.play()
    },
    _seeking (e) {
      // 避免过于频繁 setData
      if (e.timeStamp - this.lastTime < 200) return
      const time = Math.round(e.detail.value / 100 * this._ctx.duration)
      const min = parseInt(time / 60)
      const sec = time % 60
      this.time = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      this.lastTime = e.timeStamp
    },
    _seeked (e) {
      this.seek(e.detail.value / 100 * this._ctx.duration)
      this.lastTime = undefined
    }
  }
}
</script>

<style>
/* 顶层容器 */
._contain {
  position: relative;
  display: inline-flex;
  width: 290px;
  background-color: #fcfcfc;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
}

/* 播放、暂停按钮 */
._button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background-color: rgb(0, 0, 0, 0.2);
  border: 1px solid white;
  border-radius: 50%;
  opacity: 0.9;
}

._play {
  margin-left: 2px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 8px solid white;
}

._pause {
  width: 8px;
  height: 8px;
  background-color: white;
}

/* 海报 */
._poster {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background-color: #e6e6e6;
  background-size: contain;
}

/* 标题栏 */
._title {
  flex: 1;
  margin: 4px 0 0 14px;
  text-align: left;
}

._author {
  width: 45px;
  font-size: 12px;
  color: #888;
}

._name {
  width: 140px;
  font-size: 15px;
  line-height: 39px;
}

._author,
._name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 进度条 */
._slider {
  position: absolute;
  right: 16px;
  bottom: 8px;
  width: 140px;
  margin: 0;
}

/* 播放时间 */
._time {
  margin: 7px 14px 0 0;
  font-size: 12px;
  color: #888;
}

/* 响应式布局，大屏幕用更大的尺寸 */
@media (min-width: 400px) {
  ._contain {
    width: 380px;
  }

  ._button {
    width: 26px;
    height: 26px;
  }

  ._poster {
    width: 90px;
    height: 90px;
  }

  ._author {
    width: 60px;
    font-size: 15px;
  }

  ._name {
    width: 180px;
    font-size: 19px;
    line-height: 55px;
  }

  ._slider {
    right: 20px;
    bottom: 10px;
    width: 180px;
  }

  ._time {
    font-size: 15px;
  }
}
</style>
