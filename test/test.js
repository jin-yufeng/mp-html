/**
 * @fileoverview 单元测试
 */
const path = require('path')
const simulate = require('miniprogram-simulate')

const html = require('./content') // 测试 html
const dist = '../dev/mp-weixin/components/mp-html/index' // 组件目录

const mpHtml = simulate.load(path.resolve(__dirname, dist), 'mp-html')

// 渲染测试
test('render', async () => {
  // 创建和渲染页面
  const id = simulate.load({
    data: {
      containerStyle: '',
      copyLink: true,
      pauseVideo: true,
      previewImg: true,
      useAnchor: true
    },
    template:
      `<scroll-view id="scroll" style="height:100px" scroll-y scroll-top="{{top}}">
  <mp-html id="article" container-style="{{containerStyle}}" content="{{html}}" domain="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo" copy-link="{{copyLink}}" loading-img="xxx" error-img="xxx" lazy-load pause-video="{{pauseVideo}}" preview-img="{{previewImg}}" scroll-table use-anchor="{{useAnchor}}">加载中...</mp-html>
</scroll-view>`,
    usingComponents: {
      'mp-html': mpHtml
    }
  })
  const page = simulate.render(id)

  // 设置数据
  page.setData({
    html
  })
  await simulate.sleep(1000)

  // api 测试
  const comp = page.querySelector('#article')
  expect(comp.dom.tagName).toBe('MP-HTML')

  await simulate.sleep(50)

  comp.instance.setContent(
    `<!-- 测试 base 标签 -->
<base href="https://xxx.com">
<!-- 测试 script 标签 -->
<script>
console.log('11')
</script>
<!-- 测试 embed 标签 -->
<embed src="xxx.mp4" />
<embed autostart src="xxx.m4a" />
<!-- 测试 source 标签 -->
<video src="xxx.mp4" loop ></video>
<!-- 测试 table 标签 -->
<table align="center"></table>
<table align="left" border="1">
  <td>
    <a>xxx</a>
  </td>
</table>
<table width="100%" border="1">
  <tr>
    <th width="20%">标题1</th>
    <th width="80%">标题2</th>
  </tr>
  <tr>
    <td colspan="2"><a>内容1</a></td>
  </tr>
</table>
<!-- 测试 font 标签、不同属性写法、实体 -->
<font color='red' face = "宋体" size=8 >&#26356;&#x591a;</font >
<font size=0>1 < 2</font>
<font>&#aaa;&aaa;&</FONT>
<!-- 测试 rpx 单位处理 -->
<span id="anchor" style="font-size:30rpx">11</span>
<!-- 测试 pre 标签处理（保留空白符） -->
<div style="white-space:pre">
  <pre>var i = 0</pre>
</div>
<!-- 测试不同情况中的图片处理 -->
<a data-test="test">
  <img src="//xxx.jpg">
</a>
<div style="display:inline-block !important;display:block">
  <img style="width:100%;" src="xxx.jpg">
  </p>
</div>
<div style="display:flex">
  <div style="flex:1">
    <img src="//xxx.jpg" style="display:inline">
  </div>
</div>
<img style="width:auto" src="data:image/png;base64,xxxx">
<img src="xxx" style="width:20px" height="10">
<img src="yyy.webp" style="width:1000px" ignore>
<svg />
<svg viewbox="0 0 1 1"><text>123</text><svg></svg></svg>
<div class="ql-align-center" style="background-image:url(&quot;/xxx.jpg?a=2&amp;b=3&quot;)"></div>
<![CDATA[<]]>
<!-- 测试 flex 布局、未闭合标签、data- 属性处理 -->
<div style="display:flex;width:1000px">
  <div style="flex:1" dir="rtl">123</div>
</div>
</br><div data-test="xxx" style="display:flex;display:-webkit-flex;"><div>
  <img data-src="/xxx.jpg" style="width:100%;height:100px">  `, true) // 补充测试
  expect(comp.instance.getText().includes('更多')).toBe(true) // 检查上方的实体是否被解码
  await comp.instance.getRect()

  await comp.instance.navigateTo('anchor') // 基于页面跳转
  comp.instance.in(page.instance) // 错误设置
  comp.instance.in(page.instance, '#scroll', 'top')
  await comp.instance.navigateTo('anchor') // 基于 scroll-view 滚动

  page.setData({
    useAnchor: false
  })
  await simulate.sleep(50)
  comp.instance.setContent('<span id="test">123</span>', true)
  try {
    await comp.instance.navigateTo('anchor') // 禁用锚点的情况下跳转
  } catch (e) { }

  page.setData({
    containerStyle: 'white-space:pre-wrap'
  })
  await simulate.sleep(50)
  comp.instance.setContent('  空格\n换行')
  expect(comp.instance.getText().includes('\n')).toBe(true) // 检查换行是否被保留

  await simulate.sleep(50) // 等待异步 api 执行完毕

  // 移除节点
  comp.triggerLifeTime('detached')
})

