// app.js
App({
  onLaunch() {
    wx.cloud.init();
  },
  onPageNotFound() {
    wx.redirectTo({
      url: "/pages/index/index",
    })
  }
})