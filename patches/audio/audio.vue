<template>
	<view v-if="controls" class="contain">
		<slider class="slider" activeColor="#585959" block-size="12" handle-size="12" :disabled="error" :value="value"
		 @changing="_seeking" @change="_seeked" />
		<view class="poster" :style="'background-image:url('+poster+')'">
			<view class="button" @tap="_buttonTap">
				<view :class="playing?'pause':'play'" />
			</view>
		</view>
		<view class="title">
			<view class="name">{{name||'未知音频'}}</view>
			<view class="author">{{author||'未知作者'}}</view>
		</view>
		<view class="time">{{time||'00:00'}}</view>
	</view>
</template>

<script>
	/**
	 * audio 扩展包
	 * @tutorial https://github.com/jin-yufeng/Parser
	 * @author JinYufeng
	 */
	export default {
		data() {
			return {
				error: false,
				playing: false,
				time: '00:00',
				value: 0
			}
		},
		props: {
			author: String,
			autoplay: null,
			controls: null,
			loop: null,
			name: String,
			poster: String,
			src: String
		},
		watch: {
			src(src) {
				this.setSrc(src);
			}
		},
		// #ifdef MP-ALIPAY
		beforeDestroy() {
			clearInterval(this._timer);
		},
		// #endif
		mounted() {
			this._ctx = uni.createInnerAudioContext();
			this._ctx.onError((err) => {
				this.error = true;
				err.context = this;
				this.$emit('error', err);
			})
			// #ifdef MP-ALIPAY
			this._timer = setInterval(() => {
				if (this._ctx.paused) return;
				// #endif
				// #ifndef MP-ALIPAY
				this._ctx.onTimeUpdate(() => {
					// #endif
					var time = this._ctx.currentTime,
						min = parseInt(time / 60),
						sec = Math.ceil(time % 60);
					this.time = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
					if (!this.lastTime) this.value = time / this._ctx.duration * 100; // 不在拖动状态下
					// #ifndef MP-ALIPAY
				})
				// #endif
				// #ifdef MP-ALIPAY
			}, 1000);
			// #endif
			this._ctx.onEnded(() => {
				this.playing = false;
			});
			this.setSrc(this.src);
		},
		onPageShow() {
			if (this.playing && this._ctx.paused)
				this._ctx.play();
		},
		methods: {
			toJSON() {},
			// 设置源
			setSrc(src) {
				this._ctx.autoplay = this.autoplay;
				this._ctx.loop = this.loop;
				this._ctx.src = src;
			},
			// 播放
			play() {
				this._ctx.play();
				this.playing = true;
				this.$emit('play');
			},
			// 暂停
			pause() {
				this._ctx.pause();
				this.playing = false;
				this.$emit('pause');
			},
			// 移动进度条
			seek(sec) {
				this._ctx.seek(sec);
			},
			// 内部方法
			_buttonTap() {
				if (this.playing) this.pause();
				else this.play();
			},
			_seeking(e) {
				if (e.timeStamp - this.lastTime < 200) return;
				var time = Math.round(e.detail.value / 100 * this._ctx.duration),
					min = parseInt(time / 60),
					sec = time % 60;
				this.time = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
				this.lastTime = e.timeStamp;
			},
			_seeked(e) {
				this.seek(e.detail.value / 100 * this._ctx.duration);
				this.lastTime = void 0;
			}
		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	:host {
		display: inline-block;
	}

	/* #endif */

	.author {
		width: 140rpx;
		font-size: 28rpx;
		color: #888;
	}

	.author,
	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 47rpx;
		height: 47rpx;
		overflow: hidden;
		background-color: rgb(0, 0, 0, 0.2);
		border: 3.5rpx solid white;
		border-radius: 50%;
		opacity: 0.9;
	}

	.contain {
		/* #endif */
		position: relative;

		/* #ifdef MP-WEIXIN */
		display: flex;

		/* #endif */

		/* #ifndef MP-WEIXIN */
		display: inline-flex;
		width: 680rpx;
		background-color: #fcfcfc;
		border: 1px solid #e0e0e0;
		border-radius: 2px;
	}

	.name {
		width: 320rpx;
		font-size: 33rpx;
		line-height: 80rpx;
	}

	.pause {
		width: 16.5rpx;
		height: 16.5rpx;
		background-color: white;
	}

	.play {
		margin-left: 5rpx;
		border-top: 10rpx solid transparent;
		border-bottom: 10rpx solid transparent;
		border-left: 18rpx solid white;
	}

	.poster {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 152.35rpx;
		height: 152.35rpx;
		background-color: #e6e6e6;
		background-size: contain;
	}

	.slider {
		position: absolute;
		right: 35.15rpx;
		bottom: 18.75rpx;
		width: 316.4rpx;
		margin: 0;
	}

	.title {
		flex: 1;
		margin: 10rpx 0 0 35.15rpx;
		text-align: left;
	}

	.time {
		margin: 16.4rpx 35.15rpx 0 0;
		font-size: 28rpx;
		color: #888;
	}
</style>
