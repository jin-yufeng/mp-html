<!--
  trees 递归显示组件
  github：https://github.com/jin-yufeng/Parser 
  docs：https://jin-yufeng.github.io/Parser
  插件市场：https://ext.dcloud.net.cn/plugin?id=805
  author：JinYufeng
  update：2020/04/25
-->
<template>
	<view class="interlayer">
		<block v-for="(n, index) in ns" v-bind:key="index">
			<!--图片-->
			<view v-if="n.name=='img'" :class="'_img '+n.attrs.class" :style="n.attrs.style" :data-attrs="n.attrs" @tap="imgtap">
				<rich-text :nodes="[{attrs:{src:lazyLoad&&!n.load?placeholder:n.attrs.src,alt:n.attrs.alt||'',width:n.attrs.width||'',style:'max-width:100%;display:inherit'+(n.attrs.height?';height:'+n.attrs.height:'')},name:'img'}]"
				 style="display:inherit" />
				<image class="_image" :src="lazyLoad&&!n.load?placeholder:n.attrs.src" :lazy-load="lazyLoad"
				 :show-menu-by-longpress="!n.attrs.ignore" :data-i="index" data-source="img" @load="loadImg" @error="error" />
			</view>
			<!--文本-->
			<text v-else-if="n.type=='text'" decode>{{n.text}}</text>
			<text v-else-if="n.name=='br'">\n</text>
			<!--视频-->
			<view v-else-if="n.lazyLoad||(n.name=='video'&&!loadVideo)" :id="n.attrs.id" :class="'_video '+(n.attrs.class||'')"
			 :style="n.attrs.style" :data-i="index" @tap="_loadVideo" />
			<video v-else-if="n.name=='video'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :autoplay="n.attrs.autoplay"
			 :controls="n.attrs.controls" :loop="n.attrs.loop" :muted="n.attrs.muted" :poster="n.attrs.poster" :src="n.attrs.source[n.i||0]"
			 :unit-id="n.attrs['unit-id']" :data-id="n.attrs.id" data-source="video" @error="error" @play="play" />
			<!--音频-->
			<audio v-else-if="n.name=='audio'" :ref="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :author="n.attrs.author"
			 :autoplay="n.attrs.autoplay" :controls="n.attrs.controls" :loop="n.attrs.loop" :name="n.attrs.name" :poster="n.attrs.poster"
			 :src="n.attrs.source[n.i||0]" :data-i="index" :data-id="n.attrs.id" data-source="audio" @error.native="error" @play.native="play" />
			<!--链接-->
			<view v-else-if="n.name=='a'" :class="'_a '+(n.attrs.class||'')" hover-class="_hover" :style="n.attrs.style"
			 :data-attrs="n.attrs" @tap="linkpress">
				<trees class="_span" :nodes="n.children" />
			</view>
			<!--广告（按需打开注释）-->
			<!--#ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO-->
			<!--<ad v-else-if="n.name=='ad'" :class="n.attrs.class" :style="n.attrs.style" :unit-id="n.attrs['unit-id']"
			 data-from="ad" @error="error" />-->
			<!--#endif-->
			<!--#ifdef MP-BAIDU-->
			<!--<ad v-else-if="n.name=='ad'" :class="n.attrs.class" :style="n.attrs.style" :appid="n.attrs.appid"
			 :apid="n.attrs.apid" :type="n.attrs.type" data-from="ad" @error="error" />-->
			<!--#endif-->
			<!--#ifdef APP-PLUS-->
			<!--<ad v-else-if="n.name=='ad'" :class="n.attrs.class" :style="n.attrs.style" :adpid="n.attrs.adpid"
			 data-from="ad" @error="error" />-->
			<!--#endif-->
			<!--列表-->
			<view v-else-if="n.name=='li'" :id="n.attrs.id" :class="n.attrs.class" :style="(n.attrs.style||'')+';display:flex'">
				<view v-if="n.type=='ol'" class="_ol-bef">{{n.num}}</view>
				<view v-else class="_ul-bef">
					<view v-if="n.floor%3==0" class="_ul-p1">█</view>
					<view v-else-if="n.floor%3==2" class="_ul-p2" />
					<view v-else class="_ul-p1" style="border-radius:50%">█</view>
				</view>
				<!--#ifdef MP-ALIPAY-->
				<view class="_li">
					<trees :nodes="n.children" :lazyLoad="lazyLoad" />
				</view>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY-->
				<trees class="_li" :nodes="n.children" :lazyLoad="lazyLoad" />
				<!--#endif-->
			</view>
			<!--表格-->
			<view v-else-if="n.name=='table'&&n.c" :id="n.attrs.id" :class="n.attrs.class" :style="(n.attrs.style||'')+';display:table'">
				<view v-for="(tbody, i) in n.children" v-bind:key="i" :class="tbody.attrs.class" :style="(tbody.attrs.style||'')+(tbody.name[0]=='t'?';display:table-'+(tbody.name=='tr'?'row':'row-group'):'')">
					<view v-for="(tr, j) in tbody.children" v-bind:key="j" :class="tr.attrs.class" :style="(tr.attrs.style||'')+(tr.name[0]=='t'?';display:table-'+(tr.name=='tr'?'row':'cell'):'')">
						<trees v-if="tr.name=='td'" :nodes="tr.children" />
						<block v-else>
							<!--#ifdef MP-ALIPAY-->
							<view v-for="(td, k) in tr.children" v-bind:key="k" :class="td.attrs.class" :style="(td.attrs.style||'')+(td.name[0]=='t'?';display:table-'+(td.name=='tr'?'row':'cell'):'')">
								<trees :nodes="td.children" />
							</view>
							<!--#endif-->
							<!--#ifndef MP-ALIPAY-->
							<trees v-for="(td, k) in tr.children" v-bind:key="k" :class="td.attrs.class" :style="(td.attrs.style||'')+(td.name[0]=='t'?';display:table-'+(td.name=='tr'?'row':'cell'):'')"
							 :nodes="td.children" />
							<!--#endif-->
						</block>
					</view>
				</view>
			</view>
			<!--#ifdef APP-PLUS-->
			<iframe v-else-if="n.name=='iframe'" :style="n.attrs.style" :allowfullscreen="n.attrs.allowfullscreen" :frameborder="n.attrs.frameborder"
			 :width="n.attrs.width" :height="n.attrs.height" :src="n.attrs.src" />
			<embed v-else-if="n.name=='embed'" :style="n.attrs.style" :width="n.attrs.width" :height="n.attrs.height" :src="n.attrs.src" />
			<!--#endif-->
			<!--富文本-->
			<!--#ifdef MP-WEIXIN || MP-QQ || MP-ALIPAY || APP-PLUS-->
			<rich-text v-else-if="handler.useRichText(n)" :id="n.attrs.id" :class="'_p __'+n.name" :nodes="[n]" />
			<!--#endif-->
			<!--#ifdef MP-BAIDU || MP-TOUTIAO-->
			<rich-text v-else-if="!n.c" :id="n.attrs.id" :nodes="[n]" />
			<!--#endif-->
			<!--#ifdef MP-ALIPAY-->
			<view v-else :id="n.attrs.id" :class="'_'+n.name+' '+(n.attrs.class||'')" :style="n.attrs.style">
				<trees :nodes="n.children" :lazyLoad="lazyLoad" />
			</view>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY-->
			<trees v-else :class="(n.attrs.id||'')+' _'+n.name+' '+(n.attrs.class||'')" :style="n.attrs.style" :nodes="n.children"
			 :lazyLoad="lazyLoad" />
			<!--#endif-->
		</block>
	</view>
