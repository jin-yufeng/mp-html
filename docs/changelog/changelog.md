# 📖 更新日志 :id=changelog

## v2.5.0
发布时间：*2024-04-22*  
主要更新：
1. `U` [play](basic/event#play) 事件增加返回 `src` 等信息 [详细](https://github.com/jin-yufeng/mp-html/issues/526)
2. `U` [preview-img](basic/prop#preview-img) 属性支持设置为 `all` 开启 `base64` 图片预览 [详细](https://github.com/jin-yufeng/mp-html/issues/536)
3. `U` [editable](advanced/plugin#editable) 插件增加简易模式（点击文字直接编辑）
4. `U` [latex](advanced/plugin#latex) 插件支持块级公式 [详细](https://github.com/jin-yufeng/mp-html/issues/582)
5. `F` 修复了表格部分情况下背景丢失的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/587)
6. `F` 修复了部分 `svg` 无法显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/591)
7. `F` 修复了 `uni-app` 包 `h5` 和 `app` 端部分情况下样式无法识别的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/518)
8. `F` 修复了 [latex](advanced/plugin#latex) 插件部分情况下显示不正确的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/580)
9. `F` 修复了 [editable](advanced/plugin#editable) 插件表格无法删除的问题
10. `F` 修复了 [editable](advanced/plugin#editable) 插件 `uni-app` 包 `vue3` `h5` 端点击图片报错的问题
11. `F` 修复了 [editable](advanced/plugin#editable) 插件 `uni-app` 包点击表格没有菜单栏的问题

## v2.4.3
发布时间：*2024-01-21*  
主要更新：
1. `A` 增加 [card](advanced/plugin#card) 插件 [详细](https://github.com/jin-yufeng/mp-html/pull/533) by [@whoooami](https://github.com/whoooami)
2. `F` 修复了 `svg` 中包含 `foreignobject` 可能不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/523)
3. `F` 修复了合并单元格的表格部分情况下显示不正确的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/561)
4. `F` 修复了 `img` 标签设置 `object-fit` 无效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/567)
5. `F` 修复了 [latex](advanced/plugin#latex) 插件公式会换行的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/540) 
6. `F` 修复了 `uni-app` 包 [editable](advanced/plugin#editable) 和 [audio](advanced/plugin#audio) 插件共用时点击 `audio` 无法编辑的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/529) by [@whoooami](https://github.com/whoooami)
7. `F` 修复了支付宝小程序设置了宽高的图片可能显示不正常的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/544)
8. `F` 修复了 `uni-app` 包微信小程序部分情况下图片会报错 `replace of undefined` 的问题
9. `F` 修复了 `uni-app` 包快手小程序图片不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/571)

## v2.4.2
发布时间：*2023-05-14*  
主要更新：
1. `A` [editable](advanced/plugin#editable) 插件支持修改文字颜色 [详细](https://github.com/jin-yufeng/mp-html/issues/254)
2. `F` 修复了 `svg` 中有 `style` 不生效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/505)
3. `F` 修复了 `uni-app` 包使用旧版编译器可能报错 `Bad attr nodes` 的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/472)
4. `F` 修复了 `uni-app` 包 `app` 端可能出现无法读取 `lazyLoad` 的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/513)
5. `F` 修复了 [editable](advanced/plugin#editable) 插件在点击换图时未拼接 [domain](basic/prop#domain) 的问题 [详细](https://github.com/jin-yufeng/mp-html/pull/497) by [@TwoKe945](https://github.com/TwoKe945)
6. `F` 修复了 [latex](advanced/plugin#latex) 插件部分情况下不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/515) 
7. `F` 修复了 [editable](advanced/plugin#editable) 插件点击音视频时其他标签框不消失的问题

## v2.4.1
发布时间：*2022-12-25*  
主要更新：
1. `F` 修复了没有图片时 [ready](basic/event#ready) 事件可能不触发的问题
2. `F` 修复了加载过程中可能出现 `Root label not found` 错误的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/470)
3. `F` 修复了 [audio](advanced/plugin#audio) 插件退出页面可能会报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/457)
4. `F` 修复了 `uni-app` 包 `vue3` 运行到 `app` 在 `HBuilder X 3.6.10` 以上报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/480)
5. `F` 修复了原生包链接内有图片时可能错误换行的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/464)
6. `F` 修复了 `uni-app` 包 `nvue` 端链接中包含 `%22` 时可能无法显示的问题
7. `F` 修复了 `uni-app` 包 `vue3` 使用 [highlight](advanced/plugin#highlight) 插件可能报错的问题
8. `F` 修复了头条小程序使用 [editable](advanced/plugin#editable) 插件内容为空时点击会报错的问题

## v2.4.0
发布时间：*2022-08-27*  
主要更新：  
1. `A` 增加了 [setPlaybackRate](advanced/api#setPlaybackRate) 的 `api`，可以设置音视频的播放速率 [详细](https://github.com/jin-yufeng/mp-html/issues/452)
2. `A` 示例小程序代码开源 [详细](https://github.com/jin-yufeng/mp-html-demo)
3. `U` 优化 [ready](basic/event#ready) 事件触发时机，未设置懒加载的情况下基本可以准确触发 [详细](https://github.com/jin-yufeng/mp-html/issues/195)
4. `U` [highlight](advanced/plugin#highlight) 插件在编辑状态下不进行高亮处理，便于编辑
5. `F` 修复了 `flex` 布局下图片大小可能不正确的问题
6. `F` 修复了 [selectable](basic/prop#selectable) 属性没有设置 `force` 也可能出现渲染异常的问题
7. `F` 修复了表格中的图片大小可能不正确的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/448)
8. `F` 修复了含有合并单元格的表格可能无法设置竖直对齐的问题
9. `F` 修复了 [editable](advanced/plugin#editable) 插件在 `scroll-view` 中使用时工具条位置可能不正确的问题
10. `F` 修复了 `uni-app` 包 `vue3` 使用 [search](advanced/plugin#search) 插件可能导致错误换行的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/449)

## v2.3.2
发布时间：*2022-08-13*  
主要更新：
1. `A` 增加 [latex](advanced/plugin#latex) 插件，可以渲染数学公式 [详细](https://github.com/jin-yufeng/mp-html/pull/447) by [@Zeng-J](https://github.com/Zeng-J)
2. `U` 优化根节点下有很多标签的长内容渲染速度
3. `U` [highlight](advanced/plugin#highlight) 插件适配 `lang-xxx` 格式
4. `F` 修复了 `table` 标签设置 `border` 属性后可能无法修改边框样式的问题 [详细](https://github.com/jin-yufeng/mp-html/pull/439) by [@zouxingjie](https://github.com/zouxingjie)
5. `F` 修复了 [editable](advanced/plugin#editable) 插件输入连续空格无效的问题
6. `F` 修复了 `uni-app` 包 `vue3` 图片设置 `inline` 会报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/438)
7. `F` 修复了 `uni-app` 包 `vue3` 使用 `table` 可能报错的问题

## v2.3.1
发布时间：*2022-05-20*  
主要更新：
1. `U` `uni-app` 包 `app` 端支持使用本地图片
2. `U` 优化了微信小程序 [selectable](basic/prop#selectable) 属性在 `ios` 端的处理 [详细](basic/prop#selectable)
3. `U` 原生包取消样式隔离，部分平台可以直接引入页面样式 [#376](https://github.com/jin-yufeng/mp-html/issues/376)、[详细](overview/quickstart#externStyle)
4. `F` 修复了 [editable](advanced/plugin#editable) 插件不在顶部时 `tooltip` 位置可能错误的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/430)
5. `F` 修复了 `uni-app` 包 `vue3` 运行到微信小程序可能报错丢失内容的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/414)
6. `F` 修复了 `uni-app` 包 `vue3` 部分标签可能被错误换行的问题
7. `F` 修复了原生包个别情况下可能报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/428)
8. `F` 修复了 [editable](advanced/plugin#editable) 插件 `uni-app` 包的 `app` 端插入视频无法预览的问题

## v2.3.0
发布时间：*2022-04-01*  
主要更新：  
1. `A` 增加了 `play` 事件，音视频播放时触发，可用于与页面其他音视频进行互斥播放 [详细](basic/event#play)
2. `U` [show-img-menu](basic/prop#show-img-menu) 属性支持控制预览时是否长按弹出菜单
3. `U` 优化 `wxs` 处理，提高渲染性能 [详细](https://developers.weixin.qq.com/community/develop/article/doc/0006cc2b204740f601bd43fa25a413)  
4. `U` `video` 标签支持 `object-fit` 属性
5. `U` 增加支持一些常用实体编码 [详细](https://github.com/jin-yufeng/mp-html/issues/418)
6. `F` 修复了图片仅设置高度可能不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/410)
7. `F` 修复了 `video` 标签高度设置为 `auto` 不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/411)
8. `F` 修复了使用 `grid` 布局时可能样式错误的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/413)
9. `F` 修复了含有合并单元格的表格部分情况下显示异常的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/417)
10. `F` 修复了百度小程序使用 `br` 标签可能部分不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/409)
11. `F` 修复了 [editable](advanced/plugin#editable) 插件连续插入内容时顺序不正确的问题
12. `F` 修复了 `uni-app` 包 `vue3` 使用 [audio](advanced/plugin#audio) 插件报错的问题
13. `F` 修复了 `uni-app` 包 [highlight](advanced/plugin#highlight) 插件使用自定义的 `prism.min.js` 报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/416)

## v2.2.2
发布时间：*2022-02-26*  
主要更新：  
1. `A` 增加了 [pauseMedia](advanced/api#pauseMedia) 的 `api`，可用于暂停播放音视频 [详细](https://github.com/jin-yufeng/mp-html/issues/317)
2. `U` 优化了长内容的加载速度
3. `U` `uni-app` 包适配 `vue3` [#389](https://github.com/jin-yufeng/mp-html/issues/389)、[#398](https://github.com/jin-yufeng/mp-html/pull/398) by [@zhouhuafei](https://github.com/zhouhuafei)、[#400](https://github.com/jin-yufeng/mp-html/issues/400)
4. `F` 修复了小程序端图片高度设置为百分比时可能不显示的问题
5. `F` 修复了 [highlight](advanced/plugin#highlight) 插件部分情况下可能显示不完整的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/403)

## v2.2.1
发布时间：*2021-12-24*  
主要更新：  
1. `A` [editable](advanced/plugin#editable) 插件增加上下移动标签功能
2. `U` [editable](advanced/plugin#editable) 插件支持在文本中间光标处插入内容
3. `F` 修复了 `uni-app` 包 `nvue` 端设置 `margin` 后可能导致高度不正确的问题
4. `F` 修复了 [highlight](advanced/plugin#highlight) 插件使用压缩版的 `prism.css` 可能导致背景失效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/367)
5. `F` 修复了 `uni-app` 包编辑状态下使用 [emoji](advanced/plugin#emoji) 插件内容为空时可能报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/371)
6. `F` 修复了使用 [editable](advanced/plugin#editable) 插件后将 [selectable](basic/prop#selectable) 属性设置为 `force` 不生效的问题

## v2.2.0
发布时间：*2021-10-11*  
主要更新：  
1. `A` 增加 [customElements](overview/quickstart#customelements) 配置项，便于添加自定义功能性标签 [详细](https://github.com/jin-yufeng/mp-html/issues/350)
2. `A` [editable](advanced/plugin#editable) 插件增加切换音视频自动播放状态的功能 [详细](https://github.com/jin-yufeng/mp-html/pull/341) by [@leeseett](https://github.com/leeseett)
3. `A` [editable](advanced/plugin#editable) 插件删除媒体标签时触发 `remove` 事件，便于删除已上传的文件
4. `U` [editable](advanced/plugin#editable) 插件 `insertImg` 方法支持同时插入多张图片 [详细](https://github.com/jin-yufeng/mp-html/issues/342)
5. `U` [editable](advanced/plugin#editable) 插入图片和音视频时支持拼接 [domian](basic/prop#domain) 主域名
6. `F` 修复了内部链接参数中包含 `://` 时被认为是外部链接的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/356)
7. `F` 修复了部分 `svg` 标签名或属性名大小写不正确时不生效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/351)
8. `F` 修复了 `uni-app` 包 `nvue` 页面运行到非 `app` 平台时可能样式错误的问题
9. `D` 移除了 `ad` 配置项（由 [customElements](overview/quickstart#customelements) 代替）

## v2.1.5
发布时间：*2021-08-13*  
主要更新：  
1. `A` 增加支持标签的 `dir` 属性
2. `F` 修复了 `ruby` 标签文字与拼音没有居中对齐的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/325)
3. `F` 修复了音视频标签内有 `a` 标签时可能无法播放的问题
4. `F` 修复了 [externStyle](overview/quickstart#setting) 中的 `class` 名包含下划线或数字时可能失效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/326)
5. `F` 修复了 `uni-app` 包 `h5` 端引入 [externStyle](overview/quickstart#setting) 可能不生效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/326)
6. `F` 修复了微信原生包 `a` 标签的 `style` 中包含 `inline` 时不响应事件的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/332)

## v2.1.4
发布时间：*2021-07-14*  
主要更新：  
1. `F` 修复了 `rt` 标签无法设置样式的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/318)
2. `F` 修复了表格中有单元格同时合并行和列时可能显示不正确的问题
3. `F` 修复了 `uni-app` 包的 `app` 端无法关闭图片长按菜单的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/322)
4. `F` 修复了 [editable](advanced/plugin#editable) 插件只能添加图片链接不能修改的问题 [详细](https://github.com/jin-yufeng/mp-html/pull/312) by [@leeseett](https://github.com/leeseett)

## v2.1.3
发布时间：*2021-06-12*  
主要更新：  
1. `A` [editable](advanced/plugin#editable) 插件增加 `insertTable` 方法
2. `U` [editable](advanced/plugin#editable) 插件支持编辑表格中的空白单元格 [详细](https://github.com/jin-yufeng/mp-html/issues/310)
3. `F` 修复了 [externStyle](overview/quickstart#setting) 中使用伪类可能失效的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/298)
4. `F` 修复了多个组件同时使用时 [tag-style](basic/prop#tag-style) 属性时可能互相影响的问题 [详细](https://github.com/jin-yufeng/mp-html/pull/305) by [@woodguoyu](https://github.com/woodguoyu)
5. `F` 修复了包含 `linearGradient` 的 `svg` 可能无法显示的问题
6. `F` 修复了 `uni-app` 包编译到头条小程序时可能报错的问题
7. `F` 修复了 `uni-app` 包 `nvue` 端不触发 `click` 事件的问题
8. `F` 修复了 [editable](advanced/plugin#editable) 插件尾部插入时无法撤销的问题
9. `F` 修复了 [editable](advanced/plugin#editable) 插件的 `insertHtml` 方法只能在末尾插入的问题
10. `F` 修复了 [editable](advanced/plugin#editable) 插件插入音频不显示的问题

## v2.1.2
发布时间：*2021-04-24*  
主要更新：  
1. `A` 增加了 [img-cache](advanced/plugin#img-cache) 插件，可以在 `uni-app` 的 `app` 端缓存图片 [详细](https://github.com/jin-yufeng/mp-html/issues/292) by [@PentaTea](https://github.com/PentaTea)
2. `U` 支持通过 [container-style](basic/prop#container-style) 属性设置 `white-space` 来保留连续空格和换行符 [详细](question/faq#space)
3. `U` 代码风格符合 [standard](https://standardjs.com) 标准
4. `U` `uni-app` 包使用 [editable](advanced/plugin#editable) 插件编辑状态下支持预览视频 [详细](https://github.com/jin-yufeng/mp-html/issues/286)
5. `F` 修复了 `svg` 标签内嵌 `svg` 时无法显示的问题
6. `F` 修复了微信原生包 `img` 标签的 `style` 中包含 `inline` 时不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/287)
7. `F` 修复了支付宝和头条小程序部分区域不可复制的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/291)

## v2.1.1
发布时间：*2021-04-09*  
主要更新：  
1. `F` 修复了对 `p` 标签设置 [tag-style](basic/prop#tag-style) 可能不生效的问题
2. `F` 修复了 `svg` 标签中的文本无法显示的问题
3. `F` 修复了 `uni-app` 包的 `nvue` 端不设置 [container-style](basic/prop#container-style) 可能报错的问题
4. `F` 修复了 `uni-app` 包使用 [editable](advanced/plugin#editable) 插件编辑表格时可能报错的问题
5. `F` 修复了 `uni-app` 包使用 [highlight](advanced/plugin#highlight) 插件运行到头条小程序时可能没有样式的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/280)
6. `F` 修复了 `uni-app` 包使用 [editable](advanced/plugin#editable) 插件 `editable` 属性为 `false` 时会报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/284)
7. `F` 修复了 [style](advanced/plugin#style) 插件连续子选择器失效的问题
8. `F` 修复了 [editable](advanced/plugin#editable) 插件无法修改图片和字体大小的问题

## v2.1.0
发布时间：*2021-03-20*  
主要更新：  
1. `A` 增加了 [container-style](basic/prop#container-style) 属性 [详细](https://gitee.com/jin-yufeng/mp-html/pulls/1)
2. `A` 增加支持 `strike` 标签
3. `A` `editable` 插件增加 `placeholder` 属性 [详细](advanced/plugin#editable)
4. `A` `editable` 插件增加 `insertHtml` 方法 [详细](advanced/plugin#editable)
5. `U` 外部样式支持标签名选择器 [详细](overview/quickstart#setting)
6. `F` 修复了 `uni-app` 包 `nvue` 端部分情况下可能不显示的问题

## v2.0.5
发布时间：*2021-03-12*  
主要更新：  
1. `U` [linktap](basic/event#linktap) 事件增加返回内部文本内容 `innerText` [详细](https://github.com/jin-yufeng/mp-html/issues/271)
2. `U` [selectable](basic/prop#selectable) 属性设置为 `force` 时能够在微信 `iOS` 端生效（文本块会变成 `inline-block`） [详细](https://github.com/jin-yufeng/mp-html/issues/267)
3. `F` 修复了部分情况下竖向无法滚动的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/182)
4. `F` 修复了 `uni-app` 包多次修改富文本数据时部分内容可能不显示的问题
5. `F` 修复了百度小程序真机部分内容不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/272)
6. `F` 修复了 [腾讯视频](advanced/plugin#txv-video) 插件可能无法播放的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/265)
7. `F` 修复了 [highlight](advanced/plugin#highlight) 插件没有设置高亮语言时没有应用默认样式的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/276) by [@fuzui](https://github.com/fuzui)

## v2.0.4
发布时间：*2021-01-31*  
主要更新：  
1. `A` [editable](advanced/plugin#editable) 插件增加下划线和图片超链接的功能 [详细](https://github.com/jin-yufeng/mp-html/issues/254)
2. `U` 支付宝和头条小程序原生包直接通过 `template` 递归实现渲染
3. `F` 修复了 `img` 标签设置 `data-src` 可能导致图片不显示的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/257)
4. `F` 修复了 `script` 标签中的 `<` 会被解析为标签的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/259)
5. `F` 修复了 `uni-app` 包的 `app` 端播放视频时可能高度突然变小的问题
6. `F` 修复了 `uni-app` 包的 `app` 端长按图片会报错的问题
7. `F` 修复了 `uni-app` 包的 `nvue` 端使用 [editable](advanced/plugin#editable) 插件后无法显示的问题
8. `F` 修复了 [editable](advanced/plugin#editable) 插件删除图片和切换内容时可能出现错误选择框的问题
9. `F` 修复了 [editable](advanced/plugin#editable) 插件无法编辑链接文本内容的问题

## v2.0.3
发布时间：*2021-01-15*  
主要更新：  
1. `U` 图片被点击时不冒泡（可以与整体的点击区分开，不影响链接中的图片）
2. `F` 修复了图片链接缺省协议名时可能无法预览的问题
3. `F` 修复了原生包 `video` 和 `audio` 标签内放置文本会报错的问题
4. `F` 修复了 [editable](advanced/plugin#editable) 插件清空内容时弹窗可能不消失的问题
5. `F` 修复了 [highlight](advanced/plugin#highlight) 插件部分情况下样式不正确的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/231)
6. `F` 修复了文档首页跳转到快速开始页时 `404` 的问题 by [@AnsonZnl](https://github.com/AnsonZnl)

## v2.0.2
发布时间：*2021-01-08*  
主要更新：  
1. `U` `uni-app` 包微信端利用 `virtualHost` 去除夹层，加快渲染
2. `F` 修复了部分情况下 `flex` 布局显示不正确的问题
3. `F` 修复了设置 [loading-img](basic/prop#loading-img) 会导致懒加载失效的问题
4. `F` 修复了头条原生包部分情况下表格显示不正确的问题
5. `F` 修复了 `uni-app` 的 `h5` 和 `app` 端部分插件样式无法应用的问题
6. `F` 修复了 `uni-app` 包没有自动将 `data-src` 设置为 `src` 的问题
7. `F` 修复了 `uni-app` 包的 `nvue` 端 [getRect](advanced/api#getRect) 方法无法使用的问题
8. `F` 修复了 `uni-app` 包运行到华为快应用可能报错的问题
9. `F` 修复了在低版本 taro 中使用可能无法正确解析的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/248)
10. `F` 修复了 [highlight](advanced/plugin#highlight) 插件 `pre` 和 `code` 之间有空白符时无法高亮的问题
11. `F` 修复了 [editable](advanced/plugin#editable) 插件清空内容后插入可能报错的问题

## v2.0.1
发布时间：*2021-01-01*  
主要更新：  
1. `F` 修复了 `a` 标签自动跳转到不存在页面时可能报错的问题
2. `F` 修复了含合并单元格的表格设置列宽可能导致显示不正确的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/239)
3. `F` 修复了表格中的图片可能错位的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/194)
4. `F` 修复了原生包使用 [editable](advanced/plugin#editable) 插件点击标签时可能报错的问题
5. `F` 修复了 `uni-app` 的 `h5` 和 `app` 端可能无法使用 `iframe` 和 `embed` 标签的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/245)
6. `F` 修复了 `uni-app` 使用部分插件会报错的问题 [详细](https://github.com/jin-yufeng/mp-html/issues/246)

## v2.0.0
发布时间：*2020-12-26*  
主要更新：  
1. `U` 通过 `gulp` 进行构建，自动生成各平台压缩版代码，减小引入包大小 [详细](advanced/develop#pack)
2. `U` 没有设置 `href` 属性的 `a` 标签不应用链接的样式，可以用作一般标签的点击处理 [详细](question/faq#tap)
3. `U` 提供了统一的插件接口，扩展更加方便（代码高亮、`markdown` 等都可以直接通过引入插件实现）[详细](advanced/plugin)
4. `U` 实现了简单的编辑功能 [详细](advanced/plugin#editable)
5. `U` 支持生成各平台的示例项目，便于调试 [详细](overview/quickstart#demo)
6. `U` 原生包共用一份源代码（构建时进行自动转换），注释更加详细，便于了解和维护
7. `U` 通过 `jest` 进行单元测试，进一步保证代码质量 [详细](advanced/develop#test)
8. `U` 去除了一些冗余功能，进一步减小包大小（约 `24.5KB`）
9. `U` 减少了递归节点树，加快渲染速度  
10. `U` `uni-app` 的 `app` 端使用非原生的 `video` 显示视频以解决无法同层带来的系列问题
11. `U` `uni-app` 的 `nvue` 端支持通过 `bgColor` 属性设置背景色（默认白色，不可设置为透明）
12. `F` 修复了 `uni-app` 的 `nvue` 端从不可见区域到可见时可能显示不正确的问题

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
