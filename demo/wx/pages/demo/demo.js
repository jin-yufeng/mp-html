// demo.js
const htmls = require('./htmls.js');
Page({
  // 页面加载
  onLoad(e) {
    this.context = this.selectComponent('#article');
    this.context.setContent(htmls[e.index]);
    this.anchor = e.anchor;
    if (e.search)
      this.setData({
        search: true
      })
  },
  // 富文本渲染完成
  ready() {
    if (this.anchor)
      this.context.navigateTo({
        id: this.anchor
      })
  },
  // 富文本出错事件
  error(e) {
    console.error(e);
    if (e.detail.source == 'ad')
      this.context.document.getElementById('adContainer').setStyle('display', 'none');
  },
  // 链接点击事件
  linkpress(e) {
    if (e.detail.href) {
      if (e.detail.href.includes('.doc')) {
        e.detail.ignore(); // 禁用自动复制
        wx.showLoading({
          title: '附件下载中',
        })
        wx.downloadFile({
          url: e.detail.href,
          success(res) {
            wx.hideLoading();
            wx.openDocument({
              filePath: res.tempFilePath
            })
          }
        })
      }
    }
  },
  // 打开搜索框
  open() {
    if (!this.data.search)
      this.setData({
        search: true
      })
  },
  // 搜索
  search(e) {
    this.context.search({
      key: e.detail.value,
      anchor: true,
      success: res => {
        this.res = res;
        this.i = 1;
        if (res.num)
          this.highlight(1);
        else
          this.setData({
            state: '0/0'
          })
      }
    })
  },
  highlight(i) {
    this.res.highlight(i, 'background-color:#FF9632');
    this.res.jump(i, -100);
    this.setData({
      state: i + '/' + this.res.num
    })
  },
  // 下一个
  next() {
    if (this.i < this.res.num)
      this.highlight(++this.i);
    else
      wx.showToast({
        title: '没有啦',
      })
  },
  // 上一个
  before() {
    if (this.i > 1)
      this.highlight(--this.i);
    else
      wx.showToast({
        title: '没有啦',
      })
  },
  // 取消搜索
  cancel() {
    this.context.search();
    this.setData({
      state: '',
      search: false
    })
  },
  // 页面分享
  onShareTimeline() {
    return {
      title: '富文本插件示例'
    }
  },
  onShareAppMessage() {
    return {
      title: '富文本插件示例',
      imageUrl: 'https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134'
    }
  }
})