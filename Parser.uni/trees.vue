<template>
	<view style="display: inherit;white-space: inherit;">
		<block v-for='(item, index) in nodes' v-bind:key='index'>
			<block v-if="!item.continue">
				<!--图片-->
				<!--#ifdef MP-WEIXIN || MP-QQ -->
				<rich-text v-if="item.name=='img'" class="img" :style="'text-indent:0;'+handler.getStyle(item.attrs.style,'inline-block')"
				 :nodes='handler.setImgStyle(item,imgMode,imgLoad)' :data-ignore='item.attrs.ignore' :data-src='item.attrs.src'
				 @tap='previewEvent' />
				<!--文本-->
				<block v-else-if="item.type=='text'">
					<text v-if="!item.decode" decode>{{item.text}}</text>
					<rich-text v-else style="display:inline-block" :nodes="[item]"></rich-text>
				</block>
				<!--#endif-->
				<!--#ifdef MP-ALIPAY-->
				<rich-text v-if="item.name=='img'" :style="'text-indent:0;'+handler.getStyle(item.attrs.style,'inline-block')"
				 :nodes='handler.setImgStyle(item,imgMode)' :data-ignore='item.attrs.ignore' :data-src='item.attrs.src' @tap='previewEvent' />
				<!--文本-->
				<text v-else-if="item.type=='text'" decode>{{item.text}}</text>
				<!--#endif-->
				<!--#ifdef MP-BAIDU || MP-TOUTIAO || H5-->
				<rich-text v-if="item.name=='img'" :style="'text-indent:0;'+item.attrs.containStyle" :nodes='[item]' :data-ignore='item.attrs.ignore'
				 :data-src='item.attrs.src' @tap='previewEvent' />
				<!--#endif-->
				<text v-else-if="item.name=='br'">\n</text>
				<!--视频-->
				<block v-else-if="item.name=='video'">
					<view v-if="item.attrs.id[item.attrs.id.length-1]>'3'&&!controls[item.attrs.id].play" :class="'video '+(item.attrs.class||'')"
					 :style="item.attrs.style" :data-id="item.attrs.id" @tap="_loadVideo">
						<view class="video-triangle"></view>
					</view>
					<video v-else-if :src='controls[item.attrs.id]?item.attrs.source[controls[item.attrs.id].index]:item.attrs.src'
					 :id="item.attrs.id" :loop='item.attrs.loop' :controls='item.attrs.controls' :autoplay="item.attrs.autoplay||(controls[item.attrs.id]&&controls[item.attrs.id].play)"
					 :unit-id="item.attrs['unit-id']" :class="'v '+(item.attrs.class||'')" :muted="item.attrs.muted" :style="item.attrs.style"
					 :data-id="item.attrs.id" :data-source="item.attrs.source" @play='playEvent' @error="videoError" />
				</block>
				<!--音频-->
				<audio v-else-if="item.name=='audio'" :src='controls[item.attrs.id]?item.attrs.source[controls[item.attrs.id].index]:item.attrs.src'
				 :id="item.attrs.id" :loop='item.attrs.loop' :controls='item.attrs.controls' :poster='item.attrs.poster' :name='item.attrs.name'
				 :author='item.attrs.author' :class="item.attrs.class||''" :style="item.attrs.style" :data-id="item.attrs.id"
				 :data-source="item.attrs.source" @error="audioError" />
				<!--链接-->
				<view v-else-if="item.name=='a'" :class="'a '+(item.attrs.class||'')" :style="item.attrs.style" :data-href='item.attrs.href'
				 hover-class="navigator-hover" :hover-start-time="25" :hover-stay-time="300" @tap="tapEvent">
					<!--#ifdef H5-->
					<trees :nodes="item.children" :imgMode="imgMode" />
					<!--#endif-->
					<!--#ifndef H5-->
					<trees :nodes="item.children" :imgMode="imgMode" :lazyLoad="lazyLoad" />
					<!--#endif-->
				</view>
				<!--广告-->
				<!--#ifdef MP-WEIXIN || MP-QQ-->
				<ad v-else-if="item.name=='ad'" :unit-id="item.attrs['unit-id']" :class="item.attrs.class||''" :style="item.attrs.style"
				 @error="adError"></ad>
				<!--#endif-->
				<!--#ifdef MP-BAIDU-->
				<ad v-else-if="item.name=='ad'" :appid="item.attrs.appid" :apid="item.attrs.apid" :type="item.attrs.type" :class="item.attrs.class||''"
				 :style="item.attrs.style" @error="adError"></ad>
				<!--#endif-->
				<!--富文本-->
				<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY-->
				<rich-text v-else :class="item.name" :style="''+handler.getStyle(item.attrs.style,'block')" :nodes="handler.setStyle(item)" />
				<!--#endif-->
				<!--#ifdef MP-BAIDU || MP-TOUTIAO || H5-->
				<rich-text v-else :style="item.attrs?item.attrs.containStyle:''" :nodes="[item]" />
				<!--#endif-->
			</block>
			<!--#ifdef MP-ALIPAY || H5-->
			<view v-else :class="item.name+' '+(item.attrs.class||'')" :style="item.attrs.style">
				<trees :nodes="item.children" :imgMode="imgMode" />
			</view>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY || H5-->
			<trees v-else :class="item.name+' '+(item.attrs.class||'')" :style="item.attrs.style" :nodes="item.children"
			 :imgMode="imgMode" :lazyLoad="lazyLoad" />
			<!--#endif-->
		</block>
	</view>
