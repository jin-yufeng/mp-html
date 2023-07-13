# card
功能：商品（联络人）信息卡  
大小：*≈4KB*  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ | √ | √ | √ | √(nvue 不支持) |

### 参数列表  
|参数名|是否必须|类型|说明|
|:---- |:---|:----- |----- |
|mode |是|[Number, String]|0: 编辑状态 1:可跳转(url有效)|
|type|否|[Number, String]|实体类型|
|oid|否|String|实体id|
|src|是|String|图片Url|
|title|是|String|标题|
|desc|是|String|描述|
|url|是|String|mode=1时跳转url|
|color|是|String|文字颜色|
|bgColor|是|String|卡片背景颜色|

### 说明：  
1. 可以显示商品信息卡片/联络人信息卡片  

### 基础库要求：    
满足最低要求即可  

?> 如果希望页面上使用本组件，组件的路径为 *path/to/mp-html/card/card*  
