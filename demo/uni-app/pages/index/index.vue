<template>
	<view>
		<!--#ifndef APP-PLUS-->
		<parser :html="html" @parser="parser" @ready="ready" @imgtap="imgtap" @linkpress="linkpress" @error="error"
		 show-with-animation lazy-load>加载中...</parser>
		<!--#endif-->
		<!--#ifdef APP-PLUS-->
		<parser :html="html" @parser="parser" @ready="ready" @imgtap="imgtap" @linkpress="linkpress" @error="error"
		 show-with-animation lazy-load :autocopy="false">加载中...</parser>
		<!--#endif-->
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	const api = require("@/components/jyf-Parser/api.js");
	const testHtml = require("./html.js");
	export default {
		data() {
			return {
				html: testHtml
			}
		},
		components: {
			parser
		},
		onLoad() {
			// #ifndef MP-ALIPAY || H5 || APP-PLUS 
			console.log("api: versionHigherThan'2.7.1'?", api.versionHigherThan('2.7.1'))
			// #endif
		},
		methods: {
			parser(res) {
				console.log("parse finish", res);
			},
			ready(res) {
				console.log("ready", res);
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
