//index.js
Page({
  data: {
    list: [{
      id: 'introduction',
      name: '说明文档',
      open: false,
      pages: [{ name: '前端组件', url: '../component/component' }, { name: '后端加强包', url: '../nodejs/nodejs' }]
    }, {
      id: 'demo',
      name: '示例体验',
      open: false,
      pages: [{ name: '前端功能示例', url: '../demo/demo?index=1' }, { name: '前端综合示例', url: '../demo/demo?index=2' }, { name: '后端综合示例', url: '../demo/demo?index=3' }]
    }, {
      id: 'test',
      name: '自定义测试',
      open: false,
      pages: [{ name: '前端解析', url: '../test/test?mode=0' }, { name: '后端-html模式', url: '../test/test?mode=1' }, { name: '后端-website模式', url: '../test/test?mode=2' }, { name: '后端-markdown模式', url: '../test/test?mode=3' }]
    }]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
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
  onShareAppMessage(res) {
    return {
      title: '富文本插件',
      imageUrl: '../../images/share.png',
      path: '/pages/index/index'
    }
  }
}) 