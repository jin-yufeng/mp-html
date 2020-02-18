// demo.js
const htmls = require('./htmls.js');
Page({
  // 页面加载
  onLoad(e) {
    this.index = e.index;
    this.context = this.selectComponent("#article");
    this.context.setContent(htmls[e.index]);
    if (e.anchor)
      this.goto = true;
  },
  // 富文本渲染完成
  ready() {
    if (this.goto)
      this.context.navigateTo({
        id: "anchor"
      })
  },
  // 富文本出错事件
  error(e) {
    console.error(e)
    if (e.detail.source == "ad") {
      var document = this.selectComponent("#article").document;
      var adContainer = document.getElementById("adContainer");
      if (adContainer)
        adContainer.setStyle("display", "none");
    }
  },
  // 链接点击事件
  linkpress(e) {
    if (e.detail.href) {
      if (e.detail.href.includes(".doc")) {
        e.detail.ignore(); // 禁用自动复制
        wx.showLoading({
          title: '附件下载中',
        })
        wx.downloadFile({
          url: e.detail.href,
          success(res) {
            wx.hideLoading();
            wx.openDocument({
              filePath: res.tempFilePath,
              success(res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      }
    }
  },
  // 图片长按事件
  imglongtap(e) {
    this.url = e.detail.src;
    this.setData({
      showActionsheet: true,
      groups: [{
        text: "保存到手机",
        value: 0
      }, {
        text: "复制图片地址",
        value: 1
      }]
    })
    // 云调用 img.scanQRCode
    wx.cloud.callFunction({
      name: "scanImg",
      data: {
        src: this.url
      },
      success: (res) => {
        if (res.result.codeResults.length) {
          this.scanRes = res.result.codeResults[0].data;
          this.setData({
            groups: [{
              text: "保存到手机",
              value: 0
            }, {
              text: "复制图片地址",
              value: 1
            }, {
              text: "复制识别结果",
              value: 2
            }]
          })
        }
      }
    })
  },
  // 图片菜单点击
  actiontap(e) {
    if (e.detail.value == 0) {
      function saveToAlbum() {
        wx.downloadFile({
          url: this.url,
          success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath
            })
          }
        })
      }
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: saveToAlbum
            })
          } else
            saveToAlbum();
        }
      })
    } else if (e.detail.value == 1)
      wx.setClipboardData({
        data: this.url
      })
    else
      wx.setClipboardData({
        data: this.scanRes
      })
    this.setData({
      showActionsheet: false
    })
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: "富文本插件示例",
      imageUrl: "https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134",
      path: "/pages/demo/demo?index=" + this.index
    }
  }
})