<!--
 trees 递归显示组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 插件市场：https://ext.dcloud.net.cn/plugin?id=805
 author：JinYufeng
-->
<template>
	<view style="display: inherit; white-space: inherit;max-width: 100%;">
		<block v-for="(item, index) in nodes" v-bind:key="index">
			<!--图片-->
			<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || APP-PLUS-->
			<rich-text v-if="item.name=='img'" :id="item.attrs.id" class="_img" :style="'text-indent:0;'+handler.getStyle(item.attrs.style, 'inline-block')"
			 :nodes='handler.setImgStyle(item, imgLoad)' :data-attrs="item.attrs" @tap="imgtap" @longpress="imglongtap" />
			<!--#endif-->
			<!--#ifdef MP-BAIDU || MP-TOUTIAO-->
			<rich-text v-if="item.name=='img'" :id="item.attrs.id" :style="'text-indent:0;'+item.attrs.containStyle" :nodes='[item]'
			 :data-attrs="item.attrs" @tap="imgtap" @longpress="imglongtap" />
			<!--#endif-->
			<!--文本-->
			<!--#ifdef MP-WEIXIN || MP-QQ || APP-PLUS-->
			<text v-else-if="item.type=='text'&&!item.decode" decode>{{item.text}}</text>
			<rich-text v-else-if="item.type=='text'" style="display:inline-block" :nodes="[item]"></rich-text>
			<!--#endif-->
			<!--#ifdef MP-ALIPAY-->
			<text v-else-if="item.type=='text'" decode>{{item.text}}</text>
			<!--#endif-->
			<text v-else-if="item.name=='br'">\n</text>
			<!--视频-->
			<view v-else-if="item.name=='video'">
				<!--#ifdef APP-PLUS-->
				<view v-if="(!loadVideo||item.lazyLoad)&&(!controls[item.attrs.id]||!controls[item.attrs.id].play)" :id="item.attrs.id"
				 :class="'_video '+(item.attrs.class||'')" :style="item.attrs.style||''" @tap="_loadVideo" />
				<!--#endif-->
				<!--#ifndef APP-PLUS-->
				<view v-if="item.lazyLoad&&!controls[item.attrs.id].play" :id="item.attrs.id" :class="'_video '+(item.attrs.class||'')"
				 :style="item.attrs.style||''" @tap="_loadVideo" />
				<!--#endif-->
				<video v-else :src="controls[item.attrs.id]?item.attrs.source[controls[item.attrs.id].index] : item.attrs.src" :id="item.attrs.id"
				 :loop="item.attrs.loop" :controls="item.attrs.controls" :poster="item.attrs.poster" :autoplay="item.attrs.autoplay||(controls[item.attrs.id]&&controls[item.attrs.id].play)"
				 :unit-id="item.attrs['unit-id']" :class="item.attrs.class" :muted="item.attrs.muted" :style="item.attrs.style||''"
				 :data-source="item.attrs.source" @play="play" @error="videoError" />
			</view>
			<!--音频-->
			<audio v-else-if="item.name=='audio'" :src="controls[item.attrs.id]?item.attrs.source[controls[item.attrs.id].index] : item.attrs.src"
			 :id="item.attrs.id" :loop="item.attrs.loop" :controls="item.attrs.controls" :poster="item.attrs.poster" :name="item.attrs.name"
			 :author="item.attrs.author" :class="item.attrs.class" :style="item.attrs.style||''" :data-source="item.attrs.source"
			 @error="audioError" />
			<!--链接-->
			<view v-else-if="item.name=='a'" :class="'_a '+(item.attrs.class||'')" :style="item.attrs.style||''" :data-attrs="item.attrs"
			 hover-class="navigator-hover" :hover-start-time="25" :hover-stay-time="300" @tap="linkpress">
				<trees :nodes="item.children" />
			</view>
			<!--广告-->
			<!--#ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO-->
			<ad v-else-if="item.name=='ad'" :unit-id="item.attrs['unit-id']" :class="item.attrs.class||''" :style="item.attrs.style||''"
			 @error="adError" />
			<!--#endif-->
			<!--#ifdef MP-BAIDU-->
			<ad v-else-if="item.name=='ad'" :appid="item.attrs.appid" :apid="item.attrs.apid" :type="item.attrs.type" :class="item.attrs.class||''"
			 :style="item.attrs.style||''" @error="adError" />
			<!--#endif-->
			<!--#ifdef APP-PLUS-->
			<ad v-else-if="item.name=='ad'" :adpid="item.attrs.adpid" :class="item.attrs.class||''" :style="item.attrs.style||''"
			 @error="adError" />
			<!--#endif-->
			<!--列表-->
			<view v-else-if="item.name=='li'" :class="(item.attrs.class||'')+' _li'" :style="(item.attrs.style||'')+';display:flex'">
				<view v-if="item.type=='ol'" class="_ol-before">{{item.num}}</view>
				<view v-else class="_ul-before">
					<view v-if="item.floor%3==0" class="_ul-type1">█</view>
					<view v-else-if="item.floor%3==2" class="_ul-type2" />
					<view v-else class="_ul-type1" style="border-radius:50%">█</view>
				</view>
				<!--#ifdef MP-ALIPAY-->
				<view>
					<trees :nodes="item.children" />
				</view>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY-->
				<trees class="_node" :nodes="item.children" :loadVideo="loadVideo" style="display:block" />
				<!--#endif-->
			</view>
			<!--富文本-->
			<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || APP-PLUS-->
			<rich-text v-else-if="!(item.c||inlineTags[item.name]||item.continue)" :id="item.attrs.id" :class="'__'+item.name"
			 :style="''+handler.getStyle(item.attrs.style, 'block')" :nodes="handler.setStyle(item)" />
			<!--#endif-->
			<!--#ifdef MP-BAIDU || MP-TOUTIAO-->
			<rich-text v-else-if="!(item.c||item.continue)" :id="item.attrs.id" :style="item.attrs?item.attrs.containStyle:''"
			 :nodes="[item]" />
			<!--#endif-->
			<!--#ifdef MP-ALIPAY-->
			<view v-else :id="item.attrs.id" :class="'_'+item.name+' '+(item.attrs.class||'')" :style="item.attrs.style||''">
				<trees :nodes="item.children" />
			</view>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY-->
			<trees v-else :class="item.attrs.id+' _'+item.name+' '+(item.attrs.class||'')" :style="item.attrs.style||''" :nodes="item.children"
			 :loadVideo="loadVideo" />
			<!--#endif-->
		</block>
	</view>
