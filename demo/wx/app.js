// app.js
App({
  onPageNotFound() {
    wx.redirectTo({
      url: "/pages/index/index",
    })
  }
})