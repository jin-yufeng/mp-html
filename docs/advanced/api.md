# 🔎 api
组件的实例上挂载了一些实用的 *api* 方法可供调用  

## 获取组件实例 :id=getCompent
- *uni-app*  
  ```vue
  <template>
    <view>
      <mp-html ref="article" />
    </view>
  </template>
  <script>
    export default {
      onLoad () {
        var ctx = this.$refs.article
      }
    }
  </script>
  ```

- 支付宝小程序  
  需开启 [component2](https://opendocs.alipay.com/mini/framework/component-ref) 模式
  ```axml
  <mp-html ref="article">
  ```
  ```javascript
  Page({
    article (ctx) {
      // 获得组件实例
    } 
  })
  ```

- 其他小程序平台  
  ```wxml
  <mp-html id="article" />
  ```
  ```javascript
  Page({
    onLoad () {
      // 微信、QQ、百度
      var ctx = this.selectComponent('#article')
      // 头条
      this.selectComponent('#article', ctx => {

      })
    }
  })
  ```

## in
功能：将锚点跳转的范围限定在一个 *scroll-view*（需要开启纵向滚动）内  
输入值：  

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|:---:|:---:|:---:|:---:|---|
| page | object | 是 | - | scroll-view 标签所在页面实例 |
| selector | string | 是 | - | scroll-view 标签 的选择器 |
| scrollTop | string | 是 | - | scroll-view 标签 scrollTop 属性绑定的变量名 |

返回值：无  
示例：  
```wxml
<scroll-view id="scroll" style="height:300px" scroll-top="{{top}}" scroll-y scroll-with-animation>
  <mp-html id="article" content="{{html}}" />
</scroll-view>
```
```javascript
Page({
  onLoad () {
    // ctx 为组件实例
    ctx.in(this, '#scroll', 'top')
  }
})
```

!> 在 *scroll-view* 中使用时需要注意如果使用了视频，需要保证该平台的 *video* 标签支持同层渲染  

## navigateTo
功能：锚点跳转  
前提是 [use-anchor](basic/prop#use-anchor) 属性的值为 *true*  
必须在 [load](basic/event#load) 事件触发后使用，建议在 [ready](basic/event#ready) 事件触发后使用以保证跳转位置准确  
  
输入值：  

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|:---:|:---:|:---:|:---:|---|
| id | string | 否 | - |要跳转的锚点 id，为空则跳转到开头 |
| offset | number | 否 | 0 | 跳转位置的偏移量 |

返回值：**Promise**  

该方法中传入的 *offset* 优先级高于 [use-anchor](basic/prop#use-anchor) 属性  

示例：  
```javascript
Page({
  ready () {
    // ctx 为组件实例
    ctx.navigateTo('anchor').then(() => {
      console.log('跳转成功')
    }).catch(err => {
      console.log('跳转失败：', err)
    })
  }
})
```

## getText
功能：获取文本内容  
必须在 [load](basic/event#load) 事件触发后使用  
输入值：无  
返回值：**String**

## getRect
功能：获取富文本内容的位置和大小  
如果开启了 [lazy-load](basic/prop#lazy-load)，[ready](basic/event#ready) 事件返回的不是最终大小，可通过此方法获得实时的大小和位置信息  
输入值：无  
返回值：**Promise**  
示例：  
```javascript
Page({
  getRect () {
    // ctx 为组件实例
    ctx.getRect().then(rect => {
      console.log(rect) // boundingClientRect 信息
    }).catch(err => {
      console.log('获取失败', err)
    })
  }
})
```

!> 该方法有小概率可能获取失败，需要做好错误处理  

## setContent
功能：设置富文本内容  
此方法的功能与 [content](basic/prop#content) 属性基本一致，但此方法的设置不需要经过视图层且可以从尾部追加  
输入值：  

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|:---:|:---:|:---:|:---:|---|
| content | string | 是 | - | 要渲染的 html 字符串 |
| append | boolean | 否 | false | 是否从尾部追加 | 

返回值：无  

!> 调用此方法会触发 [load](basic/event#load) 和 [ready](basic/event#ready) 事件，请勿在事件处理函数中调用，否则可能陷入死循环  

## imgList
功能：获取所有图片的数组  
该数组用于图片预览，对其进行修改可以在自动预览时生效（如修改为高清图链接）  

```javascript
Page({
  load () {
    // ctx 为组件实例
    var cover = ctx.imgList[0] // 首张图可以作为转发封面图
    ctx.imgList.forEach((src, i, array) => {
      console.log(src)
      array[i] = src.replace('thumb', '') // 替换为高清图链接
    })
  }
})
```

!> 这是一个属性，不是一个函数  
请不要增删此数组（可以修改），否则在自动预览时可能出现问题    
