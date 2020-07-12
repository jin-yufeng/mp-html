// docs.js
const marked = require('../../utils/marked.min'),
  markdown = require('./markdown.js');
Page({
  // 数据
  data: {
    // 标签的默认样式
    tagStyle: {
      pre: 'padding:1em 1em 0 1em;margin:.5em 0;border-radius:0.3em;background:#2d2d2d;color:#ccc;line-height: 1.5;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;position:relative',
      code: 'background-color:#f0f0f0;font-size:85%;margin:0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
      ol: 'margin-left: -15px',
      ul: 'margin-left: -15px',
      h2: 'margin-bottom:0.34em;font-size:16px;font-weight:400',
      table: 'width:100%;margin:10px 0;font-size:14px;border-collapse:collapse;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5',
      th: 'padding:5px;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
      td: 'padding:5px;border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5'
    }
  },
  // 页面加载
  onLoad(e) {
    this.setData({
      title: ['功能介绍', '使用方法', '更新日志'][e.index]
    })
    this.context = this.selectComponent('#article');
    this.context.setContent(marked(markdown[e.index]));
  },
  // 链接点击
  link(e) {
    if (e.detail.href.includes('page')) {
      var num = e.detail.href[e.detail.href.length - 1];
      this.setData({
        title: ['功能介绍', '使用方法', '更新日志'][num]
      })
      this.context.setContent(marked(markdown[num]));
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })
      e.detail.ignore();
    } else if (e.detail.href == 'display') {
      this.context.document.getElementById('display').innerHTML = '<img width="49%" style="margin-right:2%" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo.jpeg?sign=c8d83ad0716504de55b65f3dd4e50f67&t=1590222258"><img src="xxx" width="49%">';
      e.detail.ignore();
    }
  },
  // 页面分享
  onShareTimeline() {
    return {
      title: '富文本插件' + this.data.title
    }
  },
  onShareAppMessage() {
    return {
      title: '富文本插件' + this.data.title,
      imageUrl: 'https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134'
    }
  }
})