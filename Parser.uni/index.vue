<template>
	<view>
		<!--#ifdef H5-->
		<slot v-if="!html"></slot>
		<div :id="'rtf' + uid" :style="(selectable?'user-select:text;-webkit-user-select:text':'')+(showWithAnimation?('opacity:0;'+showAnimation):'')"></div>
		<!--#endif-->
		<!--#ifndef H5-->
		<slot v-if="!(html.nodes||((html&&(html[0].name||html[0].type))?1:nodes.length))"></slot>
		<!--#endif-->
		<!--#ifdef MP-ALIPAY-->
		<view class="contain" :style="(showWithAnimation?'opacity:0;':'')+(selectable?'user-select:text;-webkit-user-select:text':'')"
		 :animation="showAnimation">
			<trees :nodes="html.nodes||((html&&(html[0].name||html[0].type))?html:nodes)" :imgMode="imgMode" />
		</view>
		<!--#endif-->
		<!--#ifndef MP-ALIPAY || H5-->
		<trees class="contain" :style="'display:block'+(showWithAnimation?'opacity:0;':'')+(selectable?'user-select:text;-webkit-user-select:text':'')"
		 :animation="showAnimation" :nodes="html.nodes||((html[0].name||html[0].type)?html:nodes)" :imgMode="imgMode"
		 :loadVideo="loadVideo" />
		<!--#endif-->
	</view>
</template>

