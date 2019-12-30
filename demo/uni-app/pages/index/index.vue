<template>
	<view>
		<parser @parse="parse" @ready="ready" @imgtap="imgtap" @linkpress="linkpress" @error="error"
		 show-with-animation lazy-load :autocopy="autocopy" use-anchor ref="rtf" >加载中...</parser>
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	const versionHigherThan = require("@/components/jyf-Parser/libs/config.js").versionHigherThan;
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
		components: {
			parser
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
				console.log("api: getText\n" + this.$refs.rtf.getText());
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
