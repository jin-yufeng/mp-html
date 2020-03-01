<!--
  parser 主模块组件
  github：https://github.com/jin-yufeng/Parser 
  docs：https://jin-yufeng.github.io/Parser
  插件市场：https://ext.dcloud.net.cn/plugin?id=805
  author：JinYufeng
-->
<template>
	<view style="display:inherit;">
		<slot v-if="!nodes.length"></slot>
		<view class="_contain" :style="showAnimation+(selectable?';user-select:text;-webkit-user-select:text':'')" :animation="scaleAnimation"
		 @tap="_tap" @touchstart="_touchstart" @touchmove="_touchmove">
			<!--#ifdef H5-->
			<div :id="'rtf'+uid" :contentEditable="editable"></div>
			<!--#endif-->
			<!--#ifndef H5-->
			<trees :nodes="nodes" :loadVideo="loadVideo" />
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	// #ifndef H5
	import trees from "./libs/trees";
	const cache = getApp().parserCache = {};
	const CssHandler = require("./libs/CssHandler.js");
	var document; // document 补丁包 https://jin-yufeng.github.io/Parser/#/instructions?id=document
	// #ifdef MP-WEIXIN || MP-TOUTIAO
	const fs = uni.getFileSystemManager ? uni.getFileSystemManager() : null;
	// #endif
	const MpHtmlParser = require("./libs/MpHtmlParser.js");
	// 计算 cache 的 key
	function hash(str) {
		for (var i = str.length, hash = 5381; i--;)
			hash += (hash << 5) + str.charCodeAt(i);
		return hash;
	};
	// #endif
	const config = require('./libs/config.js');
	export default {
		name: 'parser',
		data() {
			return {
				// #ifdef APP-PLUS
				loadVideo: false,
				// #endif
				// #ifdef H5
				uid: this._uid,
				// #endif
				scaleAnimation: '',
				showAnimation: '',
				nodes: []
			}
		},
		// #ifndef H5
		components: {
			trees
		},
		// #endif
		props: {
			"html": null,
			// #ifndef MP-ALIPAY
			"autopause": {
				type: Boolean,
				default: true
			},
			// #endif
			"autosetTitle": {
				type: Boolean,
				default: true
			},
			"domain": String,
			// #ifdef H5
			"editable": Boolean,
			// #endif
			// #ifndef MP-BAIDU || MP-ALIPAY || APP-PLUS
			"gestureZoom": Boolean,
			// #endif
			// #ifdef MP-WEIXIN || MP-QQ || H5 || APP-PLUS
			"lazyLoad": Boolean,
			// #endif
			"selectable": Boolean,
			"tagStyle": Object,
			"showWithAnimation": Boolean,
			"useAnchor": Boolean,
			"useCache": Boolean
		},
		watch: {
			html(html) {
				this.setContent(html, true);
			}
		},
		mounted() {
			// 图片数组
			this.imgList = [];
			this.imgList.each = function(f) {
				for (var i = 0; i < this.length; i++) {
					var newSrc = f(this[i], i, this);
					if (newSrc) this.setItem(i, newSrc);
				}
			}
			this.imgList.setItem = function(i, src) {
				if (!src) return;
				// #ifndef MP-ALIPAY || APP-PLUS
				// 去重
				if (src.includes("http") && this.includes(src)) {
					var newSrc = '';
					for (var j = 0, c; c = src[j]; j++) {
						newSrc += Math.random() > 0.5 ? c.toUpperCase() : c;
						if (c == '/' && src[j - 1] != '/' && src[j + 1] != '/') break;
					}
					newSrc += src.substring(j + 1);
					return this[i] = newSrc;
				}
				// #endif
				this[i] = src;
				// 暂存 data:image
				if (src.includes("data:image")) {
					var fileInfo = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
					if (!fileInfo) return;
					// #ifdef MP-WEIXIN || MP-TOUTIAO
					var filePath = `${wx.env.USER_DATA_PATH}/${Date.now()}.${fileInfo[1]}`;
					fs && fs.writeFile({
						filePath,
						data: fileInfo[3],
						encoding: fileInfo[2],
						success: (res) => this[i] = filePath
					})
					// #endif
					// #ifdef APP-PLUS
					var filePath = `_doc/parser_tmp/${Date.now()}.${fileInfo[1]}`;
					var bitmap = new plus.nativeObj.Bitmap();
					bitmap.loadBase64Data(src, () => {
						bitmap.save(filePath, {}, () => {
							bitmap.clear()
							this[i] = filePath;
						})
					})
					// #endif
				}
			}
			if (!this.nodes.length) this.setContent(this.html, true);
		},
		beforeDestroy: function() {
			// #ifdef H5
			if (this._observer) this._observer.disconnect();
			// #endif
			this.imgList.each((item) => {
				// #ifdef APP-PLUS
				if (item && item.includes("_doc")) {
					plus.io.resolveLocalFileSystemURL(item, function(entry) {
						entry.remove();
					});
				}
				// #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO
				if (item && item.includes(uni.env.USER_DATA_PATH))
					fs && fs.unlink({
						filePath: item
					})
				// #endif
			})
		},
		methods: {
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
			setContent(html, observed) {
				// #ifdef H5
				if (!html) {
					if (this.rtf) this.rtf.parentNode.removeChild(this.rtf);
					return;
				}
				if (typeof html != "string") html = this.Dom2Str(html.nodes || html);
				// 处理 rpx
				if (html.includes("rpx"))
					html = html.replace(/[0-9.]*rpx/g, function($) {
						return (parseFloat($) * config.screenWidth / 750) + "px";
					})
				// 处理 tag-style 和 userAgentStyles
				var style = "<style>@keyframes show{0%{opacity:0}100%{opacity:1}}";
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
				for (var i = 0, j = 0, img; img = imgs[i]; i++) {
					img.style.maxWidth = "100%";
					if (this.domain && img.getAttribute("src")[0] == "/") {
						if (img.getAttribute("src")[1] == "/")
							img.src = (this.domain.includes("://") ? this.domain.split("://")[0] : "http") + ':' + img.getAttribute("src");
						else img.src = this.domain + img.getAttribute("src");
					}
					if (!img.hasAttribute("ignore")) {
						img.i = j++;
						component.imgList.push(img.src);
						if (img.parentElement.nodeName != 'A') {
							img.onclick = function() {
								var preview = true;
								this.ignore = () => preview = false;
								component.$emit("imgtap", this);
								if (preview) {
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
				var links = this.rtf.getElementsByTagName('a');
				for (var link of links) {
					link.onclick = function(e) {
						var jump = true,
							href = this.getAttribute("href");
						component.$emit("linkpress", {
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
						component.$emit("error", {
							source: "audio",
							target: this
						});
					}
				}
				document.getElementById("rtf" + this._uid).appendChild(this.rtf);
				this.document = this.rtf;
				this.$nextTick(() => {
					this.nodes = [1];
					var rect = this.rtf.getBoundingClientRect();
					this.width = rect.width;
					this.$emit("ready", rect);
				})
				setTimeout(() => this.showAnimation = '', 500);
				// #endif
				// #ifndef H5
				if (!html)
					return this.nodes = [];
				else if (typeof html == "string") {
					var Parser = new MpHtmlParser(html, this);
					// 缓存读取
					if (this.useCache) {
						var hashValue = hash(html);
						if (cache[hashValue])
							this.nodes = cache[hashValue];
						else {
							this.nodes = Parser.parse();
							cache[hashValue] = this.nodes;
						}
					} else this.nodes = Parser.parse();
					this.$emit("parse", this.nodes);
				} else if (Object.prototype.toString.call(html) == "[object Array]") {
					// 非本插件产生的 array 需要进行一些转换
					if (html.length && html[0].PoweredBy != "Parser") {
						var Parser = new MpHtmlParser(html, this);

						function DFS(nodes) {
							for (var i = 0, node; node = nodes[i]; i++) {
								if (node.type == "text") continue;
								node.attrs = node.attrs || {};
								for (var item in node.attrs) {
									if (!config.trustAttrs[item]) node.attrs[item] = void 0;
									else if (typeof node.attrs[item] != "string") node.attrs[item] = node.attrs[item].toString();
								}
								config.LabelHandler(node, Parser);
								if (config.ignoreTags[node.name]) {
									nodes.splice(i--, 1);
									continue;
								}
								if (node.children && node.children.length) {
									Parser._STACK.push(node);
									DFS(node.children);
									Parser.popNode(Parser._STACK.pop());
								} else node.children = void 0;
							}
						}
						DFS(html);
					}
					this.nodes = html;
				} else if (typeof html == "object" && html.nodes) {
					this.nodes = html.nodes;
					console.warn("错误的 html 类型：object 类型已废弃");
				} else
					return console.warn("错误的 html 类型：" + typeof html);
				// #ifdef APP-PLUS
				this.loadVideo = false;
				// #endif
				if (document) this.document = new document(this.nodes, "nodes", this);
				this.$nextTick(() => {
					this.imgList.length = 0;
					this.videoContexts = [];
					const getContext = (components) => {
						for (var i = components.length; i--;) {
							let component = components[i];
							if (component.$options.name == "trees") {
								var observered = false;
								for (var j = component.nodes.length, item; item = component.nodes[--j];) {
									if (item.c) continue;
									if (item.name == "img") {
										if (item.attrs.i)
											this.imgList.setItem(item.attrs.i, item.attrs.src);
										// #ifndef MP-ALIPAY
										if (!observered) {
											observered = true;
											if (this.lazyLoad && uni.createIntersectionObserver) {
												if (component._observer) component._observer.disconnect();
												component._observer = uni.createIntersectionObserver(component);
												component._observer.relativeToViewport({
													top: 1000,
													bottom: 1000
												}).observe("._img", res => {
													component.imgLoad = true;
													if (component._observer) {
														component._observer.disconnect();
														component._observer = null;
													}
												})
											} else
												component.imgLoad = true;
										}
										// #endif
									}
									// #ifndef MP-ALIPAY
									else if (item.name == "video") {
										var context = uni.createVideoContext(item.attrs.id, component);
										context.id = item.attrs.id;
										this.videoContexts.unshift(context);
									}
									// #endif
									// #ifdef MP-WEIXIN
									else if (item.name == "audio" && item.attrs.autoplay)
										wx.createAudioContext(item.attrs.id, component).play();
									// #endif
									// 设置标题
									else if (item.name == "title" && this.autosetTitle && item.children[0].type == "text")
										uni.setNavigationBarTitle({
											title: item.children[0].text
										})
									// #ifdef MP-BAIDU || MP-ALIPAY || APP-PLUS
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
						getContext(this.$children);
						// #ifndef APP-PLUS
						this.createSelectorQuery()
						// #endif
						// #ifdef APP-PLUS
						uni.createSelectorQuery().in(this)
							// #endif
							.select("._contain").boundingClientRect().exec(res => {
								this.width = (res[0] ? res[0] : res).width;
								this.$emit("ready", res);
							});
						// #ifdef MP-TOUTIAO
					}, 200)
					// #endif
					// #ifdef APP-PLUS
					setTimeout(() => {
						this.loadVideo = true;
					}, 3000);
					// #endif
				})
				// #endif
				if (this.showWithAnimation) this.showAnimation = "animation:show .5s";
			},
			getText(nodes = this.html || this.nodes) {
				// #ifdef H5
				return this.rtf.innerText;
				// #endif
				// #ifndef H5
				var text = '';
				for (var i = 0, node; node = nodes[i++];) {
					if (node.type == "text") text += node.text.replace(/&nbsp;/g, '\u00A0').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
						.replace(/&amp;/g, '&');
					else if (node.type == "br") text += '\n';
					else {
						// 块级标签前后加换行
						var block = node.name == 'p' || node.name == "div" || node.name == "tr" || node.name == "li" || (node.name[0] ==
							'h' && node.name[1] > '0' && node.name[1] < '7');
						if (block && text && text[text.length - 1] != '\n') text += '\n';
						if (node.children) text += this.getText(node.children);
						if (block && text[text.length - 1] != '\n') text += '\n';
						else if (node.name == "td" || node.name == "th") text += '\t';
					}
				}
				return text;
				// #endif
			},
			navigateTo(obj) {
				if (!this.useAnchor)
					return obj.fail && obj.fail({
						errMsg: "Anchor is disabled"
					})
				// #ifdef H5
				if (!obj.id) {
					window.scrollTo(0, this.rtf.offsetTop);
					return obj.success && obj.success({
						errMsg: "pageScrollTo:ok"
					});
				}
				var target = document.getElementById(obj.id);
				if (!target) return obj.fail && obj.fail({
					errMsg: "Label not found"
				});
				obj.scrollTop = this.rtf.offsetTop + target.offsetTop;
				uni.pageScrollTo(obj);
				// #endif
				// #ifndef H5
				var Scroll = (selector, component) => {
					uni.createSelectorQuery().in(component ? component : this).select(selector).boundingClientRect().selectViewport()
						.scrollOffset()
						.exec(res => {
							if (!res || !res[0])
								return obj.fail && obj.fail({
									errMsg: "Label not found"
								});
							obj.scrollTop = res[1].scrollTop + res[0].top;
							uni.pageScrollTo(obj);
						})
				}
				if (!obj.id) Scroll("._contain");
				else {
					// #ifndef MP-BAIDU || MP-ALIPAY || APP-PLUS
					Scroll("._contain >>> #" + obj.id + ', ._contain >>> .' + obj.id);
					// #endif
					// #ifdef MP-BAIDU || MP-ALIPAY || APP-PLUS
					for (var anchor of this.anchors)
						if (anchor.id == obj.id)
							Scroll('#' + obj.id + ", ." + obj.id, anchor.node);
					// #endif
				}
				// #endif
			},
			getVideoContext(id) {
				if (!id) return this.videoContexts;
				else
					for (var i = this.videoContexts.length; i--;)
						if (this.videoContexts[i].id == id) return this.videoContexts[i];
				return null;
			},
			_tap(e) {
				// #ifndef MP-BAIDU || MP-ALIPAY || APP-PLUS
				if (this.gestureZoom && e.timeStamp - this.lastTime < 300) {
					if (this.zoomIn) {
						this.animation.translateX(0).scale(1).step();
						uni.pageScrollTo({
							scrollTop: (e.touches[0].pageY - e.currentTarget.offsetTop + this.initY) / 2 - e.touches[0].clientY,
							duration: 400
						})
					} else {
						var initX = e.touches[0].pageX - e.currentTarget.offsetLeft;
						this.initY = e.touches[0].pageY - e.currentTarget.offsetTop;
						this.animation = uni.createAnimation({
							transformOrigin: `${initX}px ${this.initY}px 0`,
							timingFunction: "ease-in-out"
						});
						// #ifdef MP-TOUTIAO
						this.animation.opacity(1);
						// #endif
						this.animation.scale(2).step();
						this.tMax = initX / 2;
						this.tMin = (initX - this.width) / 2;
						this.tX = 0;
					}
					this.zoomIn = !this.zoomIn;
					this.scaleAnimation = this.animation.export();
				}
				this.lastTime = e.timeStamp;
				// #endif
			},
			_touchstart(e) {
				// #ifndef MP-BAIDU || MP-ALIPAY || APP-PLUS
				if (e.touches.length == 1)
					this.initX = this.lastX = e.touches[0].pageX;
				// #endif
			},
			_touchmove(e) {
				// #ifndef MP-BAIDU || MP-ALIPAY || APP-PLUS
				var diff = e.touches[0].pageX - this.lastX;
				if (this.zoomIn && e.touches.length == 1 && Math.abs(diff) > 20) {
					this.lastX = e.touches[0].pageX;
					if ((this.tX <= this.tMin && diff < 0) || (this.tX >= this.tMax && diff > 0))
						return;
					this.tX += (diff * Math.abs(this.lastX - this.initX) * 0.05);
					if (this.tX < this.tMin) this.tX = this.tMin;
					if (this.tX > this.tMax) this.tX = this.tMax;
					this.animation.translateX(this.tX).step();
					this.scaleAnimation = this.animation.export();
				}
				// #endif
			}
		}
	}
</script>

<style>
	@keyframes show {
		0% {
			opacity: 0
		}

		100% {
			opacity: 1;
		}
	}

	/* #ifdef MP-WEIXIN || APP-PLUS */
	:host {
		display: block;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}

	._contain {
		display: inherit;
	}

	/* #endif */
</style>