// 事件测试
test('event', async () => {
  // 模拟 api
  wx.createVideoContext = function () {
    // 模拟视频 context
    return {
      pause: function () { }
    }
  }
  // 测试失败回调
  wx.navigateTo = function (obj) {
    setTimeout(() => {
      if (typeof obj.fail === 'function') {
        obj.fail()
      }
    }, 0)
  }
  wx.switchTab = function (obj) {
    setTimeout(() => {
      if (typeof obj.fail === 'function') {
        obj.fail()
      }
    }, 0)
  }

  const comp = simulate.render(mpHtml)
  comp.setData({
    selectable: 'force',
    loadingImg: 'xxx'
  })
  await simulate.sleep(50)

  comp.instance.setContent(
    `<img src="xxx">
<img src="yyy" width="100" height="50" ignore>
<a href="#aaa"><img src="xxx"></a>
<a href="https://github.com/jin-yufeng/mp-html">链接2</a>
<a href="pages/test/test">链接3</a>
<video src="xxx"></video>
<video>
  <source src="/xxx">
  <source src="//yyy">
</video>
<base href="https://xxx.com">`)

  await simulate.sleep(100)

  const node = comp.querySelector('#_root')
  node.triggerLifeTime('attached')
  comp.instance._add({
    detail: node.instance
  })
  // 模拟图片加载完毕
  for (let i = 0; i <= 1; i++) {
    node.instance.imgLoad({
      target: {
        dataset: {
          i: i.toString()
        }
      },
      detail: {
        width: 100,
        height: 100
      }
    })
    // 模拟图片被点击
    node.instance.imgTap({
      target: {
        dataset: {
          i: i.toString()
        }
      }
    })
  }
  comp.setData({
    loadingImg: ''
  })
  await simulate.sleep(50)
  node.instance.imgLoad({
    target: {
      dataset: {
        i: '1'
      }
    }
  })

  // 模拟图片链接被点击
  node.instance.imgTap({
    target: {
      dataset: {
        i: '2_0'
      }
    }
  })
  node.instance.noop()
  // 模拟图片出错
  const imgError = () => node.instance.mediaError({
    target: {
      dataset: {
        i: '0'
      }
    },
    detail: {
      errMsg: 'test'
    }
  })
  imgError()
  comp.setData({
    errorImg: 'xxx'
  }, imgError)
  // 模拟链接被点击
  for (let i = 2; i <= 4; i++) {
    node.instance.linkTap({
      currentTarget: {
        dataset: {
          i: i.toString()
        }
      }
    })
  }
  // 模拟视频播放
  for (let i = 0; i < 3; i++) {
    node.instance.play({
      target: {
        id: 'v' + (i % 2)
      }
    })
  }
  // 模拟视频出错
  node.instance.mediaError({
    target: {
      dataset: {
        i: '6'
      }
    },
    detail: {
      errMsg: 'test'
    }
  })

  // 禁用一些功能
  comp.setData({
    copyLink: false,
    pauseVideo: false,
    previewImg: false
  }, () => {
    // 禁用自动拷贝后点击外部链接
    node.instance.linkTap({
      currentTarget: {
        dataset: {
          i: '3'
        }
      }
    })
    // 禁用自动暂停后播放视频
    node.instance.play({
      target: {
        id: 'v0'
      }
    })
    // 禁用预览后点击图片
    node.instance.imgTap({
      target: {
        dataset: {
          i: '0'
        }
      }
    })
  })

  await simulate.sleep(100)
})