</template>
<script module="handler" lang="wxs" src="./handler.wxs"></script>
<script module="handler" lang="sjs" src="./handler.sjs"></script>
<script>
	const inlineTags = require("./config.js").inlineTags;
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
				imgLoad: false,
				// #endif
				// #ifndef MP-BAIDU || MP-TOUTIAO
				inlineTags
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
			}
			// #endif
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
			play(e) {
				if ((this._top.videoContexts || []).length > 1 && this._top.autopause) {
					for (var i = this._top.videoContexts.length; i--;) {
						if (this._top.videoContexts[i].id != e.currentTarget.id)
							this._top.videoContexts[i].pause();
					}
				}
			},
			// #endif
			imgtap(e) {
				var attrs = e.currentTarget.dataset.attrs;
				if (!attrs.ignore) {
					var preview = true;
					this._top.$emit('imgtap', {
						id: e.currentTarget.id,
						src: attrs.src,
						ignore: () => preview = false
					})
					if (preview) {
						var urls = this._top.imgList || [],
							current = urls[attrs.i] ? parseInt(attrs.i) : (urls = [attrs.src], 0);
						uni.previewImage({
							current,
							urls
						})
					}
				}
			},
			imglongtap(e) {
				this._top.$emit('imglongtap', {
					id: e.currentTarget.id,
					src: e.currentTarget.dataset.attrs.src
				})
			},
			linkpress(e) {
				var jump = true,
					attrs = e.currentTarget.dataset.attrs;
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
							uni.setClipboardData({
								data: attrs.href,
								success() {
									uni.showToast({
										title: '链接已复制'
									});
								}
							});
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
				if (target.dataset.source.length <= 1) return false;
				if (!this.controls[target.id]) {
					this.$set(this.controls, target.id, {
						index: 1
					})
					return true;
				} else if (this.controls[target.id] && this.controls[target.id].index < target.dataset.source.length) {
					this.$set(this.controls[target.id], "index", this.controls[target.id].index + 1);
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
	/* #ifndef MP-WEIXIN || APP-PLUS */
	:host {
		display: inherit;
		float: inherit;
	}

	/* #endif */

	._b,
	._strong {
		font-weight: bold;
	}

	._big {
		font-size: 1.2em;
	}

	._small {
		font-size: 0.8em;
	}

	._blockquote,
	._div,
	._p,
	._ol,
	._ul,
	._li {
		display: block;
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
		font-size: 0.67em;
	}

	._h1,
	._h2,
	._h3,
	._h4,
	._h5,
	._h6 {
		font-weight: bold;
	}

	._ins {
		text-decoration: underline;
	}

	._ol-before {
		width: 36px;
		text-align: right;
		margin-right: 5px;
		flex-shrink: 0;
	}

	._ul-before {
		margin-left: 23px;
		margin-right: 12px;
		line-height: normal;
		flex-shrink: 0;
	}

	._ul-type1 {
		width: 0.3em;
		height: 0.3em;
		line-height: 0.3em;
		color: inherit;
		display: inline-block;
		overflow: hidden;
	}

	._ul-type2 {
		width: 0.23em;
		height: 0.23em;
		background-color: transparent;
		border: 0.05em solid black;
		border-radius: 50%;
		display: inline-block;
	}

	._q::before {
		content: '"';
	}

	._q::after {
		content: '"';
	}

	._a,
	._abbr,
	._b,
	._big,
	._small,
	._code,
	._del,
	._em,
	._i,
	._ins,
	._label,
	._q,
	._span,
	._strong {
		display: inline;
	}

	/* #ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY */
	.__sub,
	.__sup,
	.__bdo,
	.__bdi,
	.__ruby,
	.__rt {
		display: inline-block !important;
	}

	/* #endif */
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
