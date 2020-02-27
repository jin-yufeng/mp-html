<template>
	<view>
		<jyf-parser @parse="parse" @ready="ready" @imgtap="imgtap" @linkpress="linkpress" @error="error" gesture-zoom
		 show-with-animation lazy-load use-anchor ref="rtf" domain="https://6874-html-foe72-1259071903.tcb.qcloud.la">加载中...</jyf-parser>
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser"; // HBuilderX 2.5.5 及以上可以不需要
	const versionHigherThan = require("@/components/jyf-parser/libs/config.js").versionHigherThan;
	const testHtml = require("./html.js");
	export default {
		// HBuilderX 2.5.5 及以上可以不需要
		components: {
			"jyf-parser": parser
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
				if (res.href && res.href.includes("http")) {
					res.ignore();
					uni.navigateTo({
						url: "../web/web?src=" + res.href
					})
				}
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
