# 二次开发 :id=develop

## 📣 说明 :id=notice
二次开发请在 *src* 目录下进行修改，修改完成后可通过下述方法自动生成各平台的代码包  
为方便维护，本项目原生包多个平台共用一套源代码，在编写时直接按照微信端的写法进行编写即可，[生成代码包](#pack) 时会自动进行转换  
自动转换已经抹平了大部分平台之间的差异（文件后缀名、*api* 格式等），需要注意的是 **访问组件的属性** 时，请通过 *this.properties* 访问而不是 *this.data*，因为在支付宝平台中两者不互通  

个别问题可以自行修改 *tools/converter.js* 进行处理  

附项目结构：  
```
├─dev（生成的各平台示例项目）
├─dist（生成的各平台代码包）
│  ├─mp-alipay
│  ├─mp-baidu
│  ├─mp-qq
│  ├─mp-toutiao
│  ├─mp-weixin
│  └─uni-app
├─docs（文档，由 docsify 生成）
├─plugins（插件源代码）
├─src（组件源代码）
│  ├─miniprogram（原生包源代码）
│  └─uni-app（uni-app 包源代码）
├─test（测试代码）
├─tools（构建工具）
│   ├─demo（示例项目源代码）
│   │  ├─miniprogram（原生平台示例项目）
│   │  └─uni-app（uni-app 平台示例项目）
|   ├─config.js（构建工具的配置项）
|   ├─converter.js（将微信端的代码转换到各个平台）
|   ├─ifdef.js（处理条件编译）
|   ├─minifier.js（处理 json 和 wxs 的压缩）
|   └─plugin.js（处理插件构建）
├─.eslintrc.json（eslint 配置）
├─.stylelintrc.json（stylelint 配置）
├─gulpfile.js（gulp 生成文件）
├─LICENSE（许可证 MIT）
└─package.json（项目配置）
```

?> 对于较复杂的修改，如果能通过 [编写插件](advanced/plugin#develop) 方式实现更推荐插件方式，这样在组件包升级的时候便于维护和管理  

## 🎈 条件编译 :id=ifdef
不同平台之间一些差异的地方可能无法简单的通过替换解决，因此本项目中引入了一种条件编译机制解决平台差异，可在修改时加以利用（条件编译是指在生成包的过程中就仅保留本平台需要的代码，与运行过程中的 *if* 判断不同）  

方式 *1*（适用于 *js*、*wxml*、*wxss* 文件）  
仅在某平台下需要使用的代码放在两个注释（各种注释格式皆可）之间即可，示例：  
```javascript
// #ifdef MP-WEIXIN
console.log('这是微信平台')
// #endif
// #ifndef MP-WEIXIN
console.log('这不是微信平台')
// #endif
```

方式 *2*（适用于 *wxml* 文件）    
对于仅在某一平台使用的属性，可在属性名前加 *平台名:* ，示例：
```wxml
<!-- show-menu-by-longpress 属性将仅被生成到微信包中 -->
<image mp-weixin:show-menu-by-longpress="xxx" />
```

说明：  
1. 可用的平台名称：*mp-weixin*, *mp-qq*, *mp-baidu*, *mp-alipay*, *mp-toutiao*（不区分大小写）  
2. *#if(n)def* 和 *#endif* 必须成对出现，否则会报错（可以多层嵌套）   
3. 如果编译过程中发现问题可以自行修改 *tools/ifdef.js* 进行处理  

## 📦 生成组件包 :id=pack
修改完成后，可按以下步骤生成新的组件包  
在 *mp-html* 文件夹下执行：  

1. 安装依赖  
   ```bash
   # 通过 npm 安装
   npm install
   # 或通过 yarn 安装
   yarn
   ```
2. 生成代码包到 *dist* 文件夹  
   ```bash
   # 生成微信包到 dist/mp-weixin
   npm run build:weixin
   # 生成 qq 包到 dist/mp-qq
   npm run build:qq
   # 生成百度包到 dist/mp-baidu
   npm run build:baidu
   # 生成支付宝包到 dist/mp-alipay
   npm run build:alipay
   # 生成头条包到 dist/mp-toutiao
   npm run build:toutiao
   # 生成 uni-app 包到 dist/uni-app
   npm run build:uni-app
   # 生成所有包
   npm run build
   ```

?> 如需修改打包过程中的配置（*babel*, *uglifyJs* 等），可以对 *tools/config.js* 进行修改  

## 🔦 检查和测试 :id=test
假设已安装好依赖  

```bash
npm run lint           # eslint 检查
npm run lintcss        # stylelint 检查
npm run lintcss --fix  # 检查并修复
npm run test           # 执行 jest 测试
npm run coverage       # 测试代码覆盖率
```

可以向 *test* 目录下添加新的测试用例进行测试  
