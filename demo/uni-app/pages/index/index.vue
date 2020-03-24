<template>
	<view>
		<jyf-parser domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" gesture-zoom lazy-load ref="article" selectable
		 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
	</view>
</template>

<script>
	import parser from '@/components/jyf-parser/jyf-parser'; // HBuilderX 2.5.5 及以上可以不需要
	const testHtml = require('./html.js');
	export default {
		// HBuilderX 2.5.5 及以上可以不需要
		components: {
			'jyf-parser': parser
		},
		onReady() {
			this.$refs.article.setContent(testHtml);
		},
		methods: {
			parse(res) {
				console.log('parse finish', res);
			},
			ready(res) {
				console.log('ready', res);
				// console.log('api: getText', this.$refs.article.getText());
				console.log('imgList', this.$refs.article.imgList);
			},
			imgtap(res) {
				console.log('imgtap', res);
			},
			linkpress(res) {
				console.log('linkpress', res);
				// #ifdef APP-PLUS
				if (res.href && res.href.includes('http')) {
					res.ignore();
					uni.navigateTo({
						url: '../web/web?src=' + res.href
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
