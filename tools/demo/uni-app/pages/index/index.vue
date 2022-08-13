<template>
  <view>
    <mp-html container-style="padding:20px" :content="html" domain="https://mp-html.oss-cn-hangzhou.aliyuncs.com" lazy-load scroll-table selectable use-anchor :tag-style="tagStyle" @load="load" @ready="ready" @imgtap="imgtap" @linktap="linktap" />
  </view>
</template>

<script>
// 需要测试 nvue 时，将本文件后缀改为 .nvue 即可
// 注意：此示例不包含编辑功能
import mpHtml from '@/components/mp-html/mp-html'
import html from '../../content'
export default {
  // HBuilderX 2.5.5+ 可以通过 easycom 自动引入
  components: {
    mpHtml
  },
  data () {
    return {
      html: '',
      tagStyle: {
        table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
        th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
        td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
        li: 'margin: 5px 0;'
      }
    }
  },
  onLoad () {
    // 模拟网络请求
    setTimeout(() => {
      this.html = html
    }, 200)
  },
  methods: {
    load () {
      console.log('dom 树加载完毕')
    },
    ready (e) {
      console.log('ready 事件触发：', e)
    },
    imgtap (e) {
      console.log('imgtap 事件触发：', e)
    },
    linktap (e) {
      console.log('linktap 事件触发：', e)
    }
  }
}
</script>

<style>
</style>
