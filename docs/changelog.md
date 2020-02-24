## 更新日志 {docsify-ignore} ##

#### 2020.02.23 ####
1. `U` 支持自动压缩 `style` 属性，移除重复的样式，可以减少解析结果大小  
2. `U` 支持预览 `base64` 图片（通过暂存到本地实现）  
3. `U` `CssHandler` 补丁包支持属性选择器和 `@media`，伪类中的 `content` 支持 `attr()` [详细](/instructions#CssHandler)  
4. `U` 精简了部分代码  
5. `U` `uni-app` 包 `APP(v3)` 端支持 `iframe` 标签  

#### 2020.02.17 ####
1. `A` 增加了 `imglongtap` 事件，图片被长按时触发，可用于显示自定义菜单 [详细](/instructions#事件)  
2. `U` 优化了双击缩放的效果
3. `U` 图片设置的宽度超出屏幕宽度时自动将高度设置为 `auto`，避免变形（同时移除了 `img-mode` 属性）
4. `U` 修改了部分文件和文件夹的命名（**引入路径有变化**）[详细](/instructions#在原生框架中使用)
5. `D` 移除了 `autocopy` 和 `autopreview` 属性，如果需要禁用自动预览/复制链接，请使用  `linkpress` 和 `imgtap` 事件中的 `ignore` 函数
6. `D` 移除了 `versionHigherThan`、`parseHtml`、`parseCss` 的 `api`  
7. `D` 废弃了后端加强包

*此版本移除了部分冗余功能，与之前版本存在部分不兼容情况，请注意*

#### 2020.02.12 ####
1. `A` 增加了 `gesture-zoom` 属性，可以设置双击缩放（默认 `false`）
2. `U` `uni-app` 包修改命名使得符合 `easycom` 规则（`HBuilder X 2.5.5` 以上可以直接使用，无需引入；**之前版本的引入路径有变化**）[详细](https://github.com/jin-yufeng/Parser/issues/79)

#### 2020.01.23 ####
1. `A` 添加了一个打包工具 [详细](/instructions#打包工具)  
2. `U` 支持 `rpx`单位  

#### 2020.01.19 ####
1. `U` `video` 标签增加支持 `poster` 属性  
2. `F` 修复了部分情况下表格处理出错的问题 [详细](https://github.com/jin-yufeng/Parser/issues/77)  
3. `F` 修复了使用单独的 `</p>` 出错的问题  
4. `F` 修复了 `uni-app` 包 `width` 属性处理出错的问题  

#### 2020.01.18 ####
1. `U` `domain` 属性支持自动填充所有 `src` 属性的值（包括视频、音频、图片；协议名默认 `http`）  
2. `U` 优化了实体的处理（支持所有形如 `&#123;` 的实体编码）  
3. `F` 修复了图片一开始裂开之后又好了的问题

#### 2020.01.07 ####
1. `U` 支持模拟显示 `li`, `ol`, `ul` 标签（即可以在其中放图片、链接、视频等，支持 `ol` 的 `type` 属性，支持多层 `ul`，暂不支持 `list-style` 的 `css` 样式）
2. `D` 删除了 `List` 补丁包（在主包中已经默认支持）  
3. `F` 修复了传入的 `html` 为数组时预览图片会出现预览顺序颠倒的问题

#### 2020.01.05 ####
1. `U` `uni-app` 支持 `APP` 的 `v3` 模式编译  
2. `U` 精简和优化了部分代码  

#### 2019.12.30 ####
1. `A` 增加支持 `svg` 系列标签（通过转换为 `img` 实现，不可预览，不可响应点击事件） [详细](/features#svg-支持)  
2. `U` 减小了解析结果的大小（去除了一些不必要的内容，约减小 `3%`），减小了包的大小  
3. `U` `h1-6` 标签支持通过组件递归显示（即可以在其中使用图片、链接等）  
4. `U` 解决了 `Audits` 测评中 `a` 标签可点击元素的响应区域过小的问题  
5. `F` 修复了一个样式优先级的错误（属性样式的优先级应该最低）[详细](https://github.com/jin-yufeng/Parser/issues/67)  
 
#### 2019.12.21 ####
1. `F` 修复了使用 `font` 标签的 `size` 属性报错的问题 [详细](https://github.com/jin-yufeng/Parser/issues/63)

#### 2019.12.15 ####
1. `A` 增加 `setContent` 的 `api`，用于设置 `string` 类型的数据，可以减少一次 `setData` [详细](/instructions#setContent)  
2. `A` 增加 `imgList` 的 `api`，可以获取封面、设置缩略图等 [详细](/instructions#imgList)
3. `U` `a` 标签支持了 `app-id` 和 `path` 属性，可以跳转其他小程序（需要在 `app.json` 中配置跳转名单）  
4. `U` `domain` 属性支持自动补全 `css` 中 `url` 的路径
5. `U` `cache-id` 属性更名为 `use-cache`，只用选择是否使用缓存即可，缓存 `id` 会自动通过 `hash` 函数获取  
6. `U` `html` 属性传入 `array` 类型时即使没有设置 `continue`，组件也会自动进行设置（即可以传入和 `rich-text` 完全相同的格式）[详细](/instructions#组件属性)  
7. `U` 所有内置样式选择器名改为以下划线开头，避免与自定义样式的选择器冲突  
8. `U` `document` 补丁包增加 `getStyle` 和 `setStyle` 方法（返回值格式有更改） [详细](/instructions#document)  
9. `D` 废弃了 `html` 属性的 `object` 类型，请直接将 `html` 设置成原 `object.nodes`（即 `array` 类型，`imgList` 等其他信息可直接从 `nodes` 中获取） [详细](/instructions#组件属性)  
10. `D` 删除了 `animation-duration` 属性，需要修改动画时长的，可直接在 `index.js` 中修改  
11. `D` 不再对百度版插件包进行维护，如有需要可从过去版本获取  

#### 2019.12.10 ####
1. `A` 增加了 `cache-id` 属性，可以将解析结果缓存到 `globalData` 中，多次打开不用重复解析 [详细](/instructions#组件属性) *注：20191215版本中更改为 use-cache*  
2. `A` 增加了 `getText` 的 `api`，可以获取到一个富文本中的所有文本内容 [详细](/instructions#getText)  
3. `A` 增加了 `getVideoContext` 的 `api`，可以获取到视频的 `context` 对象，用于操作播放状态 [详细](/instructions#getVideoContext)  
4. `A` 增加了 `highlight` 代码高亮处理接口 [详细](/instructions#配置项)  
5. `A` 增加了长内容的解决方案 [详细](/instructions#长内容处理)  
6. `U` 重构了解析脚本，提高了解析速度，减小了包的大小  
7. `U` 解决了微信最新版开发者工具会报 `wx:key="" does not look like a valid key name` 的警告的问题  
8. `U` `error` 事件将返回该视频的 `context` 对象，可以修改播放源 [详细](/instructions#事件)  
9. `F` 修复了 `uni-app` 包编译到 `H5` 时在微信内置浏览器中无法显示、存在多个 `parser` 标签时相互覆盖等问题 [详细](https://github.com/jin-yufeng/Parser/issues/59)

*此版本较之前版本在 `api` 和补丁包的引入方式上有不兼容的地方，请注意*

#### 2019.12.03 ####
1. `A` 增加了 `domain` 属性，可以设置主域名，设置后对于图片链接将自动拼接上主域名或协议名 [详细](https://github.com/jin-yufeng/Parser/issues/56)
2. `A` 增加了 `use-anchor` 属性，可以设置页面内锚点 [详细](https://github.com/jin-yufeng/Parser/issues/55)
3. `U` `CssHandler` 补丁包增加支持 `before` 和 `after` 伪类选择器 [详细](/instructions#CssHandler)

#### 2019.11.29 ####
1. `U` `linkpress`, `imgtap` 事件中增加一个 `ignore` 函数，在事件中调用此函数将不自动进行链接跳转/图片预览操作，可以屏蔽指定的链接/图片或进行自定义操作 [详细](https://github.com/jin-yufeng/Parser/issues/51)  

#### 2019.11.28 ####
1. `U` `table` 标签支持了 `border`, `cellpadding`, `cellspacing` 属性 [详细](https://github.com/jin-yufeng/Parser/issues/49)
2. `U` 重构了 `uni-app` 包编译到 `H5` 时的显示方式，采用 `html` 原生的标签渲染，实现了以下优化（仅针对 `H5` 平台，其他**不变**）：
   - 支持所有浏览器支持的标签和属性  
   - `style` 标签支持所有浏览器支持的选择器
   - `error` 事件增加支持 `img`，且返回组件的 `DOM` 实例，修改属性后可以直接对页面生效  
     另外，通过一些转换，原来的属性和事件依然全部支持（不再有 `parse` 事件，因为不进行解析）  

#### 2019.11.23 #### 
1. `A` 添加了新版文档 [详细](https://jin-yufeng.github.io/Parser/#/)

#### 2019.11.09 #### 
1. `F` 修复了 `uni-app` 包编译到 `H5` 时 `html` 的初值为空时报 `Cannot read property 'name' of undefined` 的错误的问题  

#### 2019.11.05 #### 
1. `F` 修复了 `uni-app` 包编译到 `APP` 时多个连续实体空格失效的问题  

#### 2019.11.03 #### 
1. `F` 修复了 `uni-app` 包编译到 `H5` 时多个行内标签并列会被错误换行的问题 [详细](https://github.com/jin-yufeng/Parser/issues/43)  

#### 2019.11.01 #### 
1. `U` 优化了多张相同图片的预览方式  

#### 2019.10.29 #### 
1. `F` 修复了部分行内标签被错误换行的问题  

#### 2019.10.27 #### 
1. `F` 修复了部分情况下多张相同的图片仅第一张可显示的问题  

#### 2019.10.24 #### 
1. `U` `uni-app` 包支持在 `APP` 端使用  

#### 2019.10.17 #### 
1. `A` 增加了 `CssHandler` 补丁包（可支持多层的 `css` 选择器）[详细](/instructions#CssHandler)  
2. `U` `uni-app` 包支持在 `H5` 端使用  

#### 2019.09.28 #### 
1. `A` 增加了 `lazy-load` 属性（可用于图片懒加载）[详细](https://github.com/jin-yufeng/Parser/issues/30)  

#### 2019.09.25 #### 
1. `A` 增加了 `uni-app` 插件包（可以编译到所有小程序平台）[详细](#插件包说明)    
2. `F` 修复了部分情况下样式显示错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/31)  

#### 2019.09.22 #### 
1. `U` 支持引入`wxss` / `css`文件中的外部样式 [详细](/instructions#使用外部样式)  

#### 2019.09.21 #### 
1. `A` 增加了百度小程序插件包 [详细](/instructions#插件包说明)
2. `U` 为与百度小程序包统一，所有事件的返回值改为 `object` 类型（影响 `bindimgtap` 和 `bindlinkpress`）[详细](/instructions#事件)
3. `U` 优化了补丁包的引入方式
4. `F` 修复了 `autopause` 属性在某些情况下会失效的问题  

#### 2019.09.18 #### 
1. `A` 增加了在 `wepy` 中的使用方法 [详细](/instructions#在wepy中使用)  
2. `F` 修复了部分情况下 `style` 标签解析时由于缺少 `;` 导致错误样式匹配失败的问题
3. `F` 修复了 `0917` 版本中 `a` 标签失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/28)  

#### 2019.09.17 #### 
1. `A` 增加了 `list` 补丁包（可用于模拟列表） *附：20200107版本中被删除，改为插件包默认支持 *  
2. `A` `video` 组件增加支持 `unit-id` 属性（前插视频广告）  
3. `F` 修复了部分情况下图片会被 `text-indent` 错误缩进的问题  

#### 2019.09.15 #### 
1. `A` 增加了 `document` 补丁包（可用于动态操作 `DOM`）[详细](/instructions#document)  
2. `A` 增加支持小程序广告 `ad` 组件（可显示文中广告）  

#### 2019.09.13 #### 
1. `A` 增加了 `emoji` 补丁包（可用于解析小表情）[详细](/instructions#emoji)
2. `A` 增加了 `autopreview` 属性（可用于控制点击图片时是否自动预览，默认 `true`）和 `imgtap` 事件（图片被点击时触发）[详细](https://github.com/jin-yufeng/Parser/issues/23)
3. `U` 缩小了节点深度（约 `15%~35%`，主要是通过合并一些只有一个子节点的标签以及优化排版方式），优化了性能 [详细](#智能压缩)
4. `U` 缩小了解析结果的大小（约 `3%~5%`）[详细](/features#智能压缩)
5. `F` 修复了解析完成后传入的 `tagStyle` 会被修改的问题
6. `F` 修复了存在多张相同 `url` 图片时，进行预览会出现定位错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/21)
7. `F` 修复了部分情况下 `html` 中的换行符会被显示的问题

#### 2019.08.22 #### 
1. `U` 支持了 `font` 标签的 `size` 属性

#### 2019.08.21 #### 
1. `F` 修复了部分情况下实体编码内容无法显示的问题 [详细](https://github.com/jin-yufeng/Parser/issues/19)

#### 2019.08.17 #### 
1. `F` 修复了形如 `class="a b"`（多个 `class`）时样式匹配失效的问题

#### 2019.08.10 #### 
1. `U` 优化了 `a` 标签的点击态效果
2. `F` 修复了部分情况下 `span` 标签样式出错的问题

#### 2019.08.02 #### 
1. `F` 修复了部分情况下 `display:flex` 显示出错的问题

#### 2019.07.24 #### 
1. `A` 增加了 `autosetTitle` 属性，可设置是否自动将 `title` 标签的值设置到页面标题上（默认 `true`）[详细](/features#自动设置标题)
2. `F` 修复了 `margin:auto` 失效的问题

#### 2019.06.15 #### 
1. `F` 修复了部分情况下 `br` 标签换行格式不正确的问题

#### 2019.06.10 #### 
1. `A` 适配了`rich-text`组件在2.7.1基础库新增加的标签，其中`big`、`small`、`mark`、`cite`、`s`等标签在低版本都可以兼容；`bdi`、`bdo`、`caption`、`rt`、`ruby` 标签必须基础库2.7.1及以上才能正常显示，低版本会被转为`span` [详细](/features#支持丰富的标签)
2. `A` 增加了 `html2nodes`（解析`html`）、`css2object`（解析`css`）、`versionHigherThan`（比较和判断基础库版本）、`String.splice`（对字符串指定位置进行删改）等 `api` 函数 [详细](/instructions#Api) *附：20200217版本中被删除*
3. `A` 增加了 `img-mode` 属性，可以设置为 `default` 或 `widthFix`，设置为 `widthFix` 时，宽度不变，高度自动变化，可用于解决部分情况下图片变形的问题（但设置的高度会失效）[详细](/instructions#组件属性) *附：20200217版本中被删除*
4. `U` 优化了样式匹配的优先级：`tag-style` &lt; `style` 标签 &lt; 内联 `style`样式
5. `F` 修复了 `style` 标签中`,`前后有空格时导致该样式被忽略的问题

#### 2019.06.03 ####
1. `A` 增加了 `autocopy` 属性，用于控制是否允许 `a` 标签受到点击时自动复制链接（仅限 `http` 开头的网址链接；默认 `true`；接近于原 `selectable` 属性的功能）[详细](/instructions#组件属性)
2. `A` 增加了 `selectable` 属性，可用于控制是否允许长按复制任意内容（默认 `false`）[详细](/instructions#组件属性)
3. `F` 修复了 `style` 标签内容过长时安卓机可能出现栈溢出的问题

#### 2019.06.01 ####
1. `F` 修复了部分情况下 `width` 设置为百分比时失效的问题

#### 2019.05.24 ####
1. `U` 通过以自定义组件递归的方式替代了模板循环，精简包的大小至`28.1KB`，且不再受层数限制
2. `D` 删除了 `html-class` 和 `html-style` 属性，支持直接对 `Parser` 标签设置 `class` 和 `style`，默认的 `display` 是 `block`
3. `F` 修复了部分情况下节点的 `display` 和 `float` 可能不生效的问题
4. `F` 修复了背景音乐无法播放的问题（设置 `autoplay`），并支持对多个 `audio` 设置 `autoplay`

#### 2019.05.22 ####
1. `U` `bindready` 事件将返回整个组件的 `NodeRef` 结构体，包含了宽度、高度、位置等信息 [详细](/instructions#事件)
2. `U` 提高了传入的 `html` 类型为 `Array` 或 `Object` 时的渲染速度（约10%）
3. `U` 解析时若存在 `video` 或 `audio` 组件既没有 `controls` 属性也没有 `autoplay` 属性，会向控制台打印“可能不能播放”的警告

#### 2019.05.20 ####
1. `A` 增加支持 `source` 标签（仅限用于 `audio` 和 `video` 标签中），设置多个 `source` 的，会按顺序进行加载，加载失败的，自动加载下一条链接 [详细](/features#多媒体多资源加载)
2. `U` `video` 标签增加支持 `autoplay` 和 `muted` 属性
3. `U` `audio` 标签增加支持 `autoplay` 属性（仅允许自动播放一首音乐，若设置多首将仅自动播放第一首）
4. `F` 修复了视频数量超过三个时，后面的视频无法播放的问题

#### 2019.05.19 ####
1. `A` 增加了 `html-style` 属性，可以对整个富文本容器设置 `style` 样式，可通过 `wxml` 的数据绑定实现动态修改（直接在 `style` 中设置可能不生效） *附：20190524版本中被删除*
2. `A` 增加了 `show-with-animation` 和 `animation-duration` 属性，支持在显示时使用渐显动画 [详细](/features#动画显示效果) *附：20191212版本中 animation-duration 属性被删除*

#### 2019.05.17 ####
1. `A` 增加了 `ready` 事件，渲染完成时调用 [详细](/instructions#事件)
2. `A` 增加了 `error` 事件，解析错误或加载多媒体资源出错时调用 [详细](/instructions#事件)

#### 2019.05.15 ####
1. `F` 修复了一个页面内存在多个 `Parser` 组件时，`imgList` 被覆盖而导致预览失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/4)
2. `F` 修复了图片设置 `float` 属性无效的问题

#### 2019.05.14 ####
1. `A` 增加了 `html-class` 属性，可以对整个富文本容器设置样式，包括 `display`、`margin`、`padding` 等 *附：20190524版本中被删除*
2. `D` 删除了 `scroll` 属性，默认内容宽度超出页面时允许横向滚动，如要禁止滚动可在 `html-class` 中设置 `overflow:hidden !important`
3. `F` 修复了实体编码的空格 `&nbsb;` 在部分情况下失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/2)

#### 2019.05.10 ####
1. `A` 增加了 `autopause` 属性，支持选择是否允许在播放视频时自动暂停其他视频播放 [详细](/instructions#组件属性)
2. `U` 在视频数量超过三个时，仅加载前三个，其他的由图片取代，在受到点击时再进行加载和播放，避免页面卡顿 [详细](/features#懒加载)
3. `U` 在完成样式匹配后移除了节点的 `class` 和 `id` 属性，减小了 `nodes` 数组的大小，加快渲染速度

#### 2019.05.06 ####
1. `A` 发布了后端 `node.js` 支持包 [详细](https://www.npmjs.com/package/parser-wxapp) *附：20200218版本中被废弃*
2. `U` 支持在 `Parser` 组件内加入加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏 [详细](/features#设置加载提示)

#### 2019.04.29 ####
1. `A` 增加支持将 `title` 标签中的内容设置到页面标题上，并在 `bindparse` 事件中返回（可用于转发分享）[详细](/features#自动设置标题)
2. `A` 增加`scroll`属性，可以选择是否允许页面横向滚动 *附：20190514版本中被删除*
3. `U` `style` 标签中的样式支持更多匹配模式（多个并列 `.demo1,.demo2` 等，另外对于伪类、多层的以及含有@或*的将直接忽略）[详细](/features#匹配-style-标签)
4. `F` 修复了已知 `bug`

#### 2019.04.28 ####
1. `U` 优化图片显示效果，对没有设置宽高的图片，按原大小显示（最大不超过100%）；设置了宽度或高度之一的，按比例进行缩放；同时设置了宽度和高度的，按设置的值进行拉伸；图片无法显示时，可以显示 `alt` 属性中的文本；但由于这些特性需要通过 `rich-text` 显示，因此取消了 `lazyload` 属性 *附：20190928版本重新添加（实现方式不同）*
2. `U` 优化了 `a` 标签的内联效果

#### 2019.04.26 ####
1. `A` 增加支持 `pre`, `u`, `center`, `source` 等标签 [详细](/features#支持丰富的标签)
2. `A` 增加 `bindlinkpress` 事件，在链接受到点击时触发，开发者可以在此事件中进行进一步操作（如下载和打开文档等）[详细](/instructions#事件)
3. `U` 对于不在支持列表中的标签，除个别直接移除外，都会被转为 `div` 标签，因此可以使用一些语义化标签，如 `article`, `address` 等 *附：20190610版本后不在列表中的标签会被转为行内标签*
4. `U` 提高了解析效率和渲染效率（约 `10%`）
5. `D` 删除了 `preview` 属性，默认允许图片预览 *附：20190913版本重新添加，更名为autopreview*
6. `D` 删除了 `space` 属性，由于设置连续空格会使得标签间的空格都被显示，导致错误的效果，因此取消了这一属性；如需要显示连续空格，请使用实体编码的空格或设置 `white-space` 属性
7. `F` 修复了已知 `bug`

#### 2019.04.21 ####
1. `A` 增加了 `tag-style` 属性，支持对标签设置自定义样式 [详细](/features#设置默认的标签样式)
2. `A` 发布了 `demo` 小程序 [详细](/features#案例体验)
3. `U` 降低了最低基础库的要求 [详细](/instructions#基础库要求)  
4. `F` 修复了已知 `bug`

#### 2019.04.18 #### 
1. `A` 增加支持 `audio` 标签 [详细](/features#支持丰富的标签)
2. `A` 增加支持图片懒加载（`lazyload` 属性）*附：20190428版本中被删除，20190928版本重新添加*
3. `U` 优化 `a`，`code`，`blockquote` 等标签显示效果
4. `F` 修复了已知 `bug`

#### 2019.04.16 ####
1. `U` 精简插件包的大小
2. `F` 修复已知 `bug`

#### 2019.04.14 ####
1. `U` `style` 标签中的样式支持按标签名匹配，如 `body{ Object }` [详细](/features#匹配-style-标签)
