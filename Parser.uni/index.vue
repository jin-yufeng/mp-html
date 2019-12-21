<!--
 parser 主模块组件
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 插件市场：https://ext.dcloud.net.cn/plugin?id=805
 author：JinYufeng
-->
<template>
	<view>
		<!--#ifdef H5-->
		<slot v-if="!html && !nodes.length"></slot>
		<div :id="'rtf' + uid" :style="(selectable ? 'user-select:text;-webkit-user-select:text;' : '') + (showWithAnimation ? ('opacity:0;' + showAnimation) : '')"></div>
		<!--#endif-->
		<!--#ifndef H5-->
		<slot v-if="!html[0].name && !html[0].type && !nodes.length"></slot>
		<!--#endif-->
		<!--#ifdef MP-ALIPAY-->
		<view class="_contain" :style="(selectable ? 'user-select:text;-webkit-user-select:text;' : '') + (showWithAnimation ? ('opacity:0;' + showAnimation) : '')">
			<trees :nodes="nodes.length ? nodes : (html[0].name || html[0].type ? html : [])" :imgMode="imgMode" />
		</view>
		<!--#endif-->
		<!--#ifndef MP-ALIPAY || H5-->
		<trees class="_contain" :style="'display:block;' + (selectable ? 'user-select:text;-webkit-user-select:text;' : '') + (showWithAnimation ? ('opacity:0;' + showAnimation) : '')"
		 :nodes="nodes.length ? nodes : (html[0].name || html[0].type ? html : [])" :imgMode="imgMode" :loadVideo="loadVideo" />
		<!--#endif-->
	</view>
</template>

