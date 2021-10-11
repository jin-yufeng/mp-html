# 快速开始 :id=quickstart

## 📦 源码获取 :id=source
#### npm 方式 :id=npm
   ```bash
   # 通过 npm 获取
   npm install mp-html
   # 或通过 yarn 获取
   yarn add mp-html
   ```
   需要升级时：  
   ```bash
   # 通过 npm 升级
   npm update mp-html
   # 或通过 yarn 升级
   yarn upgrade mp-html
   ```
#### git 方式 :id=git
   ```bash
   # 通过 github 获取
   git clone https://github.com/jin-yufeng/mp-html.git
   # 或通过 gitee 获取
   git clone https://gitee.com/jin-yufeng/mp-html.git
   ```
#### 下载 zip :id=zip
   *github releases*：[https://github.com/jin-yufeng/mp-html/releases](https://github.com/jin-yufeng/mp-html/releases)  
   *gitee releases*：[https://gitee.com/jin-yufeng/mp-html/releases](https://gitee.com/jin-yufeng/mp-html/releases)

## 📚 引入和使用 :id=use

### 📗 原生框架 :id=miniprogram

#### 引入 :id=mp-import
- npm 方式  
  
  ?> 本方法仅适用于微信、*QQ* 小程序  

  1. 在小程序项目根目录下通过 [npm](#npm) 安装组件包  
  2. 开发者工具中勾选 *使用 npm 模块* 并点击 *工具* - *构建 npm*  
  3. 在需要使用页面的 *json* 文件中添加  
     ```json
     {
       "usingComponents": {
         "mp-html": "mp-html"
       }
     }
     ```

- 源码引入
  
  ?> 本方法适用于所有平台  

  1. 将 [源码](#source) 中对应平台的代码包（*dist/platform*）拷贝到 *components* 目录下，更名为 *mp-html*  
  2. 在需要使用页面的 *json* 文件中添加  
     ```json
     {
       "usingComponents": {
         "mp-html": "/components/mp-html/index"
       }
     }
     ```

#### 使用 :id=mp-use

1. 在需要使用页面的 *wxml* 文件中添加  
   ```wxml
   <mp-html content="{{html}}" />
   ```
2. 在需要使用页面的 *js* 文件中添加  
   ```javascript
   Page({
     onLoad () {
       this.setData({
         html: '<div>Hello World!</div>'
       })
     }
   })
   ```

支持的 [属性](basic/prop) 和 [事件](basic/event) 见对应文档

### 📘 uni-app 框架 :id=uni-app

#### 源码方式 :id=uni-app-source
1. 将 [源码](#source) 中 *dist/uni-app* 内的内容拷贝到 **项目根目录** 下  
   
   ?> 使用 *HBuilder X* 开发时，可以直接通过 [插件市场](https://ext.dcloud.net.cn/plugin?id=805) 导入
2. 在需要使用页面的 *(n)vue* 文件中添加  
   ```vue
   <template>
     <view>
       <mp-html :content="html" />
     </view>
   </template>
   <script>
     import mpHtml from '@/components/mp-html/mp-html'
     export default {
       // HBuilderX 2.5.5+ 可以通过 easycom 自动引入
       components: {
         mpHtml
       },
       data () {
         return {
           html: '<div>Hello World!</div>'
         }
       }
     }
   </script>
   ```

#### npm 方式 :id=uni-app-npm
1. 在项目根目录下通过 [npm](#npm) 安装组件包  
2. 在需要使用页面的 *(n)vue* 文件中添加  
   ```vue
   <template>
     <view>
       <mp-html :content="html" />
     </view>
   </template>
   <script>
     import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
     export default {
       // 不可省略
       components: {
         mpHtml
       },
       data () {
         return {
           html: '<div>Hello World!</div>'
         }
       }
     }
   </script>
   ```

!> 使用 *cli* 方式运行的项目，通过 *npm* 方式引入时，需要在 *vue.config.js* 中配置 *transpileDependencies*，详情可见 [#330](https://github.com/jin-yufeng/mp-html/issues/330#issuecomment-913617687)

!> 如果在 *nvue* 中使用还要将 *dist/uni-app/static* 目录下的内容拷贝到项目的 *static* 目录下，否则无法运行  

支持的 [属性](basic/prop) 和 [事件](basic/event) 见对应文档  

由于 *uni-app* 编译过程中会进行压缩，构建 *uni-app* 包时基本不进行压缩，包的体积与原生包相比较大  

#### 关于 nvue :id=nvue
*nvue* 使用原生渲染，不支持部分 *css* 样式，为实现和 *html* 相同的效果，组件内部通过 *web-view* 进行渲染，性能上差于原生，根据 *weex* 官方建议，*web* 标签仅应用在非常规的降级场景。因此，如果通过原生的方式（如 *richtext*）能够满足需要，则不建议使用本组件，如果有较多的富文本内容，则可以直接使用 *vue* 页面  
由于渲染方式与其他端不同，有以下限制：  
1. 不支持 [lazy-load](basic/prop#lazy-load) 属性
2. 视频不支持全屏播放

### 📙 其他框架 :id=other
其他框架没有专用包，但也可以引入对应平台的原生包使用，具体方法参考各框架官方文档    

- taro  
  [https://taro-docs.jd.com/taro/docs/hybrid#使用原生组件](https://taro-docs.jd.com/taro/docs/hybrid#%E4%BD%BF%E7%94%A8%E5%8E%9F%E7%94%9F%E7%BB%84%E4%BB%B6)
- kbone  
  [https://wechat-miniprogram.github.io/kbone/docs/guide/advanced.html#使用小程序自定义组件](https://wechat-miniprogram.github.io/kbone/docs/guide/advanced.html#%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6)  
- chameleon  
  [https://cml.js.org/docs/io.html#怎么引入微信小程序组件](https://cml.js.org/docs/io.html#%E6%80%8E%E4%B9%88%E5%BC%95%E5%85%A5%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6)
- remax  
  [https://remaxjs.org/guide/basic/custom-component](https://remaxjs.org/guide/basic/custom-component)

## 💡 运行示例 :id=demo
1. 安装依赖  
   ```bash
   # 通过 npm 安装
   npm install
   # 或通过 yarn 安装
   yarn
   ```
2. 生成 *demo* 项目  
   ```bash
   # 生成微信示例项目到 dev/mp-weixin
   npm run dev:weixin
   # 生成 qq 示例项目到 dev/mp-qq
   npm run dev:qq
   # 生成百度示例项目到 dev/mp-baidu
   npm run dev:baidu
   # 生成支付宝示例项目到 dev/mp-alipay
   npm run dev:alipay
   # 生成头条示例项目到 dev/mp-toutiao
   npm run dev:toutiao
   # 生成 uni-app 示例项目到 dev/uni-app
   npm run dev:uni-app
   ```
3. 运行  
   用各平台的开发者工具打开 *dev/platform* 文件夹即可  
4. 监听修改  
   如果要对 *demo* 项目进行修改（如放入自己的测试内容）可在 *tools/demo* 目录中进行修改  
   如果要对组件包进行修改可在 *src* 目录中进行修改（参考 [二次开发](advanced/develop) ）  
   可以通过 *watch* 命令监听修改并实时编译到 *dev* 目录下  
   ```bash
   # 监听并实时生成微信示例项目到 dev/mp-weixin
   npm run watch:weixin
   # 监听并实时生成 qq 示例项目到 dev/mp-qq
   npm run watch:qq
   # 监听并实时生成百度示例项目到 dev/mp-baidu
   npm run watch:baidu
   # 监听并实时生成支付宝示例项目到 dev/mp-alipay
   npm run watch:alipay
   # 监听并实时生成头条示例项目到 dev/mp-toutiao
   npm run watch:toutiao
   ```

## 🎈 个性化 :id=setting  
通过编辑 [tools/config.js](https://github.com/jin-yufeng/mp-html/blob/master/tools/config.js) 可以按需要生成个性化的组件包，主要的字段有：  

#### plugins  
需要使用的插件名称列表，关于插件的详细信息见 [插件](advanced/plugin)  

#### externStyle  
外部样式，一个 *css* 字符串，将被用于 *html* 的渲染，但仅支持 *class* 选择器  

?> [2.1.0](changelog/changelog#v210) 版本起增加支持 **标签名选择器**，通过这种方式给标签设置的样式全局有效，在样式较长或作用标签数量较大时这种方法的性能要高于 [tag-style](basic/prop#tag-style) 属性，且写法更加灵活（可以与伪类、*class* 配合等）  
需要注意的是，由于[组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F) 内仅支持 *class* 选择器，直接将标签名选择器 **写在 wxss 中是无效的**，必须写在本字段中，构建过程中会自动转换为 *class* 选择器  

#### customElements  
自定义标签列表（[2.2.0](changelog/changelog#v220) 版本起支持），可以在这里注册需要使用的小程序功能标签（如 *ad*、*ad-custom*、*official-account*、*map* 等）  
每个标签为一个 *object*，需要包含以下字段，注册完成后即可在传入的 `html` 中使用该组件  

| 字段名 | 功能 | 类型 | 必填 | 备注 |
|:---:|:---:|:---:|:---:|:---:|
| name | 标签名 | String | 是 |  |
| attrs | 需要使用的属性列表 | String[] | 否 | class 和 style 默认添加，无需填写 |
| platforms | 需要使用的平台 | String[] | 否 | 默认添加到所有平台，可以从 h5、mp-weixin、mp-qq、mp-baidu、mp-alipay、mp-toutiao、app-plus 中选择，不区分大小写 |

?> 仅能添加没有子节点的标签，且不响应任何事件，如果需要更加复杂的功能，可以通过 [插件](advanced/plugin#develop) 实现  

示例：  
```javascript
// 设置完成后 html 中添加 <ad unit-id="xxx" /> 即可使用该标签
customElements: [{
  name: 'ad',
  attrs: ['unit-id']
}]
```

剩余的是一些编译过程中压缩工具的配置，可以按需要设置  

设置完成后即可 [生成新的组件包](advanced/develop#pack)，升级组件包前注意备份这个配置文件  
