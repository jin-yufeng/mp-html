// pages/demo/demo.js
const htmls = require('./htmls.js');
Page({
  onLoad(e) {
    this.setData({
      html: htmls['demo' + e.index],
    })
  },
  onError(e){
    console.error(e)
  },
  linkTap(e) {
    if (e.detail) {
      if (/doc/.test(e.detail)) {
        wx.showLoading({
          title: '附件下载中',
        })
        wx.downloadFile({
          url: e.detail,
          success(res) {
            wx.hideLoading();
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath,
              success(res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      } else if (/http/.test(e.detail)){
        wx.setClipboardData({
          data: e.detail,
          success() {
            wx.showToast({
              title: '链接已复制',
            })
          }
        })
      }
    }
  }
})