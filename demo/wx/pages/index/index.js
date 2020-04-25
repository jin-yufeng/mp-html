// index.js
const htmls = require('../demo/htmls.js');
Page({
  // 数据
  data: {
    list: [{
      id: 'introduction',
      name: '说明文档',
      open: false,
      pages: [{
        name: '功能介绍',
        url: '../docs/docs?index=0'
      }, {
        name: '使用方法',
        url: '../docs/docs?index=1'
      }, {
        name: '更新日志',
        url: '../docs/docs?index=2'
      }]
    }, {
      id: 'demo',
      name: '示例体验',
      open: false,
      pages: [{
        name: '功能示例',
        url: '../demo/demo?index=0'
      }, {
        name: '综合示例',
        url: '../demo/demo?index=1'
      }]
    }, {
      id: 'test',
      name: '自定义测试',
      open: false,
      pages: [{
        name: 'html 解析',
        url: '../test/test?index=0'
      }, {
        name: 'markdown 解析',
        url: '../test/test?index=1'
      }]
    }, {
      id: 'question',
      name: '疑问解答',
      open: false,
      pages: [{
        name: '联系客服',
        url: ''
      }]
    }]
  },
  onReady() {
    // 预加载富文本图片
    this.selectComponent('#preLoad').preLoad(htmls[1], 1);
  },
  // 切换 tab
  kindToggle(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: '富文本插件',
      imageUrl: 'https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134',
      path: '/pages/index/index'
    }
  }
})