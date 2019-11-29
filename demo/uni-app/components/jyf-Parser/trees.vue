<template>
	<view style="display: inherit;white-space: inherit;">
		<block v-for='(item, index) in nodes' v-bind:key='index'>
			<!--#ifdef MP-WEIXIN || MP-QQ || APP-PLUS || MP-ALIPAY-->
			<block v-if="handler.isContinue(item)">
				<!--#endif-->
				<!--#ifdef MP-BAIDU || MP-TOUTIAO || H5-->
				<block v-if="!item.continue">
					<!--#endif-->
					<!--图片-->
					<!--#ifdef MP-WEIXIN || MP-QQ || APP-PLUS-->
					<rich-text v-if="item.name=='img'" class="img" :style="'text-indent:0;'+handler.getStyle(item.attrs.style,'inline-block')"
					 :nodes='handler.setImgStyle(item,imgMode,imgLoad)' :data-ignore='item.attrs.ignore' :data-src='item.attrs.src'
					 :data-current='item.current' @tap='previewEvent' />
					<!--#endif-->
					<!--#ifdef MP-ALIPAY-->
					<rich-text v-if="item.name=='img'" :style="'text-indent:0;'+handler.getStyle(item.attrs.style,'inline-block')"
					 :nodes='handler.setImgStyle(item,imgMode)' :data-ignore='item.attrs.ignore' :data-src='item.attrs.src'
					 :data-current='item.current' @tap='previewEvent' />
					<!--#endif-->
					<!--#ifdef MP-BAIDU || MP-TOUTIAO || H5-->
					<rich-text v-if="item.name=='img'" :style="'text-indent:0;'+item.attrs.containStyle" :nodes='[item]' :data-ignore='item.attrs.ignore'
					 :data-src='item.attrs.src' :data-current='item.current' @tap='previewEvent' />
					<!--#endif-->
					<!--文本-->
					<!--#ifdef MP-WEIXIN || MP-QQ || H5 || APP-PLUS-->
					<block v-else-if="item.type=='text'">
						<text v-if="!item.decode" decode>{{item.text}}</text>
						<rich-text v-else style="display:inline-block" :nodes="[item]"></rich-text>
					</block>
					<!--#endif-->
					<!--#ifdef MP-ALIPAY-->
					<text v-else-if="item.type=='text'" decode>{{item.text}}</text>
					<!--#endif-->
					<text v-else-if="item.name=='br'">\n</text>
					<!--视频-->
					<block v-else-if="item.name=='video'">
						<!--#ifdef APP-PLUS-->
						<view v-if="(!loadVideo||item.attrs.id[item.attrs.id.length-1]>'3')&&(!controls[item.attrs.id]||!controls[item.attrs.id].play)"
						 :class="'pvideo '+(item.attrs.class||'')" :style="item.attrs.style" :data-id="item.attrs.id" @tap="_loadVideo">
							<view class="video-triangle"></view>
						</view>
						<!--#endif-->
						<!--#ifndef APP-PLUS-->
						<view v-if="item.attrs.id[item.attrs.id.length-1]>'3'&&(!controls[item.attrs.id]||!controls[item.attrs.id].play)"
						 :class="'pvideo '+(item.attrs.class||'')" :style="item.attrs.style" :data-id="item.attrs.id" @tap="_loadVideo">
							<view class="video-triangle"></view>
						</view>
						<!--#endif-->
						<video v-else :src='controls[item.attrs.id]?item.attrs.source[controls[item.attrs.id].index]:item.attrs.src' :id="item.attrs.id"
						 :loop='item.attrs.loop' :controls='item.attrs.controls' :autoplay="item.attrs.autoplay||(controls[item.attrs.id]&&controls[item.attrs.id].play)"
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
						<trees :nodes="item.children" :imgMode="imgMode" :lazyLoad="lazyLoad" :loadVideo="loadVideo" />
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
					<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || APP-PLUS-->
					<rich-text v-else :class="item.name" :style="''+handler.getStyle(item.attrs.style,'block')" :nodes="handler.setStyle(item)" />
					<!--#endif-->
					<!--#ifdef MP-BAIDU || MP-TOUTIAO || H5-->
					<rich-text v-else :class="item.name" :style="item.attrs?item.attrs.containStyle:''" :nodes="[item]" />
					<!--#endif-->
				</block>
				<!--#ifdef MP-ALIPAY || H5-->
				<view v-else :class="item.name+' '+(item.attrs.class||'')" :style="item.attrs.style">
					<trees :nodes="item.children" :imgMode="imgMode" />
				</view>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY || H5-->
				<trees v-else :class="item.name+' '+(item.attrs.class||'')" :style="item.attrs.style" :nodes="item.children"
				 :imgMode="imgMode" :lazyLoad="lazyLoad" :loadVideo="loadVideo" />
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
				// #ifdef MP-WEIXIN || MP-QQ || APP-PLUS
				imgLoad: false
				// #endif
			}
		},
		props: {
			nodes: {
				type: Array,
				default: []
			},
			// #ifdef MP-WEIXIN || MP-QQ || APP-PLUS
			lazyLoad: {
				type: Boolean,
				default: false
			},
			// #endif
			// #ifdef APP-PLUS
			loadVideo: {
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
			while (this._top.$options.name != 'parser') {
				if (this._top._top) {
					this._top = this._top._top;
					break;
				}
				this._top = this._top.$parent;
			}
		},
		// #ifdef MP-WEIXIN || MP-QQ || APP-PLUS
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
					var preview = true;
					this._top.$emit('imgtap', {
						src: e.currentTarget.dataset.src,
						ignore: () => preview = false
					});
					if (preview && this._top.autopreview) {
						uni.previewImage({
							current: parseInt(e.currentTarget.dataset.current),
							urls: this._top.imgList.length ? this._top.imgList : [e.currentTarget.dataset.src]
						});
					}
				}
			},
			tapEvent(e) {
				var jump = true;
				this._top.$emit('linkpress', {
					href: e.currentTarget.dataset.href,
					ignore: () => jump = false
				});
				if (jump && e.currentTarget.dataset.href) {
					if (/^http/.test(e.currentTarget.dataset.href)) {
						if (this._top.autocopy) {
							// #ifndef H5
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
						}
					} else
						uni.navigateTo({
							url: e.currentTarget.dataset.href
						})
				}
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
					this.$set(this.controls[currentTarget.id], "index", this.controls[currentTarget.id].index + 1);
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
				this.$set(this.controls, e.currentTarget.dataset.id, {
					play: true,
					index: 0
				})
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

	.pvideo {
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
		top: 50%;
		margin: -15px 0 0 -15px;
	}
</style>