<script>
	// #ifndef H5
	import trees from "./trees"
	var document; // document 补丁包，详见 https://jin-yufeng.github.io/Parser/#/instructions?id=document
	const parseHtmlSync = require('./libs/MpHtmlParser.js').parseHtmlSync;
	const cache = getApp().parserCache = {};
	const CssHandler = require("./libs/CssHandler.js");
	// 散列函数（计算 cache 的 key）
	const Hash = (str) => {
		for (var i = 0, hash = 5381, len = str.length; i < len; i++)
			hash += (hash << 5) + str.charCodeAt(i);
		return hash;
	};
	// #endif
	// 动画
	const showAnimation =
		"transition:400ms ease 0ms;transition-property:transform,opacity;transform-origin:50% 50% 0;-webkit-transition:400ms ease 0ms;-webkit-transform:;-webkit-transition-property:transform,opacity;-webkit-transform-origin:50% 50% 0;opacity: 1"
	const config = require('./libs/config.js');
	// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU || MP-TOUTIAO
	// 图片链接去重
	const Deduplication = (src) => {
		if (src.indexOf("http") != 0) return src;
		var newSrc = '';
		for (var i = 0; i < src.length; i++) {
			newSrc += (Math.random() >= 0.5 ? src[i].toUpperCase() : src[i].toLowerCase());
			if (src[i] == '/' && src[i - 1] != '/' && src[i + 1] != '/') break;
		}
		newSrc += src.substring(i + 1);
		return newSrc;
	}
	// #endif
	export default {
		name: 'parser',
		data() {
			return {
				// #ifdef APP-PLUS
				loadVideo: false,
				// #endif
				// #ifdef H5
				uid: this._uid,
				showAnimation: '',
				// #endif
				// #ifndef H5
				showAnimation: {},
				controls: {},
				// #endif
				nodes: []
			}
		},
		// #ifndef H5
		components: {
			trees
		},
		// #endif
		props: {
			'html': {
				type: null,
				default: null
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
			'useAnchor': {
				type: Boolean,
				default: false
			},
			'useCache': {
				type: Boolean,
				default: false
			}
		},
		watch: {
			html(html) {
				this.setContent(html, undefined, true);
			}
		},
		mounted() {
			this.imgList = [];
			this.imgList.each = function(f) {
				for (var i = 0; i < this.length; i++) {
					// #ifdef MP-ALIPAY || APP-PLUS
					this[i] = f(this[i], i, this) || this[i];
					// #endif
					// #ifndef MP-ALIPAY || APP-PLUS
					var newSrc = f(this[i], i, this);
					if (newSrc) {
						if (this.includes(newSrc)) this[i] = Deduplication(newSrc);
						else this[i] = newSrc;
					}
					// #endif
				}
			}
			this.setContent(this.html, undefined, true);
		},
		// #ifdef H5
		beforeDestroy() {
			if (this._observer) this._observer.disconnect();
		},
		// #endif
		methods: {
			// #ifdef H5
			setContent(html, options, observed) {
				if (typeof options == "object")
					for (var key in options) {
						key = key.replace(/-(\w)/g, function() {
							return arguments[1].toUpperCase();
						})
						this[key] = options[key];
					}
				html = html || '';
				if (!html) {
					if (this.rtf) this.rtf.parentNode.removeChild(this.rtf);
					return;
				}
				if (typeof html != 'string') html = this.Dom2Str(html.nodes || html);
				// 处理 rpx
				if (/[0-9.]*?rpx/.test(html)) {
					const rpx = uni.getSystemInfoSync().screenWidth / 750;
					html = html.replace(/([0-9.]*?)rpx/g, function() {
						return parseFloat(arguments[1]) * rpx + "px";
					})
				}
				// 处理 tag-style 和 userAgentStyles
				var style = "<style>";
				for (var item in config.userAgentStyles)
					style += (item + '{' + config.userAgentStyles[item] + '}');
				for (var item in this.tagStyle)
					style += (item + '{' + this.tagStyle[item] + '}');
				style += "</style>";
				html = style + html;
				if (this.rtf) this.rtf.parentNode.removeChild(this.rtf);
				this.rtf = document.createElement('div');
				this.rtf.innerHTML = html;
				for (var style of this.rtf.getElementsByTagName("style")) {
					style.innerHTML = style.innerHTML.replace(/\s*body/g, "#rtf" + this._uid);
					style.setAttribute("scoped", "true");
				}
				// 懒加载
				if (this.lazyLoad && IntersectionObserver) {
					if (this._observer) this._observer.disconnect();
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
				// 获取标题
				var title = this.rtf.getElementsByTagName("title");
				if (title.length && this.autosetTitle)
					uni.setNavigationBarTitle({
						title: title[0].innerText
					})
				// 图片处理
				this.imgList.length = 0;
				var imgs = this.rtf.getElementsByTagName("img");
				for (var i = 0; i < imgs.length; i++) {
					var img = imgs[i];
					img.style.maxWidth = "100%";
					img.i = i;
					component.imgList.push(img.src);
					if (img.parentElement.nodeName != 'A') {
						img.onclick = function() {
							if (!this.hasAttribute('ignore')) {
								var preview = true;
								this.ignore = () => preview = false;
								component.$emit('imgtap', this);
								if (preview && component.autopreview) {
									uni.previewImage({
										current: this.i,
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
				// 链接处理
				var links = this.rtf.getElementsByTagName("a");
				for (var link of links) {
					link.onclick = function(e) {
						var jump = true,
							href = this.getAttribute("href");
						component.$emit('linkpress', {
							href,
							ignore: () => jump = false
						});
						if (jump && href) {
							if (href[0] == '#') {
								if (component.useAnchor) {
									component.navigateTo({
										id: href.substring(1)
									})
								}
							} else if (href.indexOf("http") == 0 || href.indexOf("//") == 0)
								return true;
							else {
								uni.navigateTo({
									url: href
								})
							}
						}
						return false;
					}
				}
				// 视频处理
				var videos = this.rtf.getElementsByTagName("video");
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
				// 音频处理
				var audios = this.rtf.getElementsByTagName("audios");
				for (var audio of audios) {
					audio.onerror = function(e) {
						component.$emit('error', {
							source: "audio",
							target: this
						});
					}
				}
				document.getElementById("rtf" + this._uid).appendChild(this.rtf);
				if (this.showWithAnimation)
					this.showAnimation = showAnimation;
				if (!observed) this.nodes = [0];
				this.$nextTick(() => {
					this.$emit("ready", this.rtf.getBoundingClientRect());
				})
			},
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
			getText(whiteSpace = true) {
				if (!whiteSpace) return this.rtf.innerText.replace(/\s/g, '');
				return this.rtf.innerText;
			},
			navigateTo(obj) {
				if (!obj.id) {
					window.scrollTo(0, this.rtf.offsetTop);
					return obj.success ? obj.success({
						errMsg: "pageScrollTo:ok"
					}) : null;
				}
				var target = document.getElementById(obj.id);
				if (!target) return obj.fail ? obj.fail({
					errMsg: "Label Not Found"
				}) : null;
				window.scrollTo(0, this.rtf.offsetTop + target.offsetTop);
				return obj.success ? obj.success({
					errMsg: "pageScrollTo:ok"
				}) : null;
			},
			// #endif
			// #ifndef H5
			setContent(html, options, observed) {
				if (typeof options == "object")
					for (var key in options) {
						key = key.replace(/-(\w)/g, function() {
							return arguments[1].toUpperCase();
						})
						this[key] = options[key];
					}
				if (this.showWithAnimation)
					this.showAnimation = showAnimation;
				if (!html) {
					if (observed) return;
					else this.nodes = [];
				} else if (typeof html == "string") {
					var res;
					// 缓存读取
					if (this.useCache) {
						var hash = Hash(html);
						if (cache[hash])
							res = cache[hash];
						else {
							res = parseHtmlSync(html, this);
							cache[hash] = res;
						}
					} else res = parseHtmlSync(html, this);
					this.nodes = res;
					this.$emit('parse', res);
				} else if (html.constructor == Array) {
					if (!observed) this.nodes = html;
					else this.nodes = [];
					// 非本插件产生的 array 需要进行一些转换
					if (html.length && html[0].PoweredBy != "Parser") {
						const Parser = {
							_imgNum: 0,
							_videoNum: 0,
							_audioNum: 0,
							_domain: this.domain,
							_protocol: this.domain ? (this.domain.includes("://") ? this.domain.split("://")[0] : "http") : undefined,
							_STACK: [],
							CssHandler: new CssHandler(this.tagStyle),
							bubbling() {
								for (var i = this._STACK.length - 1; i >= 0; i--) {
									if (config.trustTags[this._STACK[i].name] !== 0)
										this._STACK[i].continue = true;
									else
										return this._STACK[i].name;
								}
							}
						};
						Parser.CssHandler.getStyle('');
						const DFS = (nodes) => {
							for (var node of nodes) {
								if (node.type == "text") continue;
								config.LabelAttrsHandler(node, Parser);
								if (config.blockTags[node.name]) node.name = 'div';
								else if (!config.trustTags.hasOwnProperty(node.name)) node.name = 'span';
								if (node.children && node.children.length) {
									Parser._STACK.push(node);
									DFS(node.children);
									Parser._STACK.pop();
								}
							}
						}
						DFS(html);
						this.nodes = html;
					}
				} else if (typeof html == 'object' && html.nodes) {
					this.nodes = html.nodes;
					console.warn("Parser 类型错误：object 类型已废弃，请直接将 html 设置为 object.nodes （array 类型）");
				} else {
					return this.$emit('error', {
						source: "parse",
						errMsg: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + typeof html.nodes
					});
				}
				// #ifdef APP-PLUS
				this.loadVideo = false;
				// #endif
				if (document) this.document = new document("html", this.html || html, this);
				this.$nextTick(() => {
					this.imgList.length = 0;
					this.videoContexts = [];
					const getContext = (components) => {
						for (let component of components) {
							if (component.$options.name == "trees") {
								let observered = false;
								for (let item of component.nodes) {
									if (item.continue) continue;
									if (item.name == 'img') {
										if (item.attrs.src && !item.attrs.ignore) {
											// #ifndef MP-ALIPAY || APP-PLUS
											if (this.imgList.indexOf(item.attrs.src) == -1)
												this.imgList[item.attrs.i] = item.attrs.src;
											else this.imgList[item.attrs.i] = Deduplication(item.attrs.src);
											// #endif
											// #ifdef MP-ALIPAY || APP-PLUS
											this.imgList[item.attrs.i] = item.attrs.src;
											// #endif
										}
										// #ifndef MP-ALIPAY
										if (!observered) {
											observered = true;
											if (this.lazyLoad && uni.createIntersectionObserver) {
												if (component._observer) component._observer.disconnect();
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
										}
										// #endif
									}
									// #ifndef MP-ALIPAY
									else if (item.name == 'video') {
										var context = uni.createVideoContext(item.attrs.id, component);
										context.id = item.attrs.id;
										this.videoContexts.push(context);
									}
									// #endif
									// #ifdef MP-WEIXIN
									else if (item.name == 'audio' && item.attrs.autoplay)
										wx.createAudioContext(item.attrs.id, component).play();
									// #endif
									// 设置标题
									else if (item.name == "title") {
										if (item.children[0].type == "text" && item.children[0].text && this.autosetTitle)
											uni.setNavigationBarTitle({
												title: item.children[0].text
											})
									}
									// #ifdef MP-BAIDU || MP-ALIPAY
									if (item.attrs && item.attrs.id) {
										this.anchors = this.anchors || [];
										this.anchors.push({
											id: item.attrs.id,
											node: component
										})
									}
									// #endif
								}
							}
							if (component.$children.length)
								getContext(component.$children)
						}
					}
					// #ifdef MP-TOUTIAO
					setTimeout(() => {
						// #endif
						getContext(this.$children)
						uni.createSelectorQuery().in(this).select("._contain").boundingClientRect(res => {
							this.$emit("ready", res);
						}).exec();
						// #ifdef MP-TOUTIAO
					}, 200)
					// #endif
					// #ifdef APP-PLUS
					setTimeout(() => {
						this.loadVideo = true;
					}, 3000);
					// #endif
				})
			},
			getText(whiteSpace = true) {
				var text = "";
				const DFS = (node) => {
					if (node.type == "text") return text += node.text;
					else {
						if (whiteSpace && (((node.name == 'p' || node.name == "div" || node.name == "tr" || node.name == "li" ||
								/h[1-6]/.test(node.name)) && text && text[text.length - 1] != '\n') || node.name == "br"))
							text += '\n';
						for (var child of node.children || [])
							DFS(child);
						if (whiteSpace && (node.name == 'p' || node.name == "div" || node.name == "tr" || node.name == "li" || /h[1-6]/.test(
								node.name)) && text && text[text.length - 1] != '\n')
							text += '\n';
						else if (whiteSpace && node.name == "td") text += '\t';
					}
				}
				var nodes = ((this.nodes && this.nodes.length) ? this.nodes : (this.html[0] && (this.html[0].name || this.html[0].type) ? this.html : []));
				if (!nodes.length) return "";
				for (var node of nodes)
					DFS(node);
				return text;
			},
			navigateTo(obj) {
				var Scroll = (selector, component) => {
					const query = uni.createSelectorQuery().in(component ? component : this);
					query.select(selector).boundingClientRect();
					query.selectViewport().scrollOffset();
					query.exec(res => {
						if (!res || !res[0])
							return obj.fail ? obj.fail({
								errMsg: "Label Not Found"
							}) : null;
						uni.pageScrollTo({
							scrollTop: res[1].scrollTop + res[0].top,
							success: obj.success,
							fail: obj.fail
						})
					})
				}
				if (!obj.id) Scroll("._contain");
				else {
					// #ifndef MP-BAIDU || MP-ALIPAY
					Scroll('._contain >>> #' + obj.id);
					// #endif
					// #ifdef MP-BAIDU || MP-ALIPAY
					for (var anchor of this.anchors) {
						if (anchor.id == obj.id) {
							Scroll("#" + obj.id, anchor.node);
						}
					}
					// #endif
				}
			},
			// #endif
			getVideoContext(id) {
				if (!id) return this.videoContexts;
				else {
					for (var video of this.videoContexts) {
						if (video.id == id) return video;
					}
				}
				return null;
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
