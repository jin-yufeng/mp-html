## 更新日志 {docsify-ignore}##
##### [2019.12.03](https://github.com/jin-yufeng/Parser) :id=v20191202 #####
  1. `A` 增加了 `domain` 属性，可以设置主域名，设置后对于图片链接将自动拼接上主域名或协议名 [详细](https://github.com/jin-yufeng/Parser/issues/56)
  2. `A` 增加了 `use-anchor` 属性，可以设置页面内锚点 [详细](https://github.com/jin-yufeng/Parser/issues/55)
  3. `U` `CssHandler` 补丁包增加支持 `before` 和 `after` 伪类选择器 [详细](/instructions#CssHandler)

##### [2019.11.29](https://github.com/jin-yufeng/Parser/tree/1ba6956fd5d7145543a0f729e61ec6b23bc3c151) #####
  1. `U` `linkpress`, `imgtap` 回调中增加一个 `ignore` 函数，在回调中调用此函数将不自动进行链接跳转/图片预览操作，可以屏蔽指定的链接/图片或进行自定义操作 [详细](https://github.com/jin-yufeng/Parser/issues/51)  

##### [2019.11.28](https://github.com/jin-yufeng/Parser/tree/fdbd978e0217a5d4e271d44025b978884e6f5a9a) #####
  1. `U` `table` 标签支持了 `border`, `cellpadding`, `cellspacing` 属性 [详细](https://github.com/jin-yufeng/Parser/issues/49)
  2. `U` 重构了 `uni-app` 包编译到 `H5` 时的显示方式，采用 `html` 原生的标签渲染，实现了以下优化（仅针对 `H5` 平台，其他**不变**）：
     - 支持所有浏览器支持的标签和属性  
     - `style` 标签支持所有浏览器支持的选择器
     - `error` 回调增加支持 `img`，且返回组件的 `DOM` 实例，修改属性后可以直接对页面生效  
     另外，通过一些转换，原来的属性和事件依然全部支持（不再有 `parser` 回调，因为不进行解析）  

#####  [2019.11.23](https://github.com/jin-yufeng/Parser/tree/1bd810c7258650bfbe0ab165f584cacb0f7a444f) ##### 
  1. `A` 添加了新版文档 [详细](https://jin-yufeng.github.io/Parser/#/)

#####  [2019.11.09](https://github.com/jin-yufeng/Parser/tree/3e24871f49c1dfc093f8d09a5fc8919f7a2631d4) ##### 
  1. `F` 修复了 `uni-app` 包编译到 `H5` 时 `html` 的初值为空时报 `Cannot read property 'name' of undefined` 的错误的问题  

#####  [2019.11.05](https://github.com/jin-yufeng/Parser/tree/fda245463a5aca4ce92af163e85f9e9de826ae3b) ##### 
  1. `F` 修复了 `uni-app` 包编译到 `APP` 时多个连续实体空格失效的问题  

#####  [2019.11.03](https://github.com/jin-yufeng/Parser/tree/aaa7a984eec7ddeb54fef68db6ef8aec5042563f) ##### 
  1. `F` 修复了 `uni-app` 包编译到 `H5` 时多个行内标签并列会被错误换行的问题 [详细](https://github.com/jin-yufeng/Parser/issues/43)  

#####  [2019.11.01](https://github.com/jin-yufeng/Parser/tree/0fbc86c57c7dc21ff30eff4882730705b6d87bd3) ##### 
  1. `U` 优化了多张相同图片的预览方式  

#####  [2019.10.29](https://github.com/jin-yufeng/Parser/tree/2b38f58417ffaeaa0811f37a25cb5aa11e710217) ##### 
  1. `F` 修复了部分行内标签被错误换行的问题  

#####  [2019.10.27](https://github.com/jin-yufeng/Parser/tree/051acb76bf745a1623d3ff8274bb1057a994c4f0) ##### 
  1. `F` 修复了部分情况下多张相同的图片仅第一张可显示的问题  

#####  [2019.10.24](https://github.com/jin-yufeng/Parser/tree/b6398f04662f05845ce4c512afb8afcf48f9488c) ##### 
  1. `U` `uni-app` 包支持在 `APP` 端使用  

#####  [2019.10.17](https://github.com/jin-yufeng/Parser/tree/e89d6da1940413e81344e73d896fce401570d48e) ##### 
  1. `A` 增加了 `CssHandler` 补丁包（可支持多层的 `css` 选择器）[详细](/instructions#CssHandler)  
  2. `U` `uni-app` 包支持在 `H5` 端使用  

#####  [2019.09.28](https://github.com/jin-yufeng/Parser/tree/d9367371bb667e584efba231c472e0e4b6d521a6) :id=v20190928 ##### 
  1. `A` 增加了 `lazy-load` 属性（可用于图片懒加载）[详细](https://github.com/jin-yufeng/Parser/issues/30)  

#####  [2019.09.25](https://github.com/jin-yufeng/Parser/tree/35e141ef0630de2a42cc0ff817d4dd5e24a02406) ##### 
  1. `A` 增加了 `uni-app` 插件包（可以编译到所有小程序平台）[详细](#插件包说明)    
  2. `F` 修复了部分情况下样式显示错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/31)  

#####  [2019.09.22](https://github.com/jin-yufeng/Parser/tree/5f174bf7c217424039afb4977f58fe4464111931) ##### 
  1. `U` 支持引入`wxss` / `css`文件中的外部样式[详细](/instructions#使用外部样式)  

#####  [2019.09.21](https://github.com/jin-yufeng/Parser/tree/f0ddc18e8a3e093e8dcf5777957b19575485515d) ##### 
  1. `A` 增加了百度小程序插件包 [详细](/instructions#插件包说明)
  2. `U` 为与百度小程序包统一，所有事件的返回值改为 `object` 类型（影响 `bindimgtap` 和 `bindlinkpress`）[详细](/instructions#回调函数)
  3. `U` 优化了补丁包的引入方式
  4. `F` 修复了 `autopause` 属性在某些情况下会失效的问题  

#####  [2019.09.18](https://github.com/jin-yufeng/Parser/tree/517ce56701c671a79ec0d5d70e4af5d6d3634c9f) ##### 
  1. `A` 增加了在 `wepy` 中的使用方法 [详细](/instructions#在wepy中使用)  
  2. `F` 修复了部分情况下 `style` 标签解析时由于缺少 `;` 导致错误样式匹配失败的问题
  2. `F` 修复了 `0917` 版本中 `a` 标签失效的问题[详细](https://github.com/jin-yufeng/Parser/issues/28)  

#####  [2019.09.17](https://github.com/jin-yufeng/Parser/tree/c585be597bf980240c57f2bfe37b22735549c2b0) ##### 
  1. `A` 增加了 `list` 补丁包（可用于模拟列表）[详细](/instructions#List)  
  2. `A` `video` 组件增加支持 `unit-id` 属性（前插视频广告）  
  3. `F` 修复了部分情况下图片会被 `text-indent` 错误缩进的问题  

#####  [2019.09.15](https://github.com/jin-yufeng/Parser/tree/b8726a178da699292aa680b9c2a12dcb76dd941a) ##### 
  1. `A` 增加了 `document` 补丁包（可用于动态操作 `DOM`）[详细](/instructions#document)  
  2. `A` 增加支持小程序广告 `ad` 组件（可显示文中广告）  

#####  [2019.09.13](https://github.com/jin-yufeng/Parser/tree/2ed200d4c84331c319a1e8aa3cf4baafd8154c7a) :id=v20190913 ##### 
  1. `A` 增加了 `emoji` 补丁包（可用于解析小表情）[详细](/instructions#emoji)
  2. `A` 增加了 `autopreview` 属性（可用于控制点击图片时是否自动预览，默认 `true`）和 `imgtap` 事件（图片被点击时触发）[详细](https://github.com/jin-yufeng/Parser/issues/23)
  3. `U` 缩小了节点深度（约 `15%~35%`，主要是通过合并一些只有一个子节点的标签以及优化排版方式），优化了性能 [详细](#智能压缩)
  4. `U` 缩小了解析结果的大小（约 `3%~5%`）[详细](/features#智能压缩)
  5. `F` 修复了解析完成后传入的 `tagStyle` 会被修改的问题
  6. `F` 修复了存在多张相同 `url` 图片时，进行预览会出现定位错误的问题 [详细](https://github.com/jin-yufeng/Parser/issues/21)
  7. `F` 修复了部分情况下 `html` 中的换行符会被显示的问题

#####  [2019.08.22](https://github.com/jin-yufeng/Parser/tree/3bf3721cb6b1503cdc8ef933011f6532108043b4) ##### 
  1. `U` 支持了 `font` 标签的 `size` 属性

#####  [2019.08.21](https://github.com/jin-yufeng/Parser/tree/abcf73822b5f7d0e685c3e1470de17d0b008af22) ##### 
  1. `F` 修复了部分情况下实体编码内容无法显示的问题 [详细](https://github.com/jin-yufeng/Parser/issues/19)

#####  [2019.08.17](https://github.com/jin-yufeng/Parser/tree/87d1172370e84cf575caa888e301fc158898fe46) ##### 
  2. `F` 修复了形如 `class="a b"`（多个 `class`）时样式匹配失效的问题

#####  [2019.08.10](https://github.com/jin-yufeng/Parser/tree/88d47d2e0d49c8568dd94ed335adac8aa01d54e6) ##### 
  1. `U` 优化了 `a` 标签的点击态效果
  2. `F` 修复了部分情况下 `span` 标签样式出错的问题

#####  [2019.08.02](https://github.com/jin-yufeng/Parser/tree/aa2eafd5a082d78d1bba6158100211e9a5ba81d8) ##### 
  1. `F` 修复了部分情况下 `display:flex` 显示出错的问题

#####  [2019.07.24](https://github.com/jin-yufeng/Parser/tree/a47d6c06ec8dcaa43b53bf5472fb61a04673b463) :id=v20190724 ##### 
  1. `A` 增加了 `autosetTitle` 属性，可设置是否自动将 `title` 标签的值设置到页面标题上（默认 `true`）[详细](/features#自动设置标题)
  2. `F` 修复了 `margin:auto` 失效的问题

#####  [2019.06.15](https://github.com/jin-yufeng/Parser/tree/81c1c24f62dce957acb09b7deed27766d1e8167e) ##### 
  1. `F` 修复了部分情况下 `br` 标签换行格式不正确的问题

#####  [2019.06.10](https://github.com/jin-yufeng/Parser/tree/28787e5300c27111041ad54020a373d074f6af22) :id=20190610 ##### 
  1. `A` 适配了`rich-text`组件在2.7.1基础库新增加的标签，其中`big`、`small`、`mark`、`cite`、`s`等标签在低版本都可以兼容；`bdi`、`bdo`、`caption`、`rt`、`ruby` 标签必须基础库2.7.1及以上才能正常显示，低版本会被转为`span` [详细](/features#支持丰富的标签)
  2. `A` 增加了 `html2nodes`（解析`html`）、`css2object`（解析`css`）、`versionHigherThan`（比较和判断基础库版本）、`String.splice`（对字符串指定位置进行删改）等 `api` 函数 [详细](/instructions#Api)
  3. `A` 增加了 `img-mode` 属性，可以设置为 `default` 或 `widthFix`，设置为 `widthFix` 时，宽度不变，高度自动变化，可用于解决部分情况下图片变形的问题（但设置的高度会失效）[详细](/instructions#组件属性)
  4. `U` 优化了样式匹配的优先级：`tag-style` &lt; `style` 标签 &lt; 内联 `style`样式
  5. `F` 修复了 `style` 标签中`,`前后有空格时导致该样式被忽略的问题

##### [2019.06.03](https://github.com/jin-yufeng/Parser/tree/b7e9f516cad7e92c101b0b258cc8c08bcd851506) :id=v20190603 #####
  1. `A` 增加了 `autocopy` 属性，用于控制是否允许 `a` 标签受到点击时自动复制链接（仅限 `http` 开头的网址链接；默认 `true`；接近于原 `selectable` 属性的功能）[详细](/instructions#组件属性)
  2. `A` 增加了 `selectable` 属性，可用于控制是否允许长按复制任意内容（默认 `false`）[详细](/instructions#组件属性)
  3. `F` 修复了 `style` 标签内容过长时安卓机可能出现栈溢出的问题

##### [2019.06.01](https://github.com/jin-yufeng/Parser/tree/566cd29d98fe243c05879f10470333ade463d942) #####
  1. `F` 修复了部分情况下 `width` 设置为百分比时失效的问题

##### [2019.05.24](https://github.com/jin-yufeng/Parser/tree/4cd17243a303433f93b5b702aecb98974cf83aa4) #####
  1. `U` 通过以自定义组件递归的方式替代了模板循环，精简包的大小至`28.1KB`，且不再受层数限制
  2. `D` 删除了 `html-class` 和 `html-style` 属性，支持直接对 `Parser` 标签设置 `class` 和 `style`，默认的 `display` 是 `block`
  3. `F` 修复了部分情况下节点的 `display` 和 `float` 可能不生效的问题
  4. `F` 修复了背景音乐无法播放的问题（设置 `autoplay`），并支持对多个 `audio` 设置 `autoplay`

##### [2019.05.22](https://github.com/jin-yufeng/Parser/tree/bf7d568621bdf48208a2d51d704e883331bfc91d) #####
  1. `U` `bindready` 回调将返回整个组件的 `NodeRef` 结构体，包含了宽度、高度、位置等信息 [详细](/instructions#回调函数)
  2. `U` 提高了传入的 `html` 类型为 `Array` 或 `Object` 时的渲染速度（约10%）
  3. `U` 解析时若存在 `video` 或 `audio` 组件既没有 `controls` 属性也没有 `autoplay` 属性，会向控制台打印“可能不能播放”的警告

##### [2019.05.20](https://github.com/jin-yufeng/Parser/tree/e5ecc9f8a6eb8f9d5e59150569e5e40afcd153d1) #####
  1. `A` 增加支持 `source` 标签（仅限用于 `audio` 和 `video` 标签中），设置多个 `source` 的，会按顺序进行加载，加载失败的，自动加载下一条链接 [详细](/features#多媒体多资源加载)
  2. `U` `video` 标签增加支持 `autoplay` 和 `muted` 属性
  3. `U` `audio` 标签增加支持 `autoplay` 属性（仅允许自动播放一首音乐，若设置多首将仅自动播放第一首）
  4. `F` 修复了视频数量超过三个时，后面的视频无法播放的问题

##### [2019.05.19](https://github.com/jin-yufeng/Parser/tree/49886f2d817fa32cd1c2724d9e53c020201a45db) :id=v20190519 #####
  1. `A` 增加了 `html-style` 属性，可以对整个富文本容器设置 `style` 样式，可通过 `wxml` 的数据绑定实现动态修改（直接在 `style` 中设置可能不生效） *附：0524版本中被删除*
  2. `A` 增加了 `show-with-animation` 和 `animation-duration` 属性，支持在显示时使用渐显动画 [详细](/features#动画显示效果)

##### [2019.05.17](https://github.com/jin-yufeng/Parser/tree/8fa1e97724a5191b20d54b884b19ea20194e5587) #####
  1. `A` 增加了 `ready` 回调，渲染完成时调用 [详细](/instructions#回调函数)
  2. `A` 增加了 `error` 回调，解析错误或加载多媒体资源出错时调用 [详细](/instructions#回调函数)

##### [2019.05.15](https://github.com/jin-yufeng/Parser/tree/4cda9e8afc8f613888fc6a2a9fb8a791ebca4512) #####
  1. `F` 修复了一个页面内存在多个 `Parser` 组件时，`imgList` 被覆盖而导致预览失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/4)
  2. `F` 修复了图片设置 `float` 属性无效的问题

##### [2019.05.14](https://github.com/jin-yufeng/Parser/tree/d7b5e00ab0497748eab7c9330ad6108eff568e61) #####
  1. `A` 增加了 `html-class` 属性，可以对整个富文本容器设置样式，包括 `display`、`margin`、`padding` 等 *附：0524版本中被删除*
  2. `D` 删除了 `scroll` 属性，默认内容宽度超出页面时允许横向滚动，如要禁止滚动可在 `html-class` 中设置 `overflow:hidden !important`
  3. `F` 修复了实体编码的空格 `&nbsb;` 在部分情况下失效的问题 [详细](https://github.com/jin-yufeng/Parser/issues/2)

##### [2019.05.10](https://github.com/jin-yufeng/Parser/tree/e4e3b7f7eafdf9499ea8142fd096806880bc4b0a) :id=v20190510 #####
  1. `A` 增加了 `autopause` 属性，支持选择是否允许在播放视频时自动暂停其他视频播放 [详细](/instructions#组件属性)
  2. `U` 在视频数量超过三个时，仅加载前三个，其他的由图片取代，在受到点击时再进行加载和播放，避免页面卡死 [详细](/features#懒加载)
  3. `U` 在完成样式匹配后移除了节点的 `class` 和 `id` 属性，减小了 `nodes` 数组的大小，加快渲染速度

##### [2019.05.06](https://github.com/jin-yufeng/Parser/tree/fe652b6e97541d701cf232c3b5ef26d0cd07abb5) #####
  1. `A` 发布了后端 `node.js` 支持包 [详细](https://www.npmjs.com/package/parser-wxapp) 
  2. `U` 支持在 `Parser` 组件内加入加载提示或动画，将在未加载完成或内容为空时显示，加载完成后自动隐藏 [详细](/features#设置加载提示)

##### 2019.04.29 #####
  1. `A` 增加支持将 `title` 标签中的内容设置到页面标题上，并在 `bindparse` 回调中返回（可用于转发分享）[详细](/features#自动设置标题)
  2. `A` 增加`scroll`属性，可以选择是否允许页面横向滚动 *附：0514版本中被删除*
  3. `U` `style` 标签中的样式支持更多匹配模式（多个并列 `.demo1,.demo2` 等，另外对于伪类、多层的以及含有@或*的将直接忽略）[详细](/features#匹配-style-标签)
  4. `F` 修复了已知 `bug`

##### 2019.04.28 #####
  1. `U` 优化图片显示效果，对没有设置宽高的图片，按原大小显示（最大不超过100%）；设置了宽度或高度之一的，按比例进行缩放；同时设置了宽度和高度的，按设置的值进行拉伸；图片无法显示时，可以显示 `alt` 属性中的文本；但由于这些特性需要通过 `rich-text` 显示，因此取消了 `lazyload` 属性 *附：0928版本重新添加（实现方式不同）*
  2. `U` 优化了 `a` 标签的内联效果

##### 2019.04.26 #####
  1. `A` 增加支持 `pre`, `u`, `center`, `source` 等标签 [详细](/features#支持丰富的标签)
  2. `A` 增加 `bindlinkpress` 回调函数，在链接受到点击时触发，开发者可以在此回调中进行进一步操作（如下载和打开文档等）[详细](/instructions#回调函数)
  3. `U` 对于不在支持列表中的标签，除个别直接移除外，都会被转为 `div` 标签，因此可以使用一些语义化标签，如 `article`, `address` 等 *附：0610版本后不在列表中的标签会被转为行内标签*
  4. `U` 提高了解析效率和渲染效率（约 `10%`）
  5. `D` 删除了 `preview` 属性，默认允许图片预览 *附：0913版本重新添加，更名为autopreview*
  6. `D` 删除了 `space` 属性，由于设置连续空格会使得标签间的空格都被显示，导致错误的效果，因此取消了这一属性；如需要显示连续空格，请使用实体编码的空格或设置 `white-space` 属性
  7. `F` 修复了已知 `bug`

##### 2019.04.21 :id=v20190421 #####
  1. `A` 增加了 `tag-style` 属性，支持对标签设置自定义样式 [详细](/features#设置默认的标签样式)
  2. `A` 发布了 `demo` 小程序 [详细](/features#案例体验)
  3. `U` 降低了最低基础库的要求 [详细](/instructions#基础库要求)  
  4. `F` 修复了已知 `bug`

##### 2019.04.18 ##### 
  1. `A` 增加支持 `audio` 标签 [详细](/features#支持丰富的标签)
  2. `A` 增加支持图片懒加载（`lazyload` 属性）*附：0428版本中被删除，0928版本重新添加*
  3. `U` 优化 `a`，`code`，`blockquote` 等标签显示效果
  4. `F` 修复了已知 `bug`

##### 2019.04.16 #####
  1. `U` 精简插件包的大小
  2. `F` 修复已知 `bug`

##### 2019.04.14 #####
  1. `U` `style` 标签中的样式支持按标签名匹配，如 `body{ Object }` [详细](/features#匹配-style-
  2. 标签)
