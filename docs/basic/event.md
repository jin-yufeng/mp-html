# 📫 事件 :id=event

## 获取方式 :id=method
- *uni-app*  
  *@* + 事件名 或 *v-on:* + 事件名  
  事件信息从 *event* 中获取  
  ```vue
  <template>
    <view>
      <mp-html @ready="ready" />
    </view>
  </template>
  <script>
    export default {
      methods: {
        ready(e) {
          console.log(e)
        }
      }
    }
  </script>
  ```

- 支付宝小程序  
  *on* + 事件名（首字母大写）  
  事件信息从 *event* 中获取  
  ```axml
  <mp-html onReady="ready">
  ```
  ```javascript
  Page({
    ready(e) {
      console.log(e)
    }
  })
  ```

- 其他小程序平台  
  *bind* + 事件名  
  事件信息从 *event.detail* 中获取  
  ```wxml
  <mp-html bindready="ready" />
  ```
  ```javascript
  Page({
    ready(e) {
      console.log(e.detail)
    }
  })
  ```

## load
触发时机：*dom* 树加载完毕时  
返回值：无  
用途：可以调用 [api](advanced/api) 函数  

## ready
触发时机：图片加载完毕时（不包含懒加载的图片）  
返回值：富文本区域的 *boundingClientRect* 结构体，包含大小位置信息  
用途：此时进行 [锚点跳转](advanced/api#navigateTo) 可以基本保证跳转位置正确  

?> 如果设置了 [懒加载](basic/prop#lazy-load)，此时返回的大小不一定是最终大小，如果需要实时的大小，可以调用 [getRect](advanced/api#getRect) 方法  

## error
触发时机：发生渲染错误时  
返回值：一个 *object*，其中 *source* 为错误来源（包括 *img*、*video*、*audio*、*ad*），*attrs* 为该标签的属性列表（包含 *src* 等信息），*errMsg* 是错误信息  
用途：收集错误信息，减少使用出错率高的链接  

## imgtap
触发时机：图片被点击时  
返回值：该 *img* 标签的属性列表  
用途：  
默认情况下图片被点击时将自动预览（具体处理可见 [图片效果](overview/feature#img)），如果不希望如此，可将 [preview-img](basic/prop#preview-img) 属性设置为 *false* 并在这里自定义处理  
如果需要用到富文本中所有图片的数组，可以通过 [imgList](advanced/api#imgList) 的 *api* 获取  
示例：  
```javascript
Page({
  imgtap(e) {
    // 对做了某种标记的图片进行预览
    if (e.detail['data-flag']) {
      wx.previewImage({
        urls: [e.detail.src] // 仅预览单张图片
      })
    }
  }
})
```


## linktap
触发时机：链接被点击时  
返回值：该 *a* 标签的属性列表  

?> [2.0.5](changelog/changelog#v205) 版本起增加返回该标签内部文本 *innerText*

用途：  
默认情况下链接被点击时，对于外部链接，将被拷贝到剪贴板，如果不希望如此，可以将 [copy-link](basic/prop#copy-link) 属性的值设置为 *false* 后在这里自定义处理，可参考以下方案：  

1. 跳转 *web-view*  
   跳转到一个新的页面，该页面放置一个 [web-view](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html) 用于显示外部网页（需要注意 *web-view* 的使用限制）  
2. 跳转其他小程序  
   对于其他小程序的链接（可通过自行设置的 *data-* 属性判断），通过 [navigateToMiniProgram](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html) 接口跳转（需要注意跳转限制）  
3. 下载文档  
   对于文档类的链接（可通过后缀名或自行设置的 *data-* 属性判断），可以通过 [downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html) 接口下载文件后通过 [openDocument](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.openDocument.html) 接口打开文档（需要注意下载域名限制）  
4. 下载压缩包  
   对于压缩包类的链接（可通过后缀名或自行设置的 *data-* 属性判断），可以通过 [downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html) 接口下载文件后通过 [FileSystemManager.unzip](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unzip.html) 接口解压，然后进行打开文档等操作（需要注意下载域名限制）  
   对于大文件（可通过 *data-* 属性标注），还可以在下载前进行询问，下载过程中通过 [DownloadTask](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/DownloadTask.html) 提示下载进度等  

示例：  
```javascript
Page({
  linktap(e) {
    // 下载 doc 文件
    if (e.detail.href.includes('.doc'))
      wx.downloadFile({
        url: e.detail.href,
        success(res) {
          wx.hideLoading()
          wx.openDocument({
            filePath: res.tempFilePath
          })
        },
        fail(err) {
          wx.hideLoading()
          wx.showModal({
            title: '失败',
            content: err.errMsg,
            showCancel: false
          })
        }
      })
    // 跳转到 webview
    else if (e.detail.href.includes('xxx.com'))
      wx.navigateTo({
        url: 'pages/webview/webview?url=' + e.detail.href,
      })
    // 跳转其他小程序
    else if (e.detail['data-appid'])
      wx.navigateToMiniProgram({
        appId: e.detail['data-appid']
      })
  }
})
```
