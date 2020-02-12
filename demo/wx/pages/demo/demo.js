// pages/demo/demo.js
const htmls = require('./htmls.js');
Page({
  onLoad(e) {
    // 第二篇文章禁用双击缩放
    this.selectComponent("#article").setContent(htmls['demo' + e.index], e.index == "2" ? {
      "gesture-zoom": false
    } : {});
  },
  onError(e) {
    console.error(e)
    if (e.detail.source == "ad") {
      var document = this.selectComponent("#article").document;
      var adContainer = document.getElementById("adContainer");
      if (adContainer)
        adContainer.setStyle("display", "none");
    }
  },
  linkTap(e) {
    if (e.detail.href) {
      if (/doc/.test(e.detail.href)) {
        wx.showLoading({
          title: '附件下载中',
        })
        wx.downloadFile({
          url: e.detail.href,
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
      } else if (/http/.test(e.detail.href)) {
        wx.setClipboardData({
          data: e.detail.href,
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