<script>
	import trees from "./trees"
	const parseHtmlSync = require('./libs/MpHtmlParser.js').parseHtmlSync;
	const config = require('./libs/config.js');
	const App = getApp();
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
				// #ifdef H5
				uid: this._uid,
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
			'cacheId': {
				type: String,
				default: null
			},
			'domain': {
				type: String,
				default: null
			},
			'imgMode': {
				type: String,
				default: 'default'
			},
			// #ifdef MP-WEIXIN || MP-QQ || H5 || APP-PLUS
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
			this.videoContexts = [];
			// #endif
			// #ifdef MP-BAIDU || MP-ALIPAY
			this.anchors = [];
			// #endif
		},
		// #ifdef H5
		beforeDestroy() {
			if (this._observer) this._observer.disconnect();
		},
		// #endif
		methods: {
			execHtml(html) {
				// #ifdef H5
				if (!html) html = '';
				if (typeof html != 'string') html = this.Dom2Str(html.nodes || html);
				// 处理 rpx
				if (/[0-9.]*?rpx/.test(html)) {
					var rpx = uni.getSystemInfoSync().screenWidth / 750;
					html = html.replace(/([0-9.]*?)rpx/g, function() {
						return parseFloat(arguments[1]) * rpx + "px";
					})
				}
				// 处理 tag-style 和 userAgentStyles
				var style = "<style>";
				for (var item in config.userAgentStyles)
					style += (item + '{' + config.userAgentStyles[item] + '}');
				for (var item in this.tagStyle || {})
					style += (item + '{' + config.userAgentStyles[item] + '}');
				style += "</style>";
				html = style + html;
				var rtf = document.createElement('div');
				rtf.innerHTML = html;
				for (var style of rtf.getElementsByTagName("style")) {
					style.innerHTML = style.innerHTML.replace(/\s*body/g, "#rtf" + this._uid);
					style.setAttribute("scoped", "true");
				}
				this.imgList = [];
				var imgs = rtf.getElementsByTagName("img");
				if (this.lazyLoad && IntersectionObserver) {
					this._observer = new IntersectionObserver(changes => {
						for (var change of changes) {
							if (change.isIntersecting) {
								change.target.src = change.target.getAttribute("data-src");
								change.target.removeAttribute("data-src");
								this._observer.unobserve(change.target);
							}
						}
					}, {
						rootMargin: "1000px 0px 1000px 0px"
					})
				}
				var component = this;
				for (var i = 0; i < imgs.length; i++) {
					var img = imgs[i];
					img.style.maxWidth = "100%";
					img.index = i;
					component.imgList.push(img.src);
					if (img.parentElement.nodeName != 'A') {
						img.onclick = function() {
							if (!this.hasAttribute('ignore')) {
								var preview = true;
								this.ignore = () => preview = false;
								component.$emit('imgtap', this);
								if (preview && component.autopreview) {
									uni.previewImage({
										current: this.index,
										urls: component.imgList
									});
								}
							}
						}
					}
					img.onerror = function() {
						component.$emit('error', {
							source: "img",
							target: this
						});
					}
					if (component.lazyLoad && this._observer) {
						img.setAttribute("data-src", img.src);
						img.removeAttribute("src");
						this._observer.observe(img);
					}
				}
				var links = rtf.getElementsByTagName("a");
				for (var link of links) {
					link.onclick = function(e) {
						var jump = true;
						component.$emit('linkpress', {
							href: this.getAttribute("href"),
							ignore: () => jump = false
						});
						if (jump && this.getAttribute("href")) {
							if (this.getAttribute("href")[0] == '#') {
								if (component.useAnchor) {
									var target = document.getElementById(this.getAttribute('href').substring(1));
									if (target)
										window.scrollTo(0, target.offsetTop);
								}
							} else if (/^http/.test(this.getAttribute("href"))) {
								if (component.autocopy)
									window.location.href = this.href;
							} else {
								uni.navigateTo({
									url: this.getAttribute("href")
								})
							}
						}
						return false;
					}
				}
				var videos = rtf.getElementsByTagName("video");
				component.videoContexts = videos;
				for (var video of videos) {
					video.style.maxWidth = "100%";
					video.onerror = function() {
						component.$emit('error', {
							source: "video",
							target: this
						});
					}
					video.onplay = function() {
						if (component.autopause) {
							for (var video of component.videoContexts) {
								if (video != this)
									video.pause();
							}
						}
					}
				}
				var audios = rtf.getElementsByTagName("audios");
				for (var audio of audios) {
					audio.onerror = function(e) {
						component.$emit('error', {
							source: "audio",
							target: this
						});
					}
				}
				document.getElementById("rtf" + this._uid).appendChild(rtf);
				this.showAnimation =
					"opacity: 1; transition: opacity 400ms ease 0ms, -webkit-transform 400ms ease 0ms, transform 400ms ease 0ms; transform-origin: 50% 50% 0px;";
				this.$nextTick(() => {
					this.$emit("ready", rtf.getBoundingClientRect());
				})
				return;
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
					var res;
					// 缓存读取
					if (this.cacheId) {
						App.globalData = App.globalData || {};
						if (App.globalData[this.cacheId])
							res = App.globalData[this.cacheId];
						else {
							res = parseHtmlSync(html, this);
							App.globalData[this.cacheId] = res;
						}
					} else res = parseHtmlSync(html, this);
					console.log(res)
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
					this.$emit('parse', res);
					this.ready();
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
			Dom2Str(nodes) {
				var str = "";
				for (var node of nodes) {
					if (node.type == "text")
						str += node.text;
					else {
						str += ('<' + node.name);
						for (var attr in node.attrs || {})
							str += (' ' + attr + '="' + node.attrs[attr] + '"');
						if (!node.children || !node.children.length) str += "/>";
						else str += ('>' + this.Dom2Str(node.children) + "</" + node.name + '>');
					}
				}
				return str;
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
							if (this.lazyLoad && uni.createIntersectionObserver) {
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
							this.videoContexts.push({
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
			ready() {
				this.$nextTick(() => {
					this.getContext(this.$children);
					uni.createSelectorQuery().in(this).select(".contain").boundingClientRect(res => {
						this.$emit("ready", res);
					}).exec();
					// #ifdef APP-PLUS
					setTimeout(() => {
						this.loadVideo = true;
					}, 3000);
					// #endif
				})
			},
			// #endif
			getText() {
				// #ifdef H5
				return this.iframe.contentWindow.document.innerText;
				// #endif
				// #ifndef H5
				var text = "";
				var traverse = (node) => {
					if (node.type == "text") return text += node.text;
					else {
						if ((node.name == "p" || node.name == "div" || node.name == "br") && text[text.length - 1] != '\n')
							text += '\n';
						for (var child of node.children)
							traverse(child);
					}
				}
				if (!this.html) return "";
				for (var node of (this.html.nodes || ((this.html[0].name || this.html[0].type) ? this.html :
						this.nodes)))
					traverse(node);
				return text;
				// #endif
			},
			navigateTo(obj) {
				obj.success = obj.success || (() => null);
				obj.fail = obj.fail || (() => null);
				// #ifdef H5
				if (!obj.id) return window.scrollTo(0, this.iframe.offsetTop);
				var target = iframe.contentWindow.document.getElementById(obj.id);
				if (!target) return obj.fail({
					errMsg: "Label Not Found"
				});
				return window.scrollTo(0, this.iframe.offsetTop + target.offsetTop);
				// #endif
				// #ifndef H5
				var Scroll = (selector, component) => {
					const query = uni.createSelectorQuery().in(component ? component : this);
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
				// #endif
			},
			getVideoContext(id) {
				if (!id) return this.videoContexts;
				else {
					for (var video of this.videoContexts) {
						if (video.id == id) return video;
					}
				}
				return null;
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
