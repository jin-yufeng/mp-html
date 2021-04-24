# search
功能：关键词搜索  
大小：*≈1.5KB*  
支持平台：  

| 微信小程序 | QQ 小程序 | 百度小程序 | 支付宝小程序 | 头条小程序 | uni-app |
|:---:|:---:|:---:|:---:|:---:|:---:|
| √ | √ | √ | √ | √ | √(nvue 不支持) |

说明：  
引入后会在组件实例上挂载一个 *search* 方法，用于关键词搜索  

输入值  

| 参数名 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|---|
| key | String 或 RegExp | - | 要搜索的关键词，支持字符串和正则 |
| anchor | Boolean | false | 是否将搜索结果设置为锚点 |
| style | String | background-color:yellow | 标记搜索结果的样式 |

返回值：*Promise*    

| 属性 | 类型 | 说明 |
|:---:|:---:|---|
| num | Number | 搜索结果数量 |
| highlight | Function(i, style='background-color:#FF9632') | 高亮第 i（1 ~ num）个结果，将其样式设置为 style |
| jump | Function(i, offset) | 跳转到第 i（1 ~ num）个结果，偏移量为 offset，anchor 为 true 才可用 |

示例：  
```javascript
function search (key) {
  // ctx 为组件实例
  ctx.search(key, true).then(res => {
    res.highlight(1)
    res.jump(1, -50) // 高亮第 1 个结果并跳转到该位置，偏移量 -50
  })
}
```

附加说明：  
1. 不传入 *key*（或为空）时即可取消搜索，取消所有的高亮，还原到原来的效果  
2. 进行新的搜索时旧的搜索结果将被还原，旧的结果中的 *highlight* 等方法不再可用  
3. 调用 *highlight* 方法高亮一个结果时，之前被高亮的结果会被还原，即始终只有一个结果被高亮  
4. *key* 传入字符串时大小写敏感，如果要忽略大小写可以用正则的 *i*（字符串搜索效率高于正则）  
5. 设置 *anchor* 为 *true* 会一定程度上降低效率，非必要不要开启  
6. 暂不支持跨标签搜索，即只有一个文本节点内包含整个关键词才能被搜索到  
