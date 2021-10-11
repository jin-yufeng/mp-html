# editable
功能：富文本编辑  
大小：*≈14KB*  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ | √ | √ | √ | √(nvue 不支持) |

说明：  
引入本插件后，会给组件添加以下属性：  

| 属性名 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|:---:|
| editable | Boolean | false | 是否开启内容编辑 |
| placeholder | String | 请输入 | 输入框为空时占位符（`2.1.0+`） |

添加以下事件：  

| 事件名 | 触发时机 | 用途 |
|:---:|:---:|:---:|
| remove（`2.2.0+`） | 删除图片/视频/音频标签时 | 删除已上传的线上文件 |

支持以下操作：  

| 类型 | 操作 |
|:---:|:---:|
| 文本 | 修改 |
| 图片 | 更换链接、调整宽度、设置成超链接（`2.0.4+`）、设置预览图链接、禁用预览、删除 |
| 链接 | 更换链接、删除 |
| 音视频 | 设置封面、设置循环播放、设置自动播放（`2.2.0+`）、删除 |
| 普通标签 | 设置字体大小、斜体、粗体、下划线（`2.0.4+`）、居中、缩进、删除 |

> 菜单项可以通过编辑 *plugins/editable/config.js* 进行修改，仅可以删减或调整顺序，添加或更名无效

组件实例上提供了以下方法（*editable* 属性为 *true* 时才可以调用）：  

| 名称 | 功能 |
|:---:|:---:|
| undo | 撤销一个操作 |
| redo | 重做一个操作 |
| insertHtml | 在光标处插入指定 html 内容（`2.1.0+`） |
| insertImg | 在光标处插入一张图片 |
| insertTable(rows, cols) | 在光标处插入一个 rows 行 cols 列的表格（`2.1.3+`） |
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
  onLoad () {
    // ctx 为组件实例，获取方法见上
    /**
     * @description 设置获取链接的方法
     * @param {String} type 链接的类型（img/video/audio/link）
     * @param {String} value 修改链接时，这里会传入旧值
     * @returns {Promise} 返回线上地址（2.2.0 版本起设置了 domain 属性时，可以缺省主域名）
     *   type 为 audio/video 时，可以返回一个源地址数组
     *   2.1.3 版本起 type 为 audio 时，可以返回一个 object，包含 src、name、author、poster 等字段
     *   2.2.0 版本起 type 为 img 时，可以返回一个源地址数组，表示插入多张图片（修改链接时仅限一张）
     */
    this.ctx.getSrc = (type, value) => {
      return new Promise((resolve, reject) => {
        // 以图片为例
        if (type == 'img') {
          wx.chooseImage({
            count: value === undefined ? 9 : 1, // 2.2.0 版本起插入图片时支持多张（修改图片链接时仅限一张）
            success: res => {
              wx.showLoading({
                title: '上传中'
              });
              (async ()=>{
                const arr = []
                for (let item of res.tempFilePaths) {
                  // 依次上传
                  const src = await upload(item)
                  arr.push(src)
                }
                return arr
              })().then(res => {
                wx.hideLoading()
                resolve(res)
              })
            },
            fail: reject
          })
        }
      })
    }
  },
  finishEdit () {
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

**示例项目**：  
微信小程序点击 [代码片段](https://developers.weixin.qq.com/s/3kfslXmG7FtU) 即可在微信开发者工具中导入；*uni-app* 下载 [示例项目](https://6874-html-foe72-1259071903.tcb.qcloud.la/editable.zip?sign=cc0017be203fb3dbca62d33a0c15792e&t=1608447445) 在 *HBuilder X* 中打开即可体验；注意示例项目中不一定包含最新版本，仅供参考使用方法  

注意事项：  
1. 不要在 *editable* 属性被设置为 *true* 前通过 *setContent* 方法（用 *content* 属性）设置内容，否则在切换为 *true* 后会变成空白  
2. *editable* 属性为 *true* 时不支持在 *scroll-view* 中使用，否则提示框的位置可能不正确  
