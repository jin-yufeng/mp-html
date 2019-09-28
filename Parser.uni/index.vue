<template>
	<view>
		<slot v-if="!(html.nodes||((html[0].name||html[0].type)?1:nodes.length))"></slot>
		<!--#ifdef MP-ALIPAY-->
		<view class="contain" :style="(showWithAnimation?'opacity:0;':'')+(selectable?'user-select:text;-webkit-user-select:text':'')"
		 :animation="showAnimation">
			<trees :nodes="html.nodes||((html[0].name||html[0].type)?html:nodes)" :imgMode="imgMode" />
		</view>
		<!--#endif-->
		<!--#ifndef MP-ALIPAY-->
		<trees class="contain" :style="(showWithAnimation?'opacity:0;':'')+(selectable?'user-select:text;-webkit-user-select:text':'')"
		 :animation="showAnimation" :nodes="html.nodes||((html[0].name||html[0].type)?html:nodes)" :imgMode="imgMode"
		 :lazyLoad="lazyLoad" />
		<!--#endif-->
	</view>
</template>

<script>
	import trees from "./trees"
	const html2nodes = require("./Parser.js");
	// #ifndef MP-ALIPAY
	const CanIUseObserver = require("./api.js").versionHigherThan('1.9.3');
	// #endif
	var Document;
	try {
		Document = require("./document.js");
	} catch (e) {}
	export default {
		data() {
			return {
				nodes: [],
				showAnimation: {}
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
			'imgMode': {
				type: String,
				default: 'default'
			},
			// #ifdef MP-WEIXIN || MP-QQ
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
				default: {}
			},
			'showWithAnimation': {
				type: Boolean,
				default: false
			},
			'animationDuration': {
				type: Number,
				default: 400
			}
		},
		mounted() {
			this.execHtml(this.html);
			// #ifndef MP-ALIPAY
			this.videoContext = [];
			// #endif
		},
		methods: {
			execHtml(html) {
				let showAnimation = {};
				if (this.showWithAnimation) {
					showAnimation = uni.createAnimation({
						duration: this.data.animationDuration,
						timingFunction: "ease"
					}).opacity(1).step().export();
				}
				if (!html) {
					this.nodes = [];
				} else if (typeof html == 'string') {
					html2nodes(html, this.tagStyle).then(res => {
						this.nodes = res.nodes;
						this.showAnimation = showAnimation;
						this.imgList = res.imgList;
						this.test = 1;
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
			// #ifndef MP-ALIPAY
			getContext(components) {
				for (let component of components) {
					let observered = false;
					for (let item of component.nodes) {
						if (item.name == 'img' && !observered) {
							observered = true;
							if (component.lazyLoad && CanIUseObserver) {
								component._observer = uni.createIntersectionObserver(component);
								component._observer.relativeToViewport({
									bottom: 1500
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
								context: uni.createVideoContext(item.attrs.id, this)
							});
						}
					}
					this.getContext(component.$children);
				}
			},
			// #endif
			ready() {
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select(".contain").boundingClientRect(res => {
						this.$emit("ready", res);
					}).exec()
					// #ifndef MP-ALIPAY
					this.getContext(this.$children);
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
	:host {
		display: block;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}
</style>
