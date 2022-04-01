# mp-html

> 一个强大的小程序富文本组件

![star](https://img.shields.io/github/stars/jin-yufeng/mp-html)
![forks](https://img.shields.io/github/forks/jin-yufeng/mp-html)
[![npm](https://img.shields.io/npm/v/mp-html)](https://www.npmjs.com/package/mp-html)
![downloads](https://img.shields.io/npm/dt/mp-html)
[![Coverage Status](https://coveralls.io/repos/github/jin-yufeng/mp-html/badge.svg?branch=master)](https://coveralls.io/github/jin-yufeng/mp-html?branch=master)
![license](https://img.shields.io/github/license/jin-yufeng/mp-html)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## news
1. 欢迎加入 `QQ` 交流群：`699734691`  
   ![group](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/group.jpg?sign=5ccc928839526992be4f7187c5a65d54&t=1648800665)  
2. 示例微信小程序 `富文本插件` 添加 `获取组件包` 功能 [详细](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart?id=mp)  
   ![富文本插件](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%8F%92%E4%BB%B6.jpg?sign=d58f89bcd2b9e4341f35a2bacfeb076c&t=1648800697)

## 功能介绍
- 支持在多个主流的小程序平台和 `uni-app` 中使用
- 支持丰富的标签（包括 `table`、`video`、`svg` 等）
- 支持丰富的事件效果（自动预览图片、链接处理等）
- 支持设置占位图（加载中、出错时、预览时）
- 支持锚点跳转、长按复制等丰富功能
- 支持大部分 *html* 实体
- 丰富的插件（关键词搜索、内容 **编辑** 等）
- 效率高、容错性强且轻量化（`≈25KB`，`9KB gzipped`）

查看 [功能介绍](https://jin-yufeng.gitee.io/mp-html/#/overview/feature) 了解更多

## 使用方法
### 原生平台
- `npm` 方式
  1. 在项目目录下安装组件包

     ```bash
     npm install mp-html
     ```
  2. 开发者工具中勾选 `使用 npm 模块` 并点击 `工具 - 构建 npm`
  3. 在需要使用页面的 `json` 文件中添加

     ```json
     {
       "usingComponents": {
         "mp-html": "mp-html"
       }
     }
     ```
  4. 在需要使用页面的 `wxml` 文件中添加

     ```html
     <mp-html content="{{html}}" />
     ```
  5. 在需要使用页面的 `js` 文件中添加

     ```javascript
     Page({
       onLoad () {
         this.setData({
           html: '<div>Hello World!</div>'
         })
       }
     })
     ```
- 源码方式
  1. 将源码中对应平台的代码包（`dist/platform`）拷贝到 `components` 目录下，更名为 `mp-html`
  2. 在需要使用页面的 `json` 文件中添加

     ```json
     {
       "usingComponents": {
         "mp-html": "/components/mp-html/index"
       }
     }
     ```
  
  后续步骤同上

查看 [快速开始](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart) 了解更多

### uni-app
- 源码方式
  1. 将源码中 `dist/uni-app` 内的内容拷贝到项目根目录下  
     可以直接通过 [插件市场](https://ext.dcloud.net.cn/plugin?id=805) 引入
  2. 在需要使用页面的 `vue` 文件中添加

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
- `npm` 方式
  1. 在项目目录下安装组件包

     ```bash
     npm install mp-html
     ```
  2. 在需要使用页面的 `vue` 文件中添加

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

  使用 `cli` 方式运行的项目，通过 `npm` 方式引入时，需要在 `vue.config.js` 中配置 `transpileDependencies`，详情可见 [#330](https://github.com/jin-yufeng/mp-html/issues/330#issuecomment-913617687)  
  如果在 `nvue` 中使用还要将 `dist/uni-app/static` 目录下的内容拷贝到项目的 `static` 目录下，否则无法运行  

查看 [快速开始](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart) 了解更多

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|---|
| container-style | String |  | 容器的样式（[2.1.0+](https://jin-yufeng.gitee.io/mp-html/#/changelog/changelog#v210)） |
| content | String |  | 用于渲染的 html 字符串 |
| copy-link | Boolean | true | 是否允许外部链接被点击时自动复制 |
| domain | String |  | 主域名（用于链接拼接） |
| error-img | String |  | 图片出错时的占位图链接 |
| lazy-load | Boolean | false | 是否开启图片懒加载 |
| loading-img | String |  | 图片加载过程中的占位图链接 |
| pause-video | Boolean | true | 是否在播放一个视频时自动暂停其他视频 |
| preview-img | Boolean | true | 是否允许图片被点击时自动预览 |
| scroll-table | Boolean | false | 是否给每个表格添加一个滚动层使其能单独横向滚动 |
| selectable | Boolean | false | 是否开启文本长按复制 |
| set-title | Boolean | true | 是否将 title 标签的内容设置到页面标题 |
| show-img-menu | Boolean | true | 是否允许图片被长按时显示菜单 |
| tag-style | Object |  | 设置标签的默认样式 |
| use-anchor | Boolean | false | 是否使用锚点链接 |

查看 [属性](https://jin-yufeng.gitee.io/mp-html/#/basic/prop) 了解更多

## 组件事件

| 名称 | 触发时机 |
|:---:|---|
| load | dom 树加载完毕时 |
| ready | 图片加载完毕时 |
| error | 发生渲染错误时 |
| imgtap | 图片被点击时 |
| linktap | 链接被点击时 |

查看 [事件](https://jin-yufeng.gitee.io/mp-html/#/basic/event) 了解更多

## api
组件实例上提供了一些 `api` 方法可供调用

| 名称 | 作用 |
|:---:|---|
| in | 将锚点跳转的范围限定在一个 scroll-view 内 |
| navigateTo | 锚点跳转 |
| getText | 获取文本内容 |
| getRect | 获取富文本内容的位置和大小 |
| setContent | 设置富文本内容 |
| imgList | 获取所有图片的数组 |

查看 [api](https://jin-yufeng.gitee.io/mp-html/#/advanced/api) 了解更多

## 插件扩展  
除基本功能外，本组件还提供了丰富的扩展，可按照需要选用

| 名称 | 作用 |
|:---:|---|
| audio | 音乐播放器 |
| editable | 富文本编辑 |
| emoji | 解析 emoji |
| highlight | 代码块高亮显示 |
| markdown | 渲染 markdown |
| search | 关键词搜索 |
| style | 匹配 style 标签中的样式 |
| txv-video | 使用腾讯视频 |
| img-cache | 图片缓存 by [@PentaTea](https://github.com/PentaTea) |

查看 [插件](https://jin-yufeng.gitee.io/mp-html/#/advanced/plugin) 了解更多

## 使用案例

| 官方示例 | 欢喜商城 | 多么生活 | 全品作业小助手 | 米兔旅行 | 食法查 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![富文本插件](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%8F%92%E4%BB%B6.jpg?sign=d58f89bcd2b9e4341f35a2bacfeb076c&t=1648800697) | ![欢喜商城](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E6%AC%A2%E5%96%9C%E5%95%86%E5%9F%8E.png?sign=7a43951b960b9d4357bbfd1a14e00517&t=1648800783) | ![多么生活](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%A4%9A%E4%B9%88%E7%94%9F%E6%B4%BB.jpg?sign=20ace45a0de175749b8641f9faaedd99&t=1648800796) | ![全品作业小助手](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%85%A8%E5%93%81%E4%BD%9C%E4%B8%9A%E5%B0%8F%E5%8A%A9%E6%89%8B.jpg?sign=a72d0d0d10aade51ccf6c40bdd512d0d&t=1648800808) | ![米兔旅行](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E7%B1%B3%E5%85%94%E6%97%85%E8%A1%8C.png?sign=30a1076ff47cbf16574676e99ef38f5c&t=1648800822) | ![食法查](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E9%A3%9F%E6%B3%95%E6%9F%A5.png?sign=8439ce23400d333c9ef9ae1b9f6870bc&t=1648800833) |

| 微慕 | 古典文学名著阅读 | 程序员技术之旅 | 典典博客 | Geek 时代 | 备忘录与记事本 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![微慕](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%BE%AE%E6%85%95.jpg?sign=e6e748130bce0666348490ee5b8e9b18&t=1648800882) | ![古典文学名著阅读](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%8F%A4%E5%85%B8%E6%96%87%E5%AD%A6%E5%90%8D%E8%91%97%E9%98%85%E8%AF%BB.jpg?sign=1878b24fe48a6295a7dc68b5f96d6793&t=1648800892) | ![程序员技术之旅](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E7%A8%8B%E5%BA%8F%E5%91%98%E6%8A%80%E6%9C%AF%E4%B9%8B%E6%97%85.jpg?sign=112c3a6576be60cecf14cd848c87a9e4&t=1648800907) | ![典典博客](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%85%B8%E5%85%B8%E5%8D%9A%E5%AE%A2.jpg?sign=c847015206b62acb1439902c99482b19&t=1648800923) | ![Geek时代](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/Geek%E6%97%B6%E4%BB%A3.jpg?sign=4edb794fca522123748b12a9dc071b84&t=1648800937) | ![备忘录与记事本](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%A4%87%E5%BF%98%E5%BD%95%E4%B8%8E%E8%AE%B0%E4%BA%8B%E6%9C%AC.jpg?sign=363f2ee0876ad1a19153ce2cfc131488&t=1648800951) |

| 优秀笔记 | 365 刷题 | 同城共享书 | 技术源 share | 周仙神 | 你的代码写的真棒 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![优秀笔记](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E4%BC%98%E7%A7%80%E7%AC%94%E8%AE%B0.jpg?sign=b8609db92f77a7ccdbecc30a099f49a0&t=1648800969) | ![365刷题](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/365%E5%88%B7%E9%A2%98.jpg?sign=c5dc0a8c2fd683d75216e2ae69ac9318&t=1648800982) | ![同城共享书](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%90%8C%E5%9F%8E%E5%85%B1%E4%BA%AB%E4%B9%A6.jpg?sign=bef1c6052405a1df83d6b14c486c23dd&t=1648800995) | ![技术源share](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E6%8A%80%E6%9C%AF%E6%BA%90share.jpg?sign=6a53a717a67f9a1d10beb23c5d982362&t=1648801059) | ![周仙神](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E5%91%A8%E4%BB%99%E7%A5%9E.png?sign=5bbb226921eabe92a3b7db9a6299436f&t=1648801009) | ![你的代码写的真棒](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/case/%E4%BD%A0%E7%9A%84%E4%BB%A3%E7%A0%81%E5%86%99%E7%9A%84%E7%9C%9F%E6%A3%92.jpg?sign=631ca57da7c4b28aef6b785fdcc596cd&t=1648801020) |

以上排名不分先后，更多可见 [使用案例收集](https://github.com/jin-yufeng/mp-html/issues/27)（欢迎添加）  

## 许可与支持
- 许可  
  您可以免费的使用（包括商用）、复制或修改本组件 [MIT License](https://github.com/jin-yufeng/mp-html/blob/master/LICENSE)  
  在用于生产环境前务必经过充分测试，由插件 `bug` 带来的损失概不负责（可以自行修改源码）  

- 支持  
  ![支持](https://6874-html-foe72-1259071903.tcb.qcloud.la/assets/sponsor.png?sign=a33f2ed22c74c9cfccfda6deebef108b&t=1648801034)   

## 更新日志
- v2.3.0 (20220401)
  1. `A` 增加了 `play` 事件，音视频播放时触发，可用于与页面其他音视频进行互斥播放 [详细](basic/event#play)
  2. `U` `show-img-menu` 属性支持控制预览时是否长按弹出菜单
  3. `U` 优化 `wxs` 处理，提高渲染性能 [详细](https://developers.weixin.qq.com/community/develop/article/doc/0006cc2b204740f601bd43fa25a413)  
  4. `U` `video` 标签支持 `object-fit` 属性
  5. `U` 增加支持一些常用实体编码 [详细](https://github.com/jin-yufeng/mp-html/issues/418)
  6. `F` 修复了图片仅设置高度可能不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/410)
  7. `F` 修复了 `video` 标签高度设置为 `auto` 不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/411)
  8. `F` 修复了使用 `grid` 布局时可能样式错误的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/413)
  9. `F` 修复了含有合并单元格的表格部分情况下显示异常的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/417)
  10. `F` 修复了百度小程序使用 `br` 标签可能部分不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/409)
  11. `F` 修复了 `editable` 插件连续插入内容时顺序不正确的问题
  12. `F` 修复了 `uni-app` 包 `vue3` 使用 `audio` 插件报错的问题
  13. `F` 修复了 `uni-app` 包 `highlight` 插件使用自定义的 `prism.min.js` 报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/416)

- v2.2.2 (20220226)
  1. `A` 增加了 [pauseMedia](https://jin-yufeng.gitee.io/mp-html/#/advanced/api#pauseMedia) 的 `api`，可用于暂停播放音视频 [详细](https://github.com/jin-yufeng/mp-html/issues/317)
  2. `U` 优化了长内容的加载速度  
  3. `U` `uni-app` 包适配 `vue3` [#389](https://github.com/jin-yufeng/mp-html/issues/389)、[#398](https://github.com/jin-yufeng/mp-html/pull/398) by [@zhouhuafei](https://github.com/zhouhuafei)、[#400](https://github.com/jin-yufeng/mp-html/issues/400)
  4. `F` 修复了小程序端图片高度设置为百分比时可能不显示的问题
  5. `F` 修复了 `highlight` 插件部分情况下可能显示不完整的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/403)

  从 `1.x` 的升级方法可见 [更新指南](https://jin-yufeng.gitee.io/mp-html/#/changelog/changelog?id=v200)

查看 [更新日志](https://jin-yufeng.gitee.io/mp-html/#/changelog/changelog) 了解更多