</template>
<script module="handler" lang="wxs" src="./handler.wxs"></script>
<script module="handler" lang="sjs" src="./handler.sjs"></script>
<script>
	global.Parser = {};
	import trees from './trees'
	export default {
		components: {
			trees
		},
		name: 'trees',
		data() {
			return {
				ns: [],
				placeholder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',
				loadVideo:
					// #ifdef APP-PLUS
					false
				// #endif
				// #ifndef APP-PLUS
				true
				// #endif
			}
		},
		props: {
			nodes: Array,
			lazyLoad: Boolean,
		},
		watch: {
			nodes: {
				immediate: true,
				handler(val) {
					this.ns = val;
					// #ifdef APP-PLUS
					// APP 上避免 video 错位需要延时渲染
					setTimeout(() => {
						this.loadVideo = true;
					}, 3000)
					// #endif
				}
			}
		},
		mounted() {
			// 获取顶层组件
			var _top = this.$parent;
			while (_top.$options.name != 'parser') {
				if (_top.top) {
					_top = _top.top;
					break;
				}
				_top = _top.$parent;
			}
			this.top = _top;
			for (var j = this.nodes.length, item; item = this.nodes[--j];) {
				if (item.c) continue;
				if (item.name == 'img')
					_top.imgList.setItem(item.attrs.i, item.attrs.src);
				else if (item.name == 'video' || item.name == 'audio') {
					var ctx;
					if (item.name == 'video')
						ctx = uni.createVideoContext(item.attrs.id, this);
					else if (this.$refs[item.attrs.id])
						ctx = this.$refs[item.attrs.id][0];
					if (ctx) {
						ctx.id = item.attrs.id;
						_top.videoContexts.push(ctx);
					}
				}
				// #ifdef MP-BAIDU || MP-ALIPAY || APP-PLUS
				if (item.attrs && item.attrs.id) {
					_top.anchors = _top.anchors || [];
					_top.anchors.push({
						id: item.attrs.id,
						node: this
					})
				}
				// #endif
			}
		},
		methods: {
			play(e) {
				var contexts = this.top.videoContexts;
				if (contexts.length > 1 && this.top.autopause)
					for (var i = contexts.length; i--;)
						if (contexts[i].id != e.currentTarget.dataset.id)
							contexts[i].pause();
			},
			imgtap(e) {
				var attrs = e.currentTarget.dataset.attrs;
				if (!attrs.ignore) {
					var preview = true,
						data = {
							id: e.target.id,
							src: attrs.src,
							ignore: () => preview = false
						};
					global.Parser.onImgtap && global.Parser.onImgtap(data);
					this.top.$emit('imgtap', data);
					if (preview) {
						var urls = this.top.imgList,
							current = urls[attrs.i] ? parseInt(attrs.i) : (urls = [attrs.src], 0);
						uni.previewImage({
							current,
							urls
						})
					}
				}
			},
			loadImg(e) {
				var node = this.ns[e.currentTarget.dataset.i];
				if (this.lazyLoad && !node.load)
					this.$set(node, 'load', true);
			},
			linkpress(e) {
				var jump = true,
					attrs = e.currentTarget.dataset.attrs;
				attrs.ignore = () => jump = false;
				global.Parser.onLinkpress && global.Parser.onLinkpress(attrs);
				this.top.$emit('linkpress', attrs);
				if (jump) {
					// #ifdef MP
					if (attrs['app-id']) {
						return uni.navigateToMiniProgram({
							appId: attrs['app-id'],
							path: attrs.path
						})
					}
					// #endif
					if (attrs.href) {
						if (attrs.href[0] == '#') {
							if (this.top.useAnchor)
								this.top.navigateTo({
									id: attrs.href.substring(1)
								})
						} else if (attrs.href.indexOf('http') == 0 || attrs.href.indexOf('//') == 0) {
							// #ifdef APP-PLUS
							plus.runtime.openWeb(attrs.href);
							// #endif
							// #ifndef APP-PLUS
							uni.setClipboardData({
								data: attrs.href,
								success: () =>
									uni.showToast({
										title: '链接已复制'
									})
							})
							// #endif
						} else
							uni.navigateTo({
								url: attrs.href
							})
					}
				}
			},
			error(e) {
				var context, src = '',
					target = e.currentTarget,
					source = target.dataset.source,
					node = this.ns[target.dataset.i];
				if (source == 'video' || source == 'audio') {
					// 加载其他 source
					var index = (node.i || 0) + 1;
					if (index < node.attrs.source.length)
						this.$set(node, 'i', index);
					if (source == 'video') context = uni.createVideoContext(target.id, this);
					else if (e.detail.__args__) {
						e.detail = e.detail.__args__[0];
						context = e.detail.context;
					}
				} else if (source == 'img')
					context = {
						setSrc: src => {
							node.attrs.src = src;
						}
					}
				this.top && this.top.$emit('error', {
					source,
					target,
					errMsg: e.detail.errMsg,
					errCode: e.detail.errCode,
					context
				});
			},
			_loadVideo(e) {
				var i = e.target.dataset.i;
				this.ns[i].lazyLoad = false;
				this.ns[i].attrs.autoplay = true;
			}
		}
	}
