# highlight
功能：代码块高亮显示  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ | √ | √ | √ | √ |

说明：  
大小：*≈16KB*  
编辑 *plugins/highlight/config.js* 顶部的选项，可以选择是否需要以下功能：  
- *copyByLongPress* 是否需要长按代码块时显示复制代码内容菜单（*uni-app nvue* 暂不支持）  
- *showLanguageName* 是否在代码块右上角显示语言的名称  
- *showLineNumber* 是否在左侧显示行号  

> 修改该配置后需要重新生成组件包，在构建后的组件包中修改配置无法生效

引入本插件后，*html* 中符合以下格式的 *pre* 将被高亮处理：  
```html
<!-- pre 中内含一个 code，并在 pre 或 code 的 class 中设置 language- -->
<pre><code class="language-css">p { color: red }</code></pre>
```

> 与 *editable* 插件共用时，编辑状态下，不会进行高亮，可以直接修改代码文本

> 本插件的高亮功能依赖于 [prismjs](https://prismjs.com/)，默认配置中仅支持 *html*、*css*、*c-like*、*javascript* 语言和 *Tomorrow Night* 主题，如果需要更多语言或更换主题请前往 [官网](https://prismjs.com/download.html) 下载对应的 *prism.min.js* 和 *prism.css* 并替换 *plugins/highlight/* 目录下的文件  
