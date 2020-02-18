// test.js
const marked = require("./marked.min.js");
var htmlString;
var videoAd = null;
// 计算可用次数
const today = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
const storge = wx.getStorageSync(today);
var times = (storge === '' ? 3 : storge);
Page({
  // 数据
  data: {
    // 标签的默认样式
    tagStyle: {
      pre: "padding:1em 1em 0 1em;margin:.5em 0;border-radius:0.3em;background:#272822;color:#f8f8f2;line-height: 1.5;text-shadow:0 1px rgba(0,0,0,0.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;position:relative;user-select:text",
      code: "background-color:#f0f0f0;font-size:85%;margin:0 3px;padding:2px 5px 2px 5px;border-radius:2px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace"
    },
    parseing: false,
    modes: ['html 解析', 'markdown 解析'],
    ad: false
  },
  // 
  onLoad(e) {
    this.setData({
      index: e.index,
      times: times
    })
    htmlString = "";
    // 激励视频广告
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-06b11586227f9e9b'
      })
      videoAd.onLoad(() => {
        this.setData({
          ad: true
        })
      })
      videoAd.onError((err) => {
        this.setData({
          ad: false
        })
      })
      videoAd.onClose((res) => {
        if (res && res.isEnded) {
          this.setData({
            times: (times += 3)
          })
          wx.showToast({
            title: '成功获取',
          })
          wx.setStorageSync(today, times);
        } else {
          wx.showToast({
            title: '获取失败',
          })
        }
      })
    }
  },
  // 输入字符串
  inputHtml(e) {
    htmlString = e.detail.value;
  },
  // 增加模板
  addTemplate(e) {
    switch (e.target.dataset.type) {
      case "table":
        if (this.data.index == "0")
          htmlString +=
          `<table border="1">
  <tr>
    <td>标题1</td>
    <td>标题2</td>
    <td>标题3</td>
  </tr>
  <tr>
    <td rowspan=2>内容1</td>
    <td>内容2</td>
    <td>内容3</td>
  </tr>
  <tr>
    <td>内容4</td>
    <td>内容5</td>
  </tr>
</table>`;
        else
          htmlString +=
          `| 标题1 | 标题2 |
|:---:|:---:|
| 内容1 | 内容2 |`;
        break;
      case "list":
        if (this.data.index == "0")
          htmlString +=
          `<ol>
  <li>类型1-1</li>
  <li>类型1-2</li>
</ol>
<ol type="A" start="3" style="margin-top:5px;">
  <li>类型2-3</li>
  <li>类型2-4</li>
</ol>
<ol type="I" start="5" style="margin-top:5px;">
  <li>类型3-5</li>
  <li>类型3-6</li>
</ol>
<ul style="margin-top:10px">
  <li>层级1
    <ul>
      <li>层级2
        <ul>
          <li>层级3</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>`;
        else
          htmlString +=
          `- 无序列表1
- 无序列表2
1. 有序列表1
2. 有序列表2`;
        break;
      case "img":
        if (this.data.index == "0")
          htmlString +=
          `<div style="text-align:center;">
  <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174" />
  <p style="color:gray;font-size:12px;text-align:center">点击图片预览</p>
  </br>
  <img width="200" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-7.png?sign=8f8d76e641ab2c9aa5ac93dab36f8422&t=1581751574" />
  <p style="color:gray;font-size:12px">长按扫描</p>
  </br>
  <img ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-3.gif?sign=4dd623d040aba5e2ca781e9e975800bd&t=1560247351" width="50%"/>
  <p style="color:gray;font-size:12px">装饰图片不能预览</p>
</div>`;
        else
          htmlString += "![示例图片](https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174)"
        break;
      case 'a':
        if (this.data.index == "0")
          htmlString +=
          `<div style="text-align:center">
  <a href="/pages/docs/docs?index=0">
    <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174" />
  </a>
  <p style="font-size:12px;color:gray">图片链接，点击可以跳转</p>
  <br />
  <a href="https://github.com/jin-yufeng/Parser">https://github.com/jin-yufeng/Parser</a>
  <p style="color:gray;font-size:12px">外部链接，长按可以复制</p>
</div>`;
        else
          htmlString += "[GitHub链接](https://github.com/jin-yufeng/Parser)";
        break;
      case "code":
        if (this.data.index == "0")
          htmlString += "<pre lan=\"javascript\">var i = 0;</pre>";
        else
          htmlString += "```javascript\nvar i = 0;\n```";
        break;
    }
    this.setData({
      htmlString
    })
  },
  // 清空内容
  clearHtml() {
    htmlString = '';
    this.setData({
      html: '',
      htmlString: '',
      parseing: false,
    })
  },
  // 对焦
  focus() {
    this.setData({
      parseing: false,
      focus: true,
    })
  },
  // 进行解析
  parseHtml() {
    if (!htmlString) {
      wx.showModal({
        title: "失败",
        content: "内容不能为空！",
        showCancel: false
      })
      return;
    }
    var content = htmlString;
    if (this.data.index == '1')
      content = marked(content);
    this.setData({
      parseing: true,
      html: content,
      htmlString,
      times: (--times)
    })
    wx.setStorageSync(today, times);
  },
  // 图片长按
  imglongtap(e) {
    this.url = e.detail.src;
    this.setData({
      showActionsheet: true,
      groups: [{
        text: "复制图片地址",
        value: 0
      }]
    })
    // 云调用 img.scanQRCode
    wx.cloud.callFunction({
      name: "scanImg",
      data: {
        src: this.url
      },
      success: (res) => {
        if (res.result.codeResults.length) {
          this.scanRes = res.result.codeResults[0].data;
          this.setData({
            groups: [{
              text: "复制图片地址",
              value: 0
            }, {
              text: "复制识别结果",
              value: 1
            }]
          })
        }
      }
    })
  },
  // 图片菜单点击
  actiontap(e) {
    if(!e.detail.value)
      wx.setClipboardData({
        data: this.url
      })
    else
      wx.setClipboardData({
        data: this.scanRes
      })
    this.setData({
      showActionsheet: false
    })
  },
  // 显示激励视频广告
  showAd() {
    if (videoAd) {
      videoAd.show().catch(() => {
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            wx.showToast({
              title: "加载失败",
            })
          })
      })
    }
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: this.data.modes[this.data.index],
      imageUrl: "https://6874-html-foe72-1259071903.tcb.qcloud.la/share.png?sign=1d1c1938f23a3b1d8b34818599f9f0b4&t=1560250134",
      path: "/pages/test/test?index=" + this.data.index
    }
  }
})