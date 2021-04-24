module.exports = {
  main: 'index.js',
  platform: ['uni-app'],
  handler (file, platform) {
    if (platform === 'uni-app') {
      // 添加 img-cache 属性
      if (file.path.includes('mp-html.vue')) {
        file.contents = Buffer.from(
          file.contents
            .toString()
            .replace(/props\s*:\s*{/, 'props: {\n    ImgCache: Boolean,')
        )
      }
    }
  }
}
