<template>
	<view>
		<!--#ifdef H5-->
		<slot v-if="!html"></slot>
		<iframe id="contain" :style="'width:100%;'+(selectable?'user-select:text;-webkit-user-select:text':'')+(showWithAnimation?('opacity:0;'+showAnimation):'')"
		 frameborder="0"></iframe>
		<!--#endif-->
		<!--#ifndef H5-->
		<slot v-if="!(html.nodes||((html&&(html[0].name||html[0].type))?1:nodes.length))"></slot>
		<!--#endif-->
		<!--#ifdef MP-ALIPAY || H5-->
		<view class="contain" :style="(showWithAnimation?'opacity:0;':'')+(selectable?'user-select:text;-webkit-user-select:text':'')"
		 :animation="showAnimation">
			<trees :nodes="html.nodes||((html&&(html[0].name||html[0].type))?html:nodes)" :imgMode="imgMode" />
		</view>
		<!--#endif-->
		<!--#ifndef MP-ALIPAY || H5-->
		<trees class="contain" :style="'display:block'+(showWithAnimation?'opacity:0;':'')+(selectable?'user-select:text;-webkit-user-select:text':'')"
		 :animation="showAnimation" :nodes="html.nodes||((html[0].name||html[0].type)?html:nodes)" :imgMode="imgMode"
		 :lazyLoad="lazyLoad" :loadVideo="loadVideo" />
		<!--#endif-->
	</view>
</template>

