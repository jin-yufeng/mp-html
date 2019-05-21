// pages/demo/demo.js
const htmls=require('./htmls.js');
Page({
  onLoad(e) {
    this.setData({
      html: htmls['demo'+e.index],
    })
  },
  downloadfile(e) {
    if (e.detail&&e.detail.indexOf('docx') != -1) {
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
    }
  },
  error(e){
    console.error(e.detail.message)
  }
})