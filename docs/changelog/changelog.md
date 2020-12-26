# 📖 更新日志 :id=changelog

## v2.0.0
发布时间：*2020-12-26*  
主要更新：  
1. `U` 通过 *gulp* 进行构建，自动生成各平台压缩版代码，减小引入包大小 [详细](advanced/develop#pack)
2. `U` 没有设置 *href* 属性的 *a* 标签不应用链接的样式，可以用作一般标签的点击处理 [详细](question/faq#tap)
3. `U` 提供了统一的插件接口，扩展更加方便（代码高亮、*markdown* 等都可以直接通过引入插件实现）[详细](advanced/plugin)
4. `U` 实现了简单的编辑功能 [详细](advanced/plugin#editable)
5. `U` 支持生成各平台的示例项目，便于调试 [详细](overview/quickstart#demo)
6. `U` 原生包共用一份源代码（构建时进行自动转换），注释更加详细，便于了解和维护
7. `U` 通过 *jest* 进行单元测试，进一步保证代码质量 [详细](advanced/develop#test)
8. `U` 去除了一些冗余功能，进一步减小包大小（约 *24.5KB*）
9. `U` 减少了递归节点树，加快渲染速度  
10. `U` *uni-app* 的 *app* 端使用非原生的 *video* 显示视频以解决无法同层带来的系列问题
11. `U` *uni-app* 的 *nvue* 端支持通过 *bgColor* 属性设置背景色（默认白色，不可设置为透明）
12. `F` 修复了 *uni-app* 的 *nvue* 端从不可见区域到可见时可能显示不正确的问题

*v1.x* 更新指南：  
- 组件路径和名称  
  *parser* -> *mp-html*  
- *npm* 包名  
  *parser-wx* -> *mp-html*  
- 组件属性  
  更名：  
  *html* -> [content](basic/prop#content)  
  *autopause* -> [pause-video](basic/prop#pause-video)  
  *autoscroll* -> [scroll-table](basic/prop#scroll-table)  
  *autosetTitle* -> [set-title](basic/prop#set-title)  
  移除：  
  *compress*, *show-with-animation*, *use-cache*  
  新增：  
  [copy-link](basic/prop#copy-link), [error-img](basic/prop#error-img), [preview-img](basic/prop#preview-img), [show-img-menu](basic/prop#show-img-menu)  
  修改：  
  [use-anchor](basic/prop#use-anchor) 支持传入数字表示跳转偏移量  
- 组件事件  
  更名 *linkpress* -> [linktap](basic/event#linktap)  
  移除 *parse* 事件  
  *imgtap* 和 *linktap* 事件中不再返回 *ignore* 方法，可以使用 [preview-img](basic/prop#preview-img) 和 [copy-link](basic/prop#copy-link) 属性禁用自动预览/拷贝  
  链接被点击时，不再支持自动跳转其他小程序，可以自行在 [linktap](basic/event#linktap) 事件中进行跳转  
- api  
  [navigateTo](advanced/api#navigateTo) 返回 *Promise*，不再采用 *success* 和 *fail* 回调  
  *rect* 变更为 [getRect](advanced/api#getRect) 方法  
  移除 *getVideoContext* 方法  
  [imgList](advanced/api#imgList) 不再包含 *setItem* 和 *each* 方法  
- 其他  
  默认不再支持匹配 *style* 标签中的样式，如有需要请使用 [style](advanced/plugin#style) 插件  
  不再支持 *base64* 图片预览（默认为不可预览的小图片）  
  取消了配置项（相关解析配置在 *parser.js* 中，*filter* 等方法用 [插件](advanced/plugin) 的方式替代）  
  取消了视频的懒加载（应避免在一个页面中使用过多视频，以免卡顿）  
  *ad* 标签默认不添加到模板（详见 [个性化](overview/quickstart#setting)）  