<script>
	import trees from "./trees"
	const html2nodes = require("./Parser.js");
	// #ifdef MP-WEIXIN || MP-QQ
	const CanIUseObserver = require("./api.js").versionHigherThan('1.9.3');
	// #endif
	// #ifdef APP-PLUS
	const CanIUseObserver = true;
	// #endif
	var Document; // 使用document补丁包时将此句改为 const Document = require('./document.js');
	export default {
		name: 'parser',
		data() {
			return {
				nodes: [],
				showAnimation: {},
				// #ifdef APP-PLUS
				loadVideo: false,
				// #endif
			}
		},
		components: {
			trees
		},
		props: {
			'html': {
				type: null,
				default: ''
			},
			'autocopy': {
				type: Boolean,
				default: true
			},
			// #ifndef MP-ALIPAY
			'autopause': {
				type: Boolean,
				default: true
			},
			// #endif
			'autopreview': {
				type: Boolean,
				default: true
			},
			'autosetTitle': {
				type: Boolean,
				default: true
			},
			'domain': {
				type: String,
				default: ''
			},
			'imgMode': {
				type: String,
				default: 'default'
			},
			// #ifdef MP-WEIXIN || MP-QQ || APP-PLUS
			'lazyLoad': {
				type: Boolean,
				default: false
			},
			// #endif
			'selectable': {
				type: Boolean,
				default: false
			},
			'tagStyle': {
				type: Object,
				default: () => {
					return {};
				}
			},
			'showWithAnimation': {
				type: Boolean,
				default: false
			},
			'animationDuration': {
				type: Number,
				default: 400
			},
			'useAnchor': {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			this.execHtml(this.html);
			// #ifndef MP-ALIPAY || H5
			this.videoContext = [];
			// #endif
			// #ifdef MP-BAIDU || MP-ALIPAY
			this.anchors = [];
			// #endif
		},
		methods: {
			execHtml(html) {
				// #ifdef H5
				var iframe = document.getElementById("contain");
				// 支持 iframe.srcdoc
				if (typeof(iframe.srcdoc) == "string") {
					var script =
						'<script>"use strict";function calcPageHeight(t){var e=Math.max(t.body.clientHeight,t.documentElement.clientHeight),n=Math.max(t.body.scrollHeight,t.documentElement.scrollHeight);return Math.max(e,n)}document.addEventListener("DOMContentLoaded",function(){for(var t=document.getElementsByTagName("img"),e=[],n=0;n<t.length;n++){var r=t[n];r.style+=";max-width:100%",e.push(r.src),r.index=n,"A"!=r.parentElement.nodeName&&(r.onclick=function(){parent.document.previewEvent(this,e)}),r.onerror=function(){parent.document.errorEvent(this,"img")};var o=document.getElementsByTagName("a"),a=!0,i=!1,c=void 0;try{for(var u,l=o[Symbol.iterator]();!(a=(u=l.next()).done);a=!0){u.value.onclick=function(t){if("#"==this.getAttribute("href")[0]){var e=document.getElementById(this.getAttribute("href").substring(1));return parent.document.tapEvent(this,e?e.offsetTop:-1)}return parent.document.tapEvent(this)}}}catch(t){i=!0,c=t}finally{try{!a&&l.return&&l.return()}finally{if(i)throw c}}var d=document.getElementsByTagName("video"),m=!0,h=!1,s=void 0;try{for(var v,y=d[Symbol.iterator]();!(m=(v=y.next()).done);m=!0){var f=v.value;f.style+=";max-width:100%",f.onerror=function(){parent.document.errorEvent(this,"video")},f.onplay=function(){parent.document.playEvent(this)}}}catch(t){h=!0,s=t}finally{try{!m&&y.return&&y.return()}finally{if(h)throw s}}parent.document.setVideoContext(d);var g=document.getElementsByTagName("audios"),p=!0,E=!1,x=void 0;try{for(var b,w=g[Symbol.iterator]();!(p=(b=w.next()).done);p=!0){b.value.onerror=function(t){parent.document.errorEvent(this,"audio")}}}catch(t){E=!0,x=t}finally{try{!p&&w.return&&w.return()}finally{if(E)throw x}}}},!1),window.onload=function(){var t=calcPageHeight(document);parent.document.getElementById("contain").style.height=t+"px",parent.document.setTitle(document.title)};<\/script>';
					if (!html) return;
					if (typeof html != 'string') {
						if (typeof html == 'object') {
							var str = "";
							for (var node of (html.nodes || html))
								str += this.Dom2Str(node);
							html = str;
						} else {
							this.$emit('error', {
								source: "parse",
								errMsg: "传入的html格式不正确！"
							});
							return;
						}
					}
					// 处理 rpx
					if (/[0-9.]*?rpx/.test(html)) {
						var rpx = uni.getSystemInfoSync().screenWidth / 750;
						html = html.replace(/([0-9.]*?)rpx/g, function() {
							return parseFloat(arguments[1]) * rpx + "px";
						})
					}
					document.previewEvent = (img, imgList) => {
						if (!img.hasAttribute('ignore')) {
							var preview = true;
							img.ignore = () => preview = false;
							this.$emit('imgtap', img);
							if (preview && this.autopreview) {
								uni.previewImage({
									current: img.index,
									urls: imgList
								});
							}
						}
					}
					document.tapEvent = (link, offsetTop) => {
						var jump = true;
						this.$emit('linkpress', {
							href: link.getAttribute("href"),
							ignore: () => jump = false
						});
						if (jump && link.getAttribute("href")) {
							if (link.getAttribute("href")[0] == '#') {
								if (this.useAnchor)
									window.scrollTo(0, iframe.offsetTop + offsetTop);
							} else if (/^http/.test(link.getAttribute("href"))) {
								if (this.autocopy)
									window.location.href = link.href;
							} else {
								uni.navigateTo({
									url: link.getAttribute("href")
								})
							}
						}
						return false;
					}
					document.setTitle = (title) => {
						if (title && this.autosetTitle) {
							uni.setNavigationBarTitle({
								title: title
							})
						}
						if (html)
							uni.createSelectorQuery().in(this).select("#contain").boundingClientRect(res => {
								this.$emit('ready', res);
							}).exec()
					}
					document.errorEvent = (target, source) => {
						this.$emit('error', {
							source,
							target
						});
					}
					document.setVideoContext = (videos) => {
						this.videoContext = videos;
					}
					document.playEvent = (v) => {
						if (this.autopause) {
							for (var video of this.videoContext) {
								if (video != v)
									video.pause();
							}
						}
					}
					iframe.srcdoc = script + html;
					this.showAnimation =
						"opacity: 1; transition: opacity 400ms ease 0ms, -webkit-transform 400ms ease 0ms, transform 400ms ease 0ms; transform-origin: 50% 50% 0px;";
					return;
				}
				// #endif
				let showAnimation = {};
				if (this.showWithAnimation) {
					showAnimation = uni.createAnimation({
						duration: this.animationDuration,
						timingFunction: "ease"
					}).opacity(1).step().export();
				}
				if (!html) {
					this.nodes = [];
				} else if (typeof html == 'string') {
					html2nodes(html, this).then(res => {
						// #ifdef APP-PLUS
						this.loadVideo = false;
						// #endif
						this.nodes = res.nodes;
						this.showAnimation = showAnimation;
						this.imgList = res.imgList;
						if (Document) this.document = new Document("nodes", res.nodes, this);
						if (res.title && this.autosetTitle) {
							uni.setNavigationBarTitle({
								title: res.title
							})
						}
						this.$emit('parser', res);
						this.ready();
					}).catch(err => {
						this.$emit('error', {
							source: "parse",
							errMsg: err
						});
					})
				} else if (html.constructor == Array) {
					this.showAnimation = showAnimation;
					this.imgList = [];
					// #ifdef APP-PLUS
					this.loadVideo = false;
					// #endif
					if (Document) this.document = new Document("html", html, this);
					this.ready();
				} else if (typeof html == 'object') {
					if (!html.nodes || html.nodes.constructor != Array) {
						if ((html.name && html.children && html.attrs) || (html.type == "text"))
							return;
						this.$emit('error', {
							source: "parse",
							errMsg: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + typeof html.nodes
						});
						return;
					}
					this.showAnimation = showAnimation;
					this.imgList = html.imgList || [];
					// #ifdef APP-PLUS
					this.loadVideo = false;
					// #endif
					if (Document) this.document = new Document("html.nodes", html.nodes, this);
					if (html.title && this.autosetTitle)
						uni.setNavigationBarTitle({
							title: html.title
						})
					this.ready();
				} else {
					this.$emit('error', {
						source: "parse",
						errMsg: "错误的html类型：" + typeof html
					});
				}
			},
			// #ifdef H5
			Dom2Str(node) {
				if (node.type == "text")
					return node.text;
				var elem = '<' + node.name;
				for (var attr in node.attrs)
					elem += (' ' + atts + '="' + node.attrs[attr] + '"');
				elem += ">";
				for (var child of node.children)
					elem += Dom2Str(child);
				elem += ("</" + node.name + ">");
				return elem;
			},
			// #endif
			// #ifndef H5
			getContext(components) {
				for (let component of components) {
					let observered = false;
					if (!component.nodes)
						return this.getContext(component.$children);
					for (let item of component.nodes) {
						// #ifndef MP-ALIPAY
						if (item.name == 'img' && !observered) {
							observered = true;
							if (component.lazyLoad && CanIUseObserver) {
								component._observer = uni.createIntersectionObserver(component);
								component._observer.relativeToViewport({
									top: 1000,
									bottom: 1000
								}).observe('.img', res => {
									component.imgLoad = true;
									component._observer.disconnect();
									component._observer = null;
								})
							} else
								component.imgLoad = true;
						} else if (item.name == 'video') {
							this.videoContext.push({
								id: item.attrs.id,
								context: uni.createVideoContext(item.attrs.id, component)
							});
						}
						// #endif
						// #ifdef MP-BAIDU || MP-ALIPAY
						if (item.attrs && item.attrs.id) {
							this.anchors.push({
								id: item.attrs.id,
								node: component
							})
						}
						// #endif
					}
					this.getContext(component.$children);
				}
			},
			// #endif
			ready() {
				this.$nextTick(() => {
					this.navigateTo = (obj) => {
						obj.success = obj.success || function() {};
						obj.fail = obj.fail || function() {};
						var Scroll = (selector,component) => {
							const query = uni.createSelectorQuery().in(component?component:this);
							query.select(selector).boundingClientRect();
							query.selectViewport().scrollOffset();
							query.exec(res => {
								if (!res || !res[0])
									return obj.fail({
										errMsg: "Label Not Found"
									});
								uni.pageScrollTo({
									scrollTop: res[1].scrollTop + res[0].top,
									success: obj.success,
									fail: obj.fail
								})
							})
						}
						if (!obj.id) Scroll(".contain");
						else {
							// #ifndef MP-BAIDU || MP-ALIPAY
							Scroll('.contain >>> #' + obj.id);
							// #endif
							// #ifdef MP-BAIDU || MP-ALIPAY
							for (var anchor of this.anchors) {
								if (anchor.id == obj.id) {
									Scroll("#" + obj.id, anchor.node);
								}
							}
							// #endif
						}
					}
					uni.createSelectorQuery().in(this).select(".contain").boundingClientRect(res => {
						this.$emit("ready", res);
					}).exec()
					// #ifndef H5
					this.getContext(this.$children);
					// #endif
					// #ifdef APP-PLUS
					setTimeout(() => {
						this.loadVideo = true;
					}, 3000);
					// #endif
				})
			}
		},
		watch: {
			html(html) {
				this.execHtml(html);
			}
		}
	}
</script>

<style>
	/* #ifndef MP-BAIDU */
	:host {
		display: block;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}

	/* #endif */
</style>