</script>

<style>
	/* 在这里引入自定义样式 */

	/* 链接和图片效果 */
	._a {
		display: inline;
		color: #366092;
		word-break: break-all;
		padding: 1.5px 0 1.5px 0;
	}

	._hover {
		opacity: 0.7;
		text-decoration: underline;
	}

	._img {
		display: inline-block;
		max-width: 100%;
		position: relative;
	}

	/* #ifdef MP-WEIXIN */
	:host {
		display: inline;
	}

	/* #endif */

	/* #ifdef MP */
	.interlayer {
		align-content: inherit;
		align-items: inherit;
		display: inherit;
		flex-direction: inherit;
		flex-wrap: inherit;
		justify-content: inherit;
		width: 100%;
		white-space: inherit;
	}

	/* #endif */

	._b,
	._strong {
		font-weight: bold;
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
		font-size: 0.83em;
	}

	._h6 {
		font-size: 0.67em;
	}

	._h1,
	._h2,
	._h3,
	._h4,
	._h5,
	._h6 {
		display: block;
		font-weight: bold;
	}

	._image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	._ins {
		text-decoration: underline;
	}

	._li {
		flex: 1;
		width: 0;
	}

	._ol-bef {
		margin-right: 5px;
		text-align: right;
		width: 36px;
	}

	._ul-bef {
		line-height: normal;
		margin: 0 12px 0 23px;
	}

	._ol-bef,
	._ul_bef {
		flex: none;
		user-select: none;
	}

	._ul-p1 {
		display: inline-block;
		height: 0.3em;
		line-height: 0.3em;
		overflow: hidden;
		width: 0.3em;
	}

	._ul-p2 {
		border: 0.05em solid black;
		border-radius: 50%;
		display: inline-block;
		height: 0.23em;
		width: 0.23em;
	}

	._q::before {
		content: '"';
	}

	._q::after {
		content: '"';
	}

	._sub {
		font-size: smaller;
		vertical-align: sub;
	}

	._sup {
		font-size: smaller;
		vertical-align: super;
	}

	/* #ifdef MP-ALIPAY || APP-PLUS */
	._abbr,
	._b,
	._code,
	._del,
	._em,
	._i,
	._ins,
	._label,
	._q,
	._span,
	._strong,
	._sub,
	._sup {
		display: inline;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN || MP-QQ */
	.__bdo,
	.__bdi,
	.__ruby,
	.__rt {
		display: inline-block;
	}

	/* #endif */
	._video {
		background-color: black;
		display: inline-block;
		height: 225px;
		position: relative;
		width: 300px;
	}

	._video::after {
		border-color: transparent transparent transparent white;
		border-style: solid;
		border-width: 15px 0 15px 30px;
		content: '';
		left: 50%;
		margin: -15px 0 0 -15px;
		position: absolute;
		top: 50%;
	}
</style>
