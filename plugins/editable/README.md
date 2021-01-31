# editable
功能：富文本编辑  
大小：*≈14KB*  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ | √ | √ | √ | √(nvue 不支持) |

说明：  
引入本插件后，会给组件添加一个 *editable* 属性，将该属性设置为 *true* 后，即可对 *content* 属性传入的内容进行编辑，支持的标签和属性基本不变，无特殊基础库要求  
对已有的内容，支持以下操作：  

| 类型 | 操作 |
|:---:|:---:|
| 文本 | 修改 |
| 图片 | 更换链接、调整宽度、设置成超链接、设置预览图链接、禁用预览、删除 |
| 链接 | 更换链接、删除 |
| 音视频 | 设置封面、设置循环播放、删除 |
| 普通标签 | 设置字体大小、斜体、粗体、下划线、居中、缩进、删除 |

> 菜单项可以通过编辑 *plugins/editable/config.js* 进行修改，仅可以删减或调整顺序，添加或更名无效

组件实例上提供了以下方法（*editable* 属性为 *true* 时才可以调用）：  

| 名称 | 功能 |
|:---:|:---:|
| undo | 撤销一个操作 |
| redo | 重做一个操作 |
| insertImg | 在光标处插入一张图片 |
| insertVideo | 在光标处插入一个视频 |
| insertAudio | 在光标处插入一个音频 |
| insertLink | 在光标处插入一个链接 |
| insertText | 在光标处插入一段文本 |
| clear | 清空内容 |
| getContent | 获取编辑后的 html 内容 |

> 考虑到不同场景下希望获取链接的方法不同，需要在初始时给组件设置一个 *getSrc* 方法（否则插入图片、音视频、链接或修改链接等操作无法使用），每次组件内需要链接时会调用此方法，开发者可在此方法中自行决定如何获取链接，返回 **线上地址** 即可（具体用法见下方示例）  

编辑完成后，通过 *getContent* 方法获取编辑后的 *html*，最后将 *editable* 属性设置为 *false* 即可正常渲染  
示例：  
```javascript
Page({
  onLoad() {
    // ctx 为组件实例，获取方法见上
    /**
     * @description 设置获取链接的方法
     * @param {String} type 链接的类型（img/video/audio/link）
     * @param {String} value 修改链接时，这里会传入旧值
     * @returns {Promise} 返回线上地址（type为音视频时可以返回一个数组作为源地址）
     */
    this.ctx.getSrc = (type, value) => {
      return new Promise((resolve, reject) => {
        // 以图片为例
        if (type == 'img') {
          wx.chooseImage({
            count: 1,
            success: res => {
              // 上传到服务器
              wx.uploadFile({
                url: 'xxx', // 接口地址
                filePath: res.tempFilePaths[0],
                name: 'xxx',
                success(res) {
                  resolve(res.data.path) // 返回线上地址
                },
                fail: reject
              })
            },
            fail: reject
          })
        }
      })
    }
  },
  finishEdit() {
    var html = ctx.getContent() // 获取编辑好的 html
    // 上传 html
    wx.request({
      url: 'xxx',
      data: {
        html
      },
      success: () => {
        this.setData({
          editable: false // 结束编辑
        })
      }
    })
  }
})
```

示例项目：  
微信小程序点击 [代码片段](https://developers.weixin.qq.com/s/I9Y2xLmA7pnN) 即可在微信开发者工具中导入；*uni-app* 下载 [示例项目](https://6874-html-foe72-1259071903.tcb.qcloud.la/editable.zip?sign=cc0017be203fb3dbca62d33a0c15792e&t=1608447445) 在 *HBuilder X* 中打开即可体验；注意示例项目中不一定包含最新版本，仅供参考使用方法  

注意事项：  
1. 不要在 *editable* 属性被设置为 *true* 前通过 *setContent* 方法（用 *content* 属性）设置内容，否则在切换为 *true* 后会变成空白  
2. *editable* 属性为 *true* 时不支持在 *scroll-view* 中使用，否则提示框的位置可能不正确  
