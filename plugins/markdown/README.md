# markdown
功能：渲染 *markdown*  
大小：*≈37KB*  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ | √ | √ | √ | √ |

说明：  
引入本插件后，会给组件添加一个 *markdown* 属性，将该属性设置为 *true* 后，即可通过 *content* 属性或 *setContent* 方法设置 *markdown* 内容即可  

若开启 *use-anchor* 属性，所有标题 `*# xxx*` 都会被设置为锚点，通过链接 `[xxx](#xxx)` 可以直接跳转  

> 本插件通过 [marked](https://github.com/markedjs/marked) 解析 *markdown* 文本，部分 *css* 摘选自 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)  

> 本插件可以和 *highlight* 插件共用，实现 *markdown* 中代码块的高亮效果  