<!--
 trees 递归显示组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 插件市场：https://ext.dcloud.net.cn/plugin?id=805
 author：JinYufeng
-->
<template>
	<view style="display: inherit; white-space: inherit;">
		<block v-for="(item, index) in nodes" v-bind:key="index">
			<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || APP-PLUS-->
			<block v-if="handler.notContinue(item)">
				<!--#endif-->
				<!--#ifdef MP-BAIDU || MP-TOUTIAO-->
				<block v-if="!item.continue">
					<!--#endif-->
					<!--图片-->
					<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY ||APP-PLUS-->
					<rich-text v-if="item.name == 'img'" :id="item.attrs.id" class="img" :style="'text-indent:0;' + handler.getStyle(item.attrs.style, 'inline-block')"
					 :nodes='handler.setImgStyle(item, imgMode, imgLoad)' :data-attrs="item.attrs" @tap='previewEvent' />
					<!--#endif-->
					<!--#ifdef MP-BAIDU || MP-TOUTIAO-->
					<rich-text v-if="item.name == 'img'" :id="item.attrs.id" :style="'text-indent:0;' + item.attrs.containStyle"
					 :nodes='[item]' :data-attrs="item.attrs" @tap='previewEvent' />
					<!--#endif-->
					<!--文本-->
					<!--#ifdef MP-WEIXIN || MP-QQ || APP-PLUS-->
					<block v-else-if="item.type == 'text'">
						<text v-if="!item.decode" decode>{{item.text}}</text>
						<rich-text v-else style="display:inline-block" :nodes="[item]"></rich-text>
					</block>
					<!--#endif-->
					<!--#ifdef MP-ALIPAY-->
					<text v-else-if="item.type == 'text'" decode>{{item.text}}</text>
					<!--#endif-->
					<text v-else-if="item.name == 'br'">\n</text>
					<!--视频-->
					<block v-else-if="item.name == 'video'">
						<!--#ifdef APP-PLUS-->
						<view v-if="(!loadVideo || item.lazyLoad) && !controls[item.attrs.id].play" :id="item.attrs.id" :class="'_video '+(item.attrs.class || '')"
						 :style="item.attrs.style" @tap="_loadVideo" />
						<!--#endif-->
						<!--#ifndef APP-PLUS-->
						<view v-if="item.lazyLoad && !controls[item.attrs.id].play" :id="item.attrs.id" :class="'_video ' + (item.attrs.class||'')"
						 :style="item.attrs.style" @tap="_loadVideo" />
						<!--#endif-->
						<video v-else :src="controls[item.attrs.id] ? item.attrs.source[controls[item.attrs.id].index] : item.attrs.src"
						 :id="item.attrs.id" :loop="item.attrs.loop" :controls="item.attrs.controls" :autoplay="item.attrs.autoplay || (controls[item.attrs.id] && controls[item.attrs.id].play)"
						 :unit-id="item.attrs['unit-id']" :class="item.attrs.class" :muted="item.attrs.muted" :style="item.attrs.style"
						 :data-source="item.attrs.source" @play="playEvent" @error="videoError" />
					</block>
					<!--音频-->
					<audio v-else-if="item.name == 'audio'" :src="controls[item.attrs.id] ? item.attrs.source[controls[item.attrs.id].index] : item.attrs.src"
					 :id="item.attrs.id" :loop="item.attrs.loop" :controls="item.attrs.controls" :poster="item.attrs.poster" :name="item.attrs.name"
					 :author="item.attrs.author" :class="item.attrs.class" :style="item.attrs.style" :data-source="item.attrs.source"
					 @error="audioError" />
					<!--链接-->
					<view v-else-if="item.name == 'a'" :class="'_a ' + (item.attrs.class || '')" :style="item.attrs.style" :data-attrs="item.attrs"
					 hover-class="navigator-hover" :hover-start-time="25" :hover-stay-time="300" @tap="tapEvent">
						<trees :nodes="item.children" :imgMode="imgMode" :loadVideo="loadVideo" ref="nodes"/>
					</view>
					<!--广告-->
					<!--#ifdef MP-WEIXIN || MP-QQ-->
					<ad v-else-if="item.name == 'ad'" :unit-id="item.attrs['unit-id']" :class="item.attrs.class||''" :style="item.attrs.style"
					 @error="adError"></ad>
					<!--#endif-->
					<!--#ifdef MP-BAIDU-->
					<ad v-else-if="item.name == 'ad'" :appid="item.attrs.appid" :apid="item.attrs.apid" :type="item.attrs.type" :class="item.attrs.class||''"
					 :style="item.attrs.style" @error="adError"></ad>
					<!--#endif-->
					<!--富文本-->
					<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || APP-PLUS-->
					<rich-text v-else :id="item.attrs.id" :class="item.name" :style="'' + handler.getStyle(item.attrs.style, 'block')"
					 :nodes="handler.setStyle(item)" />
					<!--#endif-->
					<!--#ifdef MP-BAIDU || MP-TOUTIAO-->
					<rich-text v-else :id="item.attrs.id" :class="item.name" :style="item.attrs ? item.attrs.containStyle : ''" :nodes="[item]" />
					<!--#endif-->
				</block>
				<!--#ifdef MP-ALIPAY-->
				<view v-else :id="item.attrs.id" :class="'_' + item.name + ' ' + (item.attrs.class || '')" :style="item.attrs.style">
					<trees :nodes="item.children" :imgMode="imgMode" />
				</view>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY-->
				<trees v-else :id="item.attrs.id" :class="'_' + item.name + ' ' + (item.attrs.class || '')" :style="item.attrs.style"
				 :nodes="item.children" :imgMode="imgMode" :loadVideo="loadVideo" />
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
				if ((this._top.videoContexts || []).length > 1 && this._top.autopause) {
					for (let video of this._top.videoContexts) {
						if (video.id == e.currentTarget.id) continue;
						video.pause();
					}
				}
			},
			// #endif
			previewEvent(e) {
				var attrs = e.currentTarget.dataset.attrs;
				if (!attrs.ignore) {
					var preview = true;
					this._top.$emit('imgtap', {
						id: e.currentTarget.id,
						src: attrs.src,
						ignore: () => preview = false
					})
					if (preview && this._top.autopreview) {
						uni.previewImage({
							current: parseInt(attrs.i),
							urls: this._top.imgList
						})
					}
				}
			},
			tapEvent(e) {
				var jump = true,
					attrs = e.currentTarget.dataset.attrs;
				delete attrs.style;
				attrs.ignore = () => jump = false;
				this._top.$emit('linkpress', attrs);
				if (jump) {
					// #ifdef MP
					if (attrs['app-id'] || attrs.appId) {
						return uni.navigateToMiniProgram({
							appId: attrs['app-id'] || attrs.appId,
							path: attrs.path || ''
						})
					}
					// #endif
					if (attrs.href) {
						if (attrs.href[0] == "#") {
							if (this._top.useAnchor)
								this._top.navigateTo({
									id: attrs.href.substring(1)
								})
						} else if (attrs.href.indexOf("http") == 0 || attrs.href.indexOf("//") == 0) {
							if (this._top.autocopy) {
								uni.setClipboardData({
									data: attrs.href,
									success() {
										uni.showToast({
											title: '链接已复制'
										});
									}
								});
							}
						} else
							uni.navigateTo({
								url: attrs.href
							})
					}
				}
			},
			triggerError(source, target, errMsg, errCode, context) {
				this._top.$emit('error', {
					source,
					target,
					errMsg,
					errCode,
					context
				});
			},
			loadSource(target) {
				console.log(target)
				var index = (this.controls[target.id] ? this.controls[target.id].index : 0) + 1;
				if (index < target.dataset.source.length) {
					if (!this.controls[target.id])
						this.$set(this.controls, target.id, {
							index
						})
					else
						this.$set(this.controls[target.id], "index", index);
					return true;
				}
				return false;
			},
			adError(e) {
				this.triggerError("ad", e.currentTarget, "", e.detail.errorCode);
			},
			videoError(e) {
				if (!this.loadSource(e.currentTarget) && this._top)
					this.triggerError("video", e.currentTarget, e.detail.errMsg, undefined, uni.createVideoContext(e.currentTarget.id,
						this));
			},
			audioError(e) {
				if (!this.loadSource(e.currentTarget))
					this.triggerError("audio", e.currentTarget, e.detail.errMsg);
			},
			_loadVideo(e) {
				this.$set(this.controls, e.currentTarget.id, {
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
	/* #ifndef MP-BAIDU */
	:host {
		display: inherit;
		float: inherit;
	}

	/* #endif */

	._a {
		display: inline;
		color: #366092;
	}

	/* #ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY */
	._sub,
	._sup,
	._bdo,
	._bdi,
	._ruby,
	._rt {
		display: inline-block !important;
	}

	/* #endif */

	._div,
	._blockquote,
	._p {
		display: block;
	}

	._b,
	._strong {
		display: inline;
		font-weight: bold;
	}

	._em,
	._i {
		display: inline;
		font-style: italic;
	}

	._del {
		display: inline;
		text-decoration: line-through;
	}

	._ins {
		display: inline;
		text-decoration: underline;
	}

	._code {
		display: inline;
		font-family: monospace;
	}

	._big {
		font-size: 1.2em;
		display: inline;
	}

	._small {
		font-size: 0.8em;
		display: inline;
	}

	._q,
	._span,
	._label,
	._abbr {
		display: inline;
	}

	._q::before {
		content: '"';
	}

	._q::after {
		content: '"';
	}

	._video {
		background-color: black;
		width: 300px;
		height: 225px;
		display: inline-block;
		position: relative;
	}

	._video::after {
		content: '';
		border-width: 15px 0 15px 30px;
		border-style: solid;
		border-color: transparent transparent transparent white;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -15px 0 0 -15px;
	}
</style>
