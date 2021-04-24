const html = require('../../content')
Page({
  data: {
    html: '',
    tagStyle: {
      table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
      th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
      td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
      li: 'margin: 5px 0;'
    }
  },
  onLoad () {
    // 模拟网络请求
    setTimeout(() => {
      this.setData({
        html
      })
    }, 200)
  },
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
})