</template>
<script module="handler" lang="wxs" src="./handler.wxs"></script>
<script module="handler" lang="sjs" src="./handler.sjs"></script>
<script>
	import trees from "./trees"
	export default {
		components: {
			trees
		},
		name: 'trees',
		data() {
			return {
				controls: {},
				// #ifdef MP-WEIXIN || MP-QQ
				imgLoad: false
				// #endif
			}
		},
		props: {
			nodes: {
				type: Array,
				default: []
			},
			// #ifdef MP-WEIXIN || MP-QQ
			lazyLoad: {
				type: Boolean,
				default: false
			},
			// #endif
			imgMode: {
				type: String,
				default: "default"
			}
		},
		mounted() {
			// 获取顶层组件
			this._top = this.$parent;
			while (this._top.$options.name!='parser') {
				if (this._top._top) {
					this._top = this._top._top;
					break;
				}
				this._top = this._top.$parent;
			}
		},
		// #ifdef MP-WEIXIN || MP-QQ
		beforeDestroy() {
			if (this._observer)
				this._observer.disconnect();
		},
		// #endif
		methods: {
			// #ifndef MP-ALIPAY
			playEvent(e) {
				if (this._top.videoContext.length > 1 && this._top.autopause) {
					for (let video of this._top.videoContext) {
						if (video.id == e.currentTarget.dataset.id) continue;
						video.context.pause();
					}
				}
			},
			// #endif
			previewEvent(e) {
				if (!e.currentTarget.dataset.ignore) {
					if (this._top.autopreview) {
						uni.previewImage({
							current: e.currentTarget.dataset.src,
							urls: this._top.imgList.length ? this._top.imgList : [e.currentTarget.dataset.src]
						});
					}
					this._top.$emit('imgtap', {
						src: e.currentTarget.dataset.src
					});
				}
			},
			tapEvent(e) {
				this._top.$emit('linkpress', {
					href: e.currentTarget.dataset.href
				});
				if (!e.currentTarget.dataset.href)
					return;
				if (/^http/.test(e.currentTarget.dataset.href)) {
					// #ifndef H5
					if (this._top.autocopy)
						uni.setClipboardData({
							data: e.currentTarget.dataset.href,
							success() {
								uni.showToast({
									title: '链接已复制'
								});
							}
						});
					// #endif
					// #ifdef H5
					window.location.href = e.currentTarget.dataset.href;
					// #endif
				} else
					uni.navigateTo({
						url: e.currentTarget.dataset.href
					})
			},
			triggerError(source, target, errMsg, errCode) {
				this._top.$emit('error', {
					source,
					target,
					errMsg,
					errCode
				});
			},
			loadSource(currentTarget) {
				if (!this.controls[currentTarget.id] && currentTarget.source.length > 1) {
					this.$set(this.controls, currentTarget.id, {
						play: false,
						index: 1
					})
				} else if (this.controls[currentTarget.id] && currentTarget.source.length > this.controls[
						currentTarget.id].index + 1) {
					this.$set(this.controls[currentTarget.id], index, this.controls[currentTarget.id].index + 1);
				}
			},
			adError(e) {
				this.triggerError("ad", e.currentTarget, "", e.detail.errorCode);
			},
			videoError(e) {
				this.loadSource(e.currentTarget.dataset);
				this.triggerError("video", e.currentTarget, e.detail.errMsg);
			},
			audioError(e) {
				this.loadSource(e.currentTarget.dataset);
				this.triggerError("audio", e.currentTarget, e.detail.errMsg);
			},
			_loadVideo(e) {
				this.controls[e.currentTarget.dataset.id] = {
					play: true,
					index: 0
				};
			}
		}
	}
</script>

<style>
	/* 可以在这里引入自定义的外部样式 */

	/* 链接受到点击的hover-class，可自定义修改 */
	.navigator-hover {
		opacity: 0.7;
		text-decoration: underline;
	}

	/* 以下内容不建议修改 */
	:host {
		display: inherit;
		float: inherit;
	}

	.a {
		display: inline;
		color: #366092;
	}

	/* #ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY */
	.sub,
	.sup,
	.bdo,
	.bdi,
	.ruby,
	.rt {
		display: inline-block !important;
	}

	/* #endif */

	.div,
	.blockquote,
	.p {
		display: block;
	}

	.b,
	.strong {
		display: inline;
		font-weight: bold;
	}

	.em,
	.i {
		display: inline;
		font-style: italic;
	}

	.del {
		display: inline;
		text-decoration: line-through;
	}

	.ins {
		display: inline;
		text-decoration: underline;
	}

	.code {
		display: inline;
		font-family: monospace;
	}

	.big {
		font-size: 1.2em;
		display: inline;
	}

	.small {
		font-size: 0.8em;
		display: inline;
	}

	.q,
	.span,
	.label,
	.abbr {
		display: inline;
	}

	.q::before {
		content: '"';
	}

	.q::after {
		content: '"';
	}

	.video {
		background-color: black;
		width: 300px;
		height: 225px;
		display: inline-block;
		position: relative;
	}

	.video-triangle {
		border-width: 15px 0 15px 30px;
		border-style: solid;
		border-color: transparent transparent transparent white;
		position: absolute;
		left: 50%;
	}
</style>
