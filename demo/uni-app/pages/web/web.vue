<template>
	<view>
		<web-view :src="src" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: '外链加载中'
			});
			this.src = e.src;
		},
		methods: {

		}
	}
</script>

<style>

</style>
