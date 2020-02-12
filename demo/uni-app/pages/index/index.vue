<template>
	<view>
		<jyf-parser @parse="parse" @ready="ready" @imgtap="imgtap" @linkpress="linkpress" @error="error" gesture-zoom
		 show-with-animation lazy-load :autocopy="autocopy" use-anchor ref="rtf" domain="https://6874-html-foe72-1259071903.tcb.qcloud.la">加载中...</jyf-parser>
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser"; // HBuilderX 2.5.5 及以上可以不需要
	const versionHigherThan = require("@/components/jyf-parser/libs/config.js").versionHigherThan;
	const testHtml = require("./html.js");
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				autocopy: false
				// #endif
				// #ifndef APP-PLUS
				autocopy: true
				// #endif
			}
		},
		// HBuilderX 2.5.5 及以上可以不需要
		components: {
			"jyf-parser": parser
		},
		onLoad() {
			// #ifndef MP-ALIPAY || H5 || APP-PLUS 
			console.log("api: versionHigherThan'2.7.1'?", versionHigherThan('2.7.1'))
			// #endif
		},
		onReady(){
			this.$refs.rtf.setContent(testHtml);
		},
		methods: {
			parse(res) {
				console.log("parse finish", res);
			},
			ready(res) {
				console.log("ready", res);
				//console.log("api: getText\n" + this.$refs.rtf.getText());
				console.log("imgList", this.$refs.rtf.imgList);
			},
			imgtap(res) {
				console.log("imgtap", res);
			},
			linkpress(res) {
				console.log("linkpress", res);
				// #ifdef APP-PLUS
				if (/http/.test(res.href))
					uni.navigateTo({
						url: '../web/web?src=' + res.href
					})
				// #endif
			},
			error(res) {
				console.error(res);
			}
		}
	}
</script>

<style>
</style>
