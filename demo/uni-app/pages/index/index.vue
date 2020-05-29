<template>
	<view>
		<jyf-parser :html="html" domain="https://6874-html-foe72-1259071903.tcb.qcloud.la" lazy-load ref="article" selectable
		 show-with-animation use-anchor @error="error" @imgtap="imgtap" @linkpress="linkpress" @parse="parse" @ready="ready">加载中...</jyf-parser>
	</view>
</template>

<script>
	/* eslint-disable */
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	const testHtml = require('./html.js');
	export default {
		// HBuilderX 2.5.5+ 可以通过 easycom 自动引入
		components: {
			jyfParser
		},
		data() {
			return {
				html: testHtml
			}
		},
		/*onReady() {
			// 与 html 属性效果相同
			this.$refs.article.setContent(testHtml);
		},*/
		methods: {
			parse(e) {
				console.log('parse finish', e);
			},
			ready(e) {
				console.log('ready', e);
				// console.log('api: getText', this.$refs.article.getText());
				console.log('imgList', this.$refs.article.imgList);
			},
			imgtap(e) {
				console.log('imgtap', e);
			},
			linkpress(e) {
				console.log('linkpress', e);
			},
			error(e) {
				console.error(e);
			}
		}
	}
</script>

<style>

</style>
