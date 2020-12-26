# txv-video
功能：使用腾讯视频  
大小：*≈1KB*  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ |   |   |   | √ (h5 和 app 直接支持) |

说明：  
引入本插件后，*html* 中符合下方格式的 *iframe* 标签（*src* 中含有 *vid*）将被转为通过腾讯视频播放：  
```html
<iframe src="https://v.qq.com/txp/iframe/player.html?vid=xxxxxx" allowFullScreen="true"></iframe>
```

同时，其可以被 *pause-video* 属性控制  

!> 本插件仅用于将官方 [腾讯视频插件](https://github.com/tvfe/txv-miniprogram-plugin) 应用于本组件，仅在微信和 *qq* 平台有效，使用前请确认已经成功申请使用该插件并按要求在小程序 *app.json* 中配置完成，否则无法生效  
