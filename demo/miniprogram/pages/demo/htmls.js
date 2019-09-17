var demo1 = `<style>
  body {
    margin-left:3%;
    margin-right:3%;
    margin-top:30rpx;
    margin-bottom:30rpx;
  }
</style>
<title>功能示例</title>
<body>
  <section style="border: 0px none;">
    <section style="padding: 10px;">
      <section style="box-shadow:0px 0px 5px #e5e5e5 ;height:65px;">
        <section style="display: flex;justify-content: flex-start;align-items: center;">
          <section style="width:60px;height: 65px;">
            <section style="background: #6f8691;border-top-left-radius:5px;border-bottom-left-radius: 5px;border-top-right-radius: 100%;border-bottom-right-radius: 100%;color:#fff;font-weight:bold; font-size:18px;letter-spacing:1.5px;width:60px;height: 65px;font-weight: bold;font-size: 18px; line-height:63px;text-align: center;">
              <span title="">1</span>
            </section>
          </section>
          <section style="padding:0px 0.4em 0px 0.5em;font-size: 16px;letter-spacing: 1.5px;color: #71868f;">
            <p>
              <strong>表格渲染</strong>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
  <p style="border: 0px none;">
    <br />
    <table style="border:none;border-radius:8px;width:100%;">
      <tbody>
        <tr style="border-bottom:1px solid #ccc;background-color:#f5f5f4; background-image: -webkit-linear-gradient(top,#f5f5f4,rgb(245,245,244));">
          <th style="border-radius:6px 0 0 0;padding: 10px; text-align: left;text-shadow:0 1px 0 rgba(255,255,255,0.5);">
            <span style="font-size: 14px;">#</span>
          </th>
          <th style="padding: 10px; text-align: left;text-shadow:0 1px 0 rgba(255,255,255,0.5);">
            <span style="font-size: 14px;">Top 8 Movies</span>
          </th>
          <th style="border-radius:0 6px 0 0;padding: 10px; text-align: left;text-shadow:0 1px 0 rgba(255,255,255,0.5);">
            <span style="font-size: 14px;">Year</span>
          </th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">1</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">The Shawshank Redemption</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">1994</span>
          </td>
        </tr>
        <tr style="background-color:#f5f5f4;box-shadow:0 1px 0 rgba(255,255,255,0.8) inset;border-bottom:1px solid #f2f2f2">
          <td style="padding: 10px; text-align: left;">
            <span style="font-size: 14px;">2</span>
          </td>
          <td style="padding: 10px; text-align: left;">
            <span style="font-size: 14px;">The Godfather</span>
          </td>
          <td style="padding: 10px; text-align: left;">
            <span style="font-size: 14px;">1972</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; text-align: left; word-break: break-all;">
            <span style="font-size: 14px;">3</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">The Godfather: Part II</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">1974</span>
          </td>
        </tr>
        <tr style="background-color:#f5f5f4;box-shadow:0 1px 0 rgba(255,255,255,0.8) inset;border-bottom:1px solid #f2f2f2">
          <td style="padding: 10px; text-align: left;">
            <span style="font-size: 14px;">4</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">The Good, the Bad and the Ugly</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">1966</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; text-align: left; word-break: break-all;">
            <span style="font-size: 14px;">5</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">Pulp Fiction</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">1994</span>
          </td>
        </tr>
        <tr style="background-color:#f5f5f4;box-shadow:0 1px 0 rgba(255,255,255,0.8) inset;border-bottom:1px solid #f2f2f2">
          <td style="padding:10px; text-align:left;">
            <span style="font-size: 14px;">6</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">12 Angry Men</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">1957</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; text-align: left; word-break: break-all;">
            <span style="font-size: 14px;">7</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">Schindler&#39;s List</span>
          </td>
          <td style="padding: 10px; text-align: left; word-break: break-all;">
            <span style="font-size: 14px;">1993</span>
          </td>
        </tr>
        <tr style="background-color:#f5f5f4;box-shadow:0 1px 0 rgba(255,255,255,0.8) inset;">
          <td style="padding: 10px; text-align: left;border-radius:0 0 0 6px;">
            <span style="font-size: 14px;">8</span>
          </td>
          <td style="padding:10px;text-align:left;">
            <span style="font-size: 14px;">One Flew Over the Cuckoo&#39;s Nest</span>
          </td>
          <td style="padding: 10px; text-align: left;border-radius:0 0 6px 0;">
            <span style="font-size: 14px;">1975</span>
          </td>
        </tr>
      </tbody>
    </table>
  </p>
  <p>
    <br />
  </p>
  <div id="adContainer">
    <ad unit-id="adunit-bb2f664ec0e5875c"></ad>
    <div style="font-size:12px;color:gray;text-align:center;">文中广告</div>
  </div>
  <p>
    <br />
  </p>
  <section style="border: 0px none;">
    <section style="padding: 10px;">
      <section style="box-shadow:0px 0px 5px #e5e5e5 ;height:65px;">
        <section style="display: flex;justify-content: flex-start;align-items: center;">
          <section style="width:60px;height: 65px;">
            <section style="background: #6f8691;border-top-left-radius:5px;border-bottom-left-radius: 5px;border-top-right-radius: 100%;border-bottom-right-radius: 100%;color:#fff;font-weight:bold; font-size:18px;letter-spacing:1.5px;width:60px;height: 65px;font-weight: bold;font-size: 18px; line-height:63px;text-align: center;">
              <span title="">2</span>
            </section>
          </section>
          <section style="padding:0px 0.4em 0px 0.5em;font-size: 16px;letter-spacing: 1.5px;color: #71868f;">
            <p>
              <strong>文字渲染</strong>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
  <section style="border: 0px none;">
    <section style="width:95%;margin:20px auto;">
      <section style="box-shadow: 0px 2px 10px #a9cfd5;">
        <section style="display: flex;justify-content: space-between;align-items: center;padding: 10px 5px;">
          <section style="display: inline-block;width: 25px;">
            <section style="width:0.8em;height:0.8em;background: #85b5bc;border-radius:100% ;opacity: 0.6;margin: 0px auto -8px auto;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);"></section>
            <section style="width:5px;height:1.4em;background:#a9cfd5;border-radius:6px ;margin: 0px auto;"></section>
          </section>
          <section style="display: inline-block;width: 25px;">
            <section style="width:0.8em;height:0.8em;background: #85b5bc;border-radius:100% ;opacity: 0.6;margin: 0px auto -8px auto;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);"></section>
            <section style="width:5px;height:1.4em;background:#a9cfd5;border-radius:6px ;margin: 0px auto;"></section>
          </section>
        </section>
        <section style="padding:0.2em 1em;">
          <section style="font-size: 14px;text-align: justify;letter-spacing: 1.5px;line-height: 1.75em;color:#4d909a;padding:0em 1em;">
            <p>
              <em>标题</em></hr>
              <p>上下标展示：水的化学式是H<sub>2</sub>O，2<sup>3</sup>=8</p>
              <p>插入和删除文本：<del>我想出去玩</del>，不你不想，<ins>你想学习</ins></p>
              <p>引用：<q>这是一句引用的文字</q>，这是<code>code</code>标签</p>
              <p><strong>粗体</strong>与<i>斜体</i></p>
              <p>连续&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;空格</p>
              <p><big>大一号</big>正常<small>小一号</small></p>
              <br />
              <p>以下基础库2.7.1开始支持：</p>
              <p><bdo dir="rtl">从右往左排列</bdo>（复制的内容是正序的）</p>
              <p><ruby>注音<rt><rp>(</rp>ZhuYin</rt><rp>)</rp></ruby></p>
            </p>
          </section>
        </section>
        <section style="display: flex;justify-content: space-between;align-items: center;padding: 10px 5px;">
          <section style="display: inline-block;width: 25px;">
            <section style="width:5px;height:1.4em;background:#a9cfd5;border-radius:6px ;margin: 0px auto;"></section>
            <section style="width:0.8em;height:0.8em;background: #85b5bc;border-radius:100% ;opacity: 0.6;margin: -8px auto 0px auto;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);"></section>
          </section>
          <section style="display: inline-block;width: 25px;">
            <section style="width:5px;height:1.4em;background:#a9cfd5;border-radius:6px ;margin: 0px auto;"></section>
            <section style="width:0.8em;height:0.8em;background: #85b5bc;border-radius:100% ;opacity: 0.6;margin:-8px  auto 0px auto;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);"></section>
          </section>
        </section>
      </section>
    </section>
  </section>
  <blockquote>段落引用：一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。</blockquote>
  <br />
  <h1>h1标题</h1>
  <h2>h2标题</h2>
  <h3>h3标题</h3>
  <h4>h4标题</h4>
  <h5>h5标题</h5>
  <h6>h6标题</h6>
  <br />
  <section style="border: 0px none;">
    <section style="padding: 10px;">
      <section style="box-shadow:0px 0px 5px #e5e5e5 ;height:65px;">
        <section style="display: flex;justify-content: flex-start;align-items: center;">
          <section style="width:60px;height: 65px;">
            <section style="background: #6f8691;border-top-left-radius:5px;border-bottom-left-radius: 5px;border-top-right-radius: 100%;border-bottom-right-radius: 100%;color:#fff;font-weight:bold; font-size:18px;letter-spacing:1.5px;width:60px;height: 65px;font-weight: bold;font-size: 18px; line-height:63px;text-align: center;">
              <span title="">3</span>
            </section>
          </section>
          <section style="padding:0px 0.4em 0px 0.5em;font-size: 16px;letter-spacing: 1.5px;color: #71868f;">
            <p>
              <strong>多媒体渲染</strong>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
  <section>
    <section>
      <section style="width: 100%; padding: 10px 0px; box-sizing: border-box;">
        <section style="width: 100%;margin-bottom:5px;">
          <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174"/>
        </section>
        <section style="margin-top:5px; display: flex;justify-content: center;-webkit-justify-content: center;display: -webkit-flex;">
          <section style="width: 100%;margin-right: 5px;">
            <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-2.jpg?sign=a54a0bf5bd2d632c7962f2b4e4e7018b&t=1560246712"/>
          </section>
          <section style="width: 100%;">
            <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-2.jpg?sign=a54a0bf5bd2d632c7962f2b4e4e7018b&t=1560246712"/>
          </section>
        </section>
      </section>
    </section>
  </section>
  <section style="border: 0px none;">
    <section style="width: 60%;margin: 0px auto;">
      <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-3.gif?sign=4dd623d040aba5e2ca781e9e975800bd&t=1560247351" />
    </section>
  </section>
  <p style="text-align: center;">
    <span style="font-size: 12px; color: #A5A5A5;">装饰图片，设置ignore属性后将不可预览</span>
    <br />
  </p>
  <br />
  <section>
    <section style="margin: 1em auto; white-space: normal; border: 0px none; text-align: center; padding: 0px; padding: 5px;border:1px solid #ddd;overflow: hidden;">
      <section style="white-space: nowrap; width:100%; overflow-x: scroll;">
        <section style="display: inline-block;word-wrap: break-word;white-space: normal;vertical-align: top;">
          <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-4.jpg?sign=56c2d54fe1e02af9514bcc4f328210ce&t=1560248345" style="display: inline-block;width:100%;"/>
          <p style="font-size:12px; text-align:center;">
            图片1
          </p>
        </section>
        <section style="display: inline-block;word-wrap: break-word;white-space: normal;vertical-align: top;">
          <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-5.jpg?sign=fddebceb1040a2bdfba71e36702d49aa&t=1560248515" style="display: inline-block;width:100%;"/>
          <p style="font-size:12px; text-align:center;">
            图片2
          </p>
        </section>
        <section style="display: inline-block;word-wrap: break-word;white-space: normal;vertical-align: top;">
          <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-6.jpg?sign=1f37b2e407a2190394e3edade9ae0d5f&t=1560248535" style="display: inline-block;width:100%"/>
          <p style="font-size:12px; text-align:center;">
            图片3
          </p>
        </section>
      </section>
      <p style="line-height:32px;margin: 10px;">
        <span style="font-size: 12px;">左右滑动查看更多</span>
      </p>
    </section>
  </section>
  <section>
    <p>
        <br/>
    </p>
  </section>
  <div style="text-align:center;">
    <audio src="http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46" poster= "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000" name="此时此刻" author="许巍" controls></audio>
    <p><br /></p>
    <video src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" controls unit-id="adunit-eaaa362d6fda3c6a"></video>
  </div>
  <br />
  <section style="border: 0px none;">
    <section style="padding: 10px;">
      <section style="box-shadow:0px 0px 5px #e5e5e5 ;height:65px;">
        <section style="display: flex;justify-content: flex-start;align-items: center;">
          <section style="width:60px;height: 65px;">
            <section style="background: #6f8691;border-top-left-radius:5px;border-bottom-left-radius: 5px;border-top-right-radius: 100%;border-bottom-right-radius: 100%;color:#fff;font-weight:bold; font-size:18px;letter-spacing:1.5px;width:60px;height: 65px;font-weight: bold;font-size: 18px; line-height:63px;text-align: center;">
              <span title="">4</span>
            </section>
          </section>
          <section style="padding:0px 0.4em 0px 0.5em;font-size: 16px;letter-spacing: 1.5px;color: #71868f;">
            <p>
              <strong>链接渲染</strong>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
  <section style="border: 0px none;">
    <div style="text-align: center;">
      <a href="/pages/component/component">
        <img src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo1-1.jpg?sign=4ac0a0441f2c0e3c80909c11fcc278e2&t=1560246174"/>
      </a>
      <p style="font-size:12px;color:gray">图片链接，点击可以跳转</p>
      <br />
      <a href="https://github.com/jin-yufeng/Parser">https://github.com/jin-yufeng/Parser</a>
      <p style="font-size:12px;color:gray">外部链接，点击可以复制</p>
      <br />
      <a href="https://6874-html-foe72-1259071903.tcb.qcloud.la/%E9%99%84%E4%BB%B6%E7%A4%BA%E4%BE%8B.docx?sign=558e8df1107441b038ecbb5aaafefa11&t=1556120797">附件示例.docx</a>
      <p style="font-size:12px;color:gray">附件链接，点击将下载和打开</p>
    </div>
    <br />
  </section>
  <section style="border: 0px none;">
    <section style="padding: 10px;">
      <section style="box-shadow:0px 0px 5px #e5e5e5 ;height:65px;">
        <section style="display: flex;justify-content: flex-start;align-items: center;">
          <section style="width:60px;height: 65px;">
            <section style="background: #6f8691;border-top-left-radius:5px;border-bottom-left-radius: 5px;border-top-right-radius: 100%;border-bottom-right-radius: 100%;color:#fff;font-weight:bold; font-size:18px;letter-spacing:1.5px;width:60px;height: 65px;font-weight: bold;font-size: 18px; line-height:63px;text-align: center;">
              <span title="">5</span>
            </section>
          </section>
          <section style="padding:0px 0.4em 0px 0.5em;font-size: 16px;letter-spacing: 1.5px;color: #71868f;">
            <p>
              <strong>列表渲染</strong>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
  <section>
    <section style="color:#262626">
        <p style="margin-left:5%;">有序列表
          <ol>
            <li>
              <p>多级列表</p>
              <ol>
                <li>子标题1</li>
                <li>子标题2</li>
                <li>子标题3</li>
              </ol>
            </li>
            <li>段落
              <p>一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。</p>
            </li>
          </ol>
        </p>
        <br />
        <p style="margin-left:5%;">无序列表
          <ul>
            <li>标题1
              <ul>
                <li>子标题1</li>
                <li>子标题2</li>
                <li>子标题3</li>
              </ul>
            </li>
            <li>标题2</li>
            <li>标题3</li>
          </ul>
        </p>
    </section>
  </section>
  <p>
    <br />
  </p>
  <section style="border: 0px none;">
    <section style="padding: 10px;">
      <section style="box-shadow:0px 0px 5px #e5e5e5 ;height:65px;">
        <section style="display: flex;justify-content: flex-start;align-items: center;">
          <section style="width:60px;height: 65px;">
            <section style="background: #6f8691;border-top-left-radius:5px;border-bottom-left-radius: 5px;border-top-right-radius: 100%;border-bottom-right-radius: 100%;color:#fff;font-weight:bold; font-size:18px;letter-spacing:1.5px;width:60px;height: 65px;font-weight: bold;font-size: 18px; line-height:63px;text-align: center;">
              <span title="">6</span>
            </section>
          </section>
          <section style="padding:0px 0.4em 0px 0.5em;font-size: 16px;letter-spacing: 1.5px;color: #71868f;">
            <p>
              <strong>小表情渲染</strong>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
  <table style="text-align:center;width:100%;">
    <tr>
      <td>[笑脸]</td><td>[生病]</td><td>[破涕为笑]</td>
      <td>[吐舌]</td><td>[脸红]</td><td>[恐惧]</td>
      <td>[失望]</td><td>[无语]</td><td>[眨眼]</td><td>[酷]</td>
    </tr>
    <tr>
      <td>[痴迷]</td><td>[吻]</td><td>[思考]</td>
      <td>[困惑]</td><td>[颠倒]</td><td>[钱]</td>
      <td>[惊讶]</td><td>[白眼]</td><td>[叹气]</td><td>[睡觉]</td>
    </tr>
    <tr>
      <td>[书呆子]</td><td>[愤怒]</td><td>[面无表情]</td>
      <td>[张嘴]</td><td>[量体温]</td><td>[呕吐]</td>
      <td>[光环]</td><td>[幽灵]</td><td>[捂耳朵]</td><td>[捂嘴]</td>
    </tr>
    <tr>
      <td>[婴儿]</td><td>[男孩]</td><td>[女孩]</td>
      <td>[男人]</td><td>[女人]</td><td>[老人]</td>
      <td>[老妇人]</td><td>[王子]</td><td>[公主]</td><td>[家庭]</td>
    </tr>
  </table>
</body>`;
var demo2 = `<title>整体示例</title>
<section>
  <section style="width: 100%;">
    <section style="width: 100%;background: #ecfef1;color:#27bc71;">
      <section style="border: 0px none;">
        <section style="width: 100%;">
          <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-1.gif?sign=315839e7417ea8d156d56983eddf5e29&t=1560248635" />
        </section>
      </section>
      <section style="border: 0px none;">
        <section style="padding: 2em 0px 4em 0px;">
          <section style="display: flex;justify-content: center;color:#27bc71;">
            <section style="height: 3em;border-left:1px solid #27bc71;margin-right: 1em;margin-top:8em;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);"></section>
            <section style="writing-mode:tb-rl;font-size: 35px;font-weight: bold;width:40px;letter-spacing:2px;margin-right: -30px;">
              负
            </section>
            <section style="writing-mode:tb-rl;font-size: 18px;letter-spacing:2px;margin-top: 40px;width:20px;">
              春暖花开 万物复苏
            </section>
            <section style="writing-mode:tb-rl;font-size: 35px;font-weight: bold;margin-top: -1em;margin-left:-10px;width:40px;">
              不
            </section>
            <section style="writing-mode:tb-rl;font-size: 35px;font-size:20px;width:20px;margin-top:15px;margin-left: -1em;">
              好
            </section>
            <section style="writing-mode:tb-rl;font-size: 35px;font-weight: bold;margin-left:-20px; margin-top:40px;letter-spacing:2px;width:40px;">
              春光
            </section>
            <section style="width: 1px;height:2.6em;border-left:1px solid #27bc71;margin-left:0.3em;margin-top: -1.8em;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);"></section>
            <section style="width: 1px;height:2em;border-left:1px solid #27bc71;margin-top:4em;margin-left:0.1em;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);"></section>
          </section>
        </section>
      </section>
      <section style="border: 0px none;">
        <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-2.png?sign=9ecdf5317956e5064414d386fbf53ab0&t=1560248755)no-repeat;background-position:top ;background-size:100%;padding: 4em 0px 1em 0px;">
          <section style="text-align: center;">
            <section style="display: inline-block;background: #27bc71;border-radius:8px;color: #fff;">
              <section style="display: flex;justify-content: center;padding: 5px 0em;">
                <section style="width: 20px;">
                  <img style="width: 100%;display: block;margin-top:12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="text-align: center;font-size: 18px;font-weight: bold;padding: 0px 10px;letter-spacing: 2px;">
                  春天来啦
                </section>
                <section style="width: 25px;margin-top: -10px;margin-right: -6px;">
                  <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
      <section style="border: 0px none;">
        <section style="width: 100%;font-size: 14px;text-align:center;letter-spacing: 1.5px;color:#27bc71;">
          <p>
            成都的三月花团锦簇
          </p>
          <p>
            在接下来一个月里
          </p>
          <p>
            油菜花、梨花、桃花、
          </p>
          <p>
            樱桃花、杏花、郁金香等
          </p>
          <p>
            花朵将竞相开放
          </p>
          <p>
            为爱耍的成都人
          </p>
          <p>
            提供了不少春游赏花、踏青的好去处
          </p>
          <p>
            同学们自然也不会错过缤纷的季节
          </p>
        </section>
      </section>
      <section style="border: 0px none;">
        <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-5.png?sign=6188990065daa9743b71026fab04452d&t=1560249090)no-repeat;background-position:left ;background-size:30px;">
          <section style="text-align: center;padding:2em 0px;">
            <section style="display: inline-block;background: #27bc71;border-radius:8px;color: #fff;">
              <section style="display: flex;justify-content: center;padding: 5px 0em;">
                <section style="width: 20px;">
                  <img style="width: 100%;display: block;margin-top:12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="text-align: center;font-size: 18px;font-weight: bold;padding: 0px 10px;letter-spacing: 2px;">
                  踏青攻略
                </section>
                <section style="width: 25px;margin-top: -10px;margin-right: -6px;">
                  <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin: 20px auto 0px auto;">
        <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-6.png?sign=6f29a4491cadc1f0732b015acac0a3da&t=1560249189)no-repeat;background-position:right ;background-size:30px ;padding-bottom:50px;">
          <section style="text-align: center;font-size: 18px;font-weight: bold;letter-spacing: 2px;">
            芦山油菜花海春意闹
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin-top: -60px;">
        <section style="padding: 1em;">
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257)no-repeat;background-position:top ;background-size:100%;">
            <img style="width: 100%;display: block;opacity: 0;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257" />
          </section>
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-8.png?sign=432b941e89cc41f51ecc67241b7ae0db&t=1560249314)repeat-y;background-position:top ;background-size:100%;">
            <section style="padding:10px;">
              <section style="margin-top: -3em;">
                <section style="width: 30px;">
                  <img style="width: 100%;display: block;margin-top: 12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="width: 35px;float: right;">
                  <img style="width: 100%;display: block;margin-bottom:-20px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
              <section style="clear: both;"></section>
              <section style="background: rgb(254,254,254);border-radius:10px;padding:30px 30px 10px 30px;">
                <section>
                  <section style="width:2em;height:2em;background: #f0f187;opacity: 0.6;float: right;margin-bottom: -1.5em;margin-right:-8px;"></section>
                  <section style="width: 100%;clear: both;-webkit-box-shadow:0px 2px 6px #c4c4c3;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);">
                    <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-9.jpg?sign=a888036679566c86e6ea233405a84c82&t=1560249431" />
                  </section>
                  <section style="width:2em;height:2em;background: #c4f9d2;margin-top: -1.5em;margin-left:-8px;"></section>
                </section>
                <section style="width: 100%;font-size: 14px;text-align:justify;letter-spacing: 1.5px;color:#27bc71;padding: 1em 0px;">
                  <p>
                    赏花佳期：3月初—4月下旬
                  </p>
                  <p>
                    “立体多层，起伏跌宕”是芦山独特的地貌油菜花景观,立体感的油菜花山区别于平原地区平面式的油菜花海，与奇特秀丽的自然景观和多姿多彩的民族风情相辉映，构成了芦山春天的一道靓丽的风景线。
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496)no-repeat;">
            <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496" />
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin: 20px auto 0px auto;">
        <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-6.png?sign=6f29a4491cadc1f0732b015acac0a3da&t=1560249189)no-repeat;background-position:right ;background-size:30px ;padding-bottom:50px;">
          <section style="text-align: center;font-size: 18px;font-weight: bold;letter-spacing: 2px;">
            龙泉驿国际桃花节
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin-top: -60px;">
        <section style="padding: 1em;">
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257)no-repeat;background-position:top ;background-size:100%;">
            <img style="width: 100%;display: block;opacity: 0;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257" />
          </section>
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-8.png?sign=432b941e89cc41f51ecc67241b7ae0db&t=1560249314)repeat-y;background-position:top ;background-size:100%;">
            <section style="padding:10px;">
              <section style="margin-top: -3em;">
                <section style="width: 30px;">
                  <img style="width: 100%;display: block;margin-top: 12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="width: 35px;float: right;">
                  <img style="width: 100%;display: block;margin-bottom:-20px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
              <section style="clear: both;"></section>
              <section style="background: rgb(254,254,254);border-radius:10px;padding:30px 30px 10px 30px;">
                <section>
                  <section style="width:2em;height:2em;background: #f0f187;opacity: 0.6;float: right;margin-bottom: -1.5em;margin-right:-8px;"></section>
                  <section style="width: 100%;clear: both;-webkit-box-shadow:0px 2px 6px #c4c4c3;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);">
                    <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-11.jpg?sign=8e1a7a3ea9c9637fbf8992d796654a1f&t=1560249580" />
                  </section>
                  <section style="width:2em;height:2em;background: #c4f9d2;margin-top: -1.5em;margin-left:-8px;"></section>
                </section>
                <section style="width: 100%;font-size: 14px;text-align:justify;letter-spacing: 1.5px;color:#27bc71;padding: 1em 0px;">
                  <p>
                    赏花佳期：3月初—4月中旬
                  </p>
                  <p>
                    每年三月桃花开，书房村、山泉乡、三元村、桃花沟、天鹅岭等处游客如云。碰上周末,更是人山人海，像赶“桃花集”，每天来赶集的人都有几万。
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496)no-repeat;">
            <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496" />
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin: 20px auto 0px auto;">
        <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-5.png?sign=6188990065daa9743b71026fab04452d&t=1560249090)no-repeat;background-position:left ;background-size:30px;padding-bottom:50px;">
          <section style="text-align: center;font-size: 18px;font-weight: bold;letter-spacing: 2px;">
            新津万亩梨园似雪原
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin-top: -60px;">
        <section style="padding: 1em;">
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257)no-repeat;background-position:top ;background-size:100%;">
            <img style="width: 100%;display: block;opacity: 0;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257" />
          </section>
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-8.png?sign=432b941e89cc41f51ecc67241b7ae0db&t=1560249314)repeat-y;background-position:top ;background-size:100%;">
            <section style="padding:10px;">
              <section style="margin-top: -3em;">
                <section style="width: 30px;">
                  <img style="width: 100%;display: block;margin-top: 12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="width: 35px;float: right;">
                  <img style="width: 100%;display: block;margin-bottom:-20px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
              <section style="clear: both;"></section>
              <section style="background: rgb(254,254,254);border-radius:10px;padding:30px 30px 10px 30px;">
                <section>
                  <section style="width:2em;height:2em;background: #f0f187;opacity: 0.6;float: right;margin-bottom: -1.5em;margin-right:-8px;"></section>
                  <section style="width: 100%;clear: both;-webkit-box-shadow:0px 2px 6px #c4c4c3;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);">
                    <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-12.jpg?sign=8b78a920a00724bc2072b7de20f9adcb&t=1560249648" />
                  </section>
                  <section style="width:2em;height:2em;background: #c4f9d2;margin-top: -1.5em;margin-left:-8px;"></section>
                </section>
                <section style="width: 100%;font-size: 14px;text-align:justify;letter-spacing: 1.5px;color:#27bc71;padding: 1em 0px;">
                  <p>
                    赏花佳期：3月初—4月中旬
                  </p>
                  <p>
                    春天的新津梨花溪，最令人期待的就是那万亩梨园。那百年老梨树进入三月的盛花期后，让整个梨花溪变成满山遍野的雪白世界。
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496)no-repeat;">
            <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496" />
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin: 20px auto 0px auto;">
        <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-6.png?sign=6f29a4491cadc1f0732b015acac0a3da&t=1560249189)no-repeat;background-position:right ;background-size:30px ;padding-bottom:50px;">
          <section style="text-align: center;font-size: 18px;font-weight: bold;letter-spacing: 2px;">
            石象湖郁金香
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin-top: -60px;">
        <section style="padding: 1em;">
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257)no-repeat;background-position:top ;background-size:100%;">
            <img style="width: 100%;display: block;opacity: 0;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257" />
          </section>
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-8.png?sign=432b941e89cc41f51ecc67241b7ae0db&t=1560249314)repeat-y;background-position:top ;background-size:100%;">
            <section style="padding:10px;">
              <section style="margin-top: -3em;">
                <section style="width: 30px;">
                  <img style="width: 100%;display: block;margin-top: 12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="width: 35px;float: right;">
                  <img style="width: 100%;display: block;margin-bottom:-20px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
              <section style="clear: both;"></section>
              <section style="background: rgb(254,254,254);border-radius:10px;padding:30px 30px 10px 30px;">
                <section>
                  <section style="width:2em;height:2em;background: #f0f187;opacity: 0.6;float: right;margin-bottom: -1.5em;margin-right:-8px;"></section>
                  <section style="width: 100%;clear: both;-webkit-box-shadow:0px 2px 6px #c4c4c3;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);">
                    <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-13.jpg?sign=413e66201e7e2dc418b0cdc6280554be&t=1560249701" />
                  </section>
                  <section style="width:2em;height:2em;background: #c4f9d2;margin-top: -1.5em;margin-left:-8px;"></section>
                </section>
                <section style="width: 100%;font-size: 14px;text-align:justify;letter-spacing: 1.5px;color:#27bc71;padding: 1em 0px;">
                  <p>
                    赏花佳期：3月—4月
                  </p>
                  <p>
                    石象湖是西部的郁金香王国，号称花中贵妇的郁金香目前在国内基本上是高成本温室栽培，大面积室外培育仅石象湖一家。与往届相比，今年花会规模更大、品种更多、配套活动更丰富多彩。几百万株郁金香将让游客充分领略到春的气息。
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496)no-repeat;">
            <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496" />
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin: 20px auto 0px auto;">
        <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-5.png?sign=6188990065daa9743b71026fab04452d&t=1560249090)no-repeat;background-position:left ;background-size:30px;padding-bottom:50px;">
          <section style="text-align: center;font-size: 18px;font-weight: bold;letter-spacing: 2px;">
            邛崃天台山茶花
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin-top: -60px;">
        <section style="padding: 1em;">
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257)no-repeat;background-position:top ;background-size:100%;">
            <img style="width: 100%;display: block;opacity: 0;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-7.png?sign=7f1c0b89ca9eee58474512df426ea94c&t=1560249257" />
          </section>
          <section style="width: 100%;background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-8.png?sign=432b941e89cc41f51ecc67241b7ae0db&t=1560249314)repeat-y;background-position:top ;background-size:100%;">
            <section style="padding:10px;">
              <section style="margin-top: -3em;">
                <section style="width: 30px;">
                  <img style="width: 100%;display: block;margin-top: 12px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-3.png?sign=8fdad0e87c6997fc8f23b6f85ee3339c&t=1560248860" />
                </section>
                <section style="width: 35px;float: right;">
                  <img style="width: 100%;display: block;margin-bottom:-20px;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-4.png?sign=6649728df734b32dfa08de959cd48f6d&t=1560249019" />
                </section>
              </section>
              <section style="clear: both;"></section>
              <section style="background: rgb(254,254,254);border-radius:10px;padding:30px 30px 10px 30px;">
                <section>
                  <section style="width:2em;height:2em;background: #f0f187;opacity: 0.6;float: right;margin-bottom: -1.5em;margin-right:-8px;"></section>
                  <section style="width: 100%;clear: both;-webkit-box-shadow:0px 2px 6px #c4c4c3;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-o-transform: rotate(0deg);">
                    <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-14.jpg?sign=703a62ce3b2095e3801dcd63bf7fa6f7&t=1560249751" />
                  </section>
                  <section style="width:2em;height:2em;background: #c4f9d2;margin-top: -1.5em;margin-left:-8px;"></section>
                </section>
                <section style="width: 100%;font-size: 14px;text-align:justify;letter-spacing: 1.5px;color:#27bc71;padding: 1em 0px;">
                  <p>
                    赏花佳期：即日—3月底
                  </p>
                  <p>
                    天台山的山茶花本是西南红山茶的变种，从红色渐次演绎出粉红、桃红、白色等多种颜色，至今都还没有正式命名。景区20平方公里范围内，分布有树龄达100年以上野生山茶树10多万株，是四川省内分布面积最广，数量最大的高山野生山茶花群落。
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section style="background: url(https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496)no-repeat;">
            <img style="width: 100%;display: block;" ignore src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-10.png?sign=113f264c3ff6f96e113b63afaf125d3c&t=1560249496" />
          </section>
        </section>
      </section>
      <section style="border: 0px none;margin: 20px auto 0px auto;">
        <section style="display: flex;justify-content: center;align-items: center;">
          <section style="display: inline-block;width:1em;">
            <img style="width: 100%;display: block;" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-15.png?sign=8508536dc335ca185604e48feecb0c9d&t=1560249799"/>
          </section>
          <section style="font-size:16px;padding:5px 0.2em;letter-spacing: 1.5px;color:#1f9459;">
            END
          </section>
          <section style="display: inline-block;width:1em;">
            <img style="width: 100%;display: block;transform: scaleX(-1);-webkit-transform: scaleX(-1);-moz-transform: scaleX(-1);-o-transform: scaleX(-1);" src="https://6874-html-foe72-1259071903.tcb.qcloud.la/demo2-15.png?sign=8508536dc335ca185604e48feecb0c9d&t=1560249799"/>
          </section>
        </section>
        <section style="width: 100%;font-size: 14px;text-align:center;letter-spacing: 1.5px;color:#1f9459;padding: 1em 0px;">
          <p>
            模板来自135编辑器（侵删）
          </p>
        </section>
      </section>
    </section>
  </section>
</section>`;
var demo3 = {
  "nodes": [{
    "children": [{
      "children": [{
        "children": [{
          "children": [{
            "children": [{
              "text": " 腾讯财报首次披露金融科技及企业服务收入，小程序等带动To B增长 ",
              "type": "text"
            }],
            "name": "h2",
            "attrs": {
              "style": ";font-weight:400;font-size:16px;font-size:22px;line-height:1.4;margin-bottom:14px;"
            }
          }, {
            "children": [{
              "children": [{
                "children": [{
                  "text": " 微信公开课 ",
                  "type": "text"
                }],
                "continue": true,
                "name": "a",
                "attrs": {
                  "style": ";color:#366092;display:inline;word-break:break-all;overflow:auto;",
                  "href": "javascript:void(0);"
                }
              }],
              "name": "span",
              "attrs": {
                "style": ";display:inline-block;vertical-align:middle;margin:0 10px 10px 0;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;"
              },
              "continue": true
            }, {
              "children": [],
              "continue": true,
              "name": "em",
              "attrs": {
                "style": ";font-style:normal;display:inline-block;vertical-align:middle;margin:0 10px 10px 0;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0);color:rgba(0,0,0,0.3);"
              }
            }],
            "name": "div",
            "attrs": {
              "style": ";margin-bottom:22px;line-height:20px;font-size:0;word-wrap:break-word;word-break:break-all;"
            },
            "continue": true
          }, {
            "children": [{
              "children": [{
                "children": [{
                  "children": [{
                    "children": [{
                      "text": "刚刚，腾讯发布了2019年Q1财报，截至2019年3月31日，微信及WeChat的合并月活跃账户数增至",
                      "type": "text"
                    }, {
                      "children": [{
                        "children": [{
                          "text": "11.",
                          "type": "text"
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;color: rgb(61, 167, 66);"
                        }
                      }],
                      "name": "strong",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "text": "12亿",
                          "type": "text"
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;color: rgb(61, 167, 66);"
                        }
                      }],
                      "name": "strong",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                      }
                    }, {
                      "text": "，同比增长",
                      "type": "text"
                    }, {
                      "children": [{
                        "children": [{
                          "text": "6.9%",
                          "type": "text"
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;color: rgb(61, 167, 66);"
                        }
                      }],
                      "name": "strong",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                      }
                    }, {
                      "text": "。",
                      "type": "text"
                    }],
                    "name": "span",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }, {
                  "children": [{
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }],
                "name": "div",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;letter-spacing: 1px;line-height: 1.8;"
                }
              }, {
                "children": [{
                  "children": [{
                    "children": [{
                      "text": "我们为大家摘录了小程序相关的重点信息。",
                      "type": "text"
                    }],
                    "name": "span",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }, {
                  "children": [{
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }, {
                  "children": [{
                    "children": [{
                      "children": [{
                        "children": [{
                          "children": [],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: 0.5em;margin-bottom: 0.5em;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height: 1px;background-color: rgb(61, 167, 66);box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 40%;box-sizing: border-box;"
                        }
                      }, {
                        "children": [{
                          "children": [{
                            "children": [{
                              "children": [{
                                "text": "1",
                                "type": "text"
                              }],
                              "name": "p",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;width: 1.6em;height: 1.6em;line-height: 1.6em;border-radius: 100%;margin-left: auto;margin-right: auto;font-size: 18px;color: rgb(255, 255, 255);background-color: rgb(61, 167, 66);box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;box-sizing: border-box;"
                              }
                            }, {
                              "children": [],
                              "name": "div",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;width: 0px;margin-top: -0.76em;border-bottom: 0.8em solid rgb(61, 167, 66);border-left: 0.8em solid transparent !important;border-right: 0.5em solid transparent !important;box-sizing: border-box;"
                              }
                            }],
                            "name": "div",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;box-sizing: border-box;"
                            }
                          }],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: -10px;margin-right: 0%;margin-left: 0%;text-align: center;font-size: 10px;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 20%;box-sizing: border-box;"
                        }
                      }, {
                        "children": [{
                          "children": [{
                            "children": [],
                            "name": "br",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                            }
                          }],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: 0.5em;margin-bottom: 0.5em;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height: 1px;background-color: rgb(61, 167, 66);box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 40%;box-sizing: border-box;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-right: 0%;margin-left: 0%;box-sizing: border-box;"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "children": [],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;padding-left: 5px;vertical-align: middle;display: inline-block;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;text-align: left;box-sizing: border-box;"
                        }
                      }, {
                        "children": [{
                          "children": [{
                            "children": [{
                              "children": [{
                                "text": "小程序、支付、企业微信协同带来to B收入增长",
                                "type": "text"
                              }],
                              "name": "strong",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;"
                              }
                            }],
                            "name": "span",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 14px;"
                            }
                          }],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;padding-left: 5px;vertical-align: middle;display: inline-block;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;text-align: left;box-sizing: border-box;"
                        }
                      }, {
                        "children": [{
                          "children": [{
                            "children": [],
                            "name": "br",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                            }
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;color: rgb(51, 51, 51);text-align: justify;font-family: PingFangSC-Light;"
                          }
                        }],
                        "name": "p",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;"
                        }
                      }, {
                        "children": [{
                          "children": [{
                            "text": "自本季起，我们开始在财报中",
                            "type": "text"
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                          }
                        }, {
                          "children": [{
                            "children": [{
                              "children": [{
                                "text": "单独披露",
                                "type": "text"
                              }],
                              "name": "span",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-family: PingFangSC-Light;font-size: 15px;color: rgb(61, 167, 66);"
                              }
                            }],
                            "name": "strong",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                            }
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                          }
                        }, {
                          "children": [{
                            "text": "「金融科技及企业服务」这一新部分情况。该服务在本季产生人民币",
                            "type": "text"
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                          }
                        }, {
                          "children": [{
                            "children": [{
                              "children": [{
                                "text": "218亿",
                                "type": "text"
                              }],
                              "name": "span",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-family: PingFangSC-Light;font-size: 15px;color: rgb(61, 167, 66);"
                              }
                            }],
                            "name": "strong",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                            }
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                          }
                        }, {
                          "children": [{
                            "text": "元的收入，其规模及范围反映了该服",
                            "type": "text"
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                          }
                        }, {
                          "children": [{
                            "text": "务与我们部分现有消费者服务产生协同效益（例如我们的通信及社交平台与点对点支付服务之间的协同效益，或我们的小程序与企业微信服务之间的协同效益）。",
                            "type": "text"
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                          }
                        }, {
                          "children": [],
                          "name": "br",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                          }
                        }],
                        "name": "p",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;text-align: justify;margin-left: 8px;margin-right: 8px;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: -4px;margin-right: 0%;margin-left: 0%;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;color: rgb(62, 62, 62);text-align: center;box-sizing: border-box;"
                      }
                    }],
                    "name": "div",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;width: 100%;vertical-align: top;box-sizing: border-box;"
                    }
                  }],
                  "name": "div",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;font-size: 16px;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin: 10px 0%;box-sizing: border-box;"
                  }
                }],
                "name": "div",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;letter-spacing: 1px;line-height: 1.8;"
                }
              }, {
                "children": [{
                  "children": [{
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }, {
                  "children": [{
                    "children": [{
                      "children": [{
                        "children": [{
                          "children": [],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: 0.5em;margin-bottom: 0.5em;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;background-color: rgb(61, 167, 66);height: 1px;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 40%;box-sizing: border-box;"
                        }
                      }, {
                        "children": [{
                          "children": [{
                            "children": [{
                              "children": [{
                                "text": "2",
                                "type": "text"
                              }],
                              "name": "p",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;background-color: rgb(61, 167, 66);width: 1.6em;height: 1.6em;line-height: 1.6em;border-radius: 100%;margin-left: auto;margin-right: auto;font-size: 18px;color: rgb(255, 255, 255);box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;box-sizing: border-box;"
                              }
                            }, {
                              "children": [],
                              "name": "div",
                              "attrs": {
                                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;width: 0px;margin-top: -0.76em;border-bottom: 0.8em solid rgb(61, 167, 66);border-left: 0.8em solid transparent !important;border-right: 0.5em solid transparent !important;box-sizing: border-box;"
                              }
                            }],
                            "name": "div",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;box-sizing: border-box;"
                            }
                          }],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: -10px;margin-right: 0%;margin-left: 0%;text-align: center;font-size: 10px;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 20%;box-sizing: border-box;"
                        }
                      }, {
                        "children": [{
                          "children": [],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: 0.5em;margin-bottom: 0.5em;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;background-color: rgb(61, 167, 66);height: 1px;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 40%;box-sizing: border-box;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-right: 0%;margin-left: 0%;box-sizing: border-box;"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "children": [{
                            "text": "小程序广告能力增强，帮助开发者变现",
                            "type": "text"
                          }],
                          "name": "strong",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;"
                          }
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 14px;"
                        }
                      }],
                      "name": "p",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: -4px;margin-right: 0%;margin-left: 0%;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;text-align: center;font-size: 15px;color: rgb(62, 62, 62);box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;box-sizing: border-box;"
                      }
                    }],
                    "name": "div",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;width: 100%;vertical-align: top;box-sizing: border-box;"
                    }
                  }],
                  "name": "div",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;font-size: 16px;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin: 10px 0%;box-sizing: border-box;"
                  }
                }, {
                  "children": [{
                    "children": [],
                    "name": "span",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;"
                    }
                  }, {
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }],
                "name": "div",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                }
              }, {
                "children": [{
                  "children": [{
                    "text": "财报期内，社交及其他广告收入增长",
                    "type": "text"
                  }, {
                    "children": [{
                      "children": [{
                        "text": "34%",
                        "type": "text"
                      }],
                      "name": "span",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;color: rgb(61, 167, 66);"
                      }
                    }],
                    "name": "strong",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }, {
                    "text": "至人民币",
                    "type": "text"
                  }, {
                    "children": [{
                      "children": [{
                        "text": "98.98亿元",
                        "type": "text"
                      }],
                      "name": "span",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;color: rgb(61, 167, 66);"
                      }
                    }],
                    "name": "strong",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }, {
                    "text": "，主要是由于微信朋友圈、小程序及QQ看点的广告收入增长。",
                    "type": "text"
                  }, {
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "span",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-left: 8px;margin-right: 8px;"
                }
              }, {
                "children": [{
                  "children": [],
                  "name": "br",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                }
              }, {
                "children": [{
                  "children": [{
                    "text": "小程序的banner广告、激励式插屏广告帮助开发者实现更多收入变现。",
                    "type": "text"
                  }],
                  "name": "span",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-family: PingFangSC-Light;font-size: 15px;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-left: 8px;margin-right: 8px;"
                }
              }, {
                "children": [{
                  "children": [],
                  "name": "br",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;white-space: normal;font-family: -apple-system-font, BlinkMacSystemFont, Arial, sans-serif;"
                }
              }, {
                "children": [{
                  "children": [{
                    "children": [{
                      "children": [{
                        "children": [],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: 0.5em;margin-bottom: 0.5em;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;background-color: rgb(61, 167, 66);height: 1px;box-sizing: border-box;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 40%;box-sizing: border-box;"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "children": [{
                            "children": [{
                              "text": "3",
                              "type": "text"
                            }],
                            "name": "p",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;background-color: rgb(61, 167, 66);width: 1.6em;height: 1.6em;line-height: 1.6em;border-radius: 100%;margin-left: auto;margin-right: auto;font-size: 18px;color: rgb(255, 255, 255);box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;box-sizing: border-box;"
                            }
                          }, {
                            "children": [],
                            "name": "div",
                            "attrs": {
                              "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;width: 0px;margin-top: -0.76em;border-bottom: 0.8em solid rgb(61, 167, 66);border-left: 0.8em solid transparent !important;border-right: 0.5em solid transparent !important;box-sizing: border-box;"
                            }
                          }],
                          "name": "div",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;box-sizing: border-box;"
                          }
                        }],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: -10px;margin-right: 0%;margin-left: 0%;text-align: center;font-size: 10px;box-sizing: border-box;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 20%;box-sizing: border-box;"
                      }
                    }, {
                      "children": [{
                        "children": [],
                        "name": "div",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: 0.5em;margin-bottom: 0.5em;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;background-color: rgb(61, 167, 66);height: 1px;box-sizing: border-box;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;vertical-align: top;width: 40%;box-sizing: border-box;"
                      }
                    }],
                    "name": "div",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-right: 0%;margin-left: 0%;box-sizing: border-box;"
                    }
                  }, {
                    "children": [{
                      "children": [{
                        "children": [{
                          "text": "小程序社交拼团玩法促进用户稳健增长",
                          "type": "text"
                        }],
                        "name": "strong",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;"
                        }
                      }],
                      "name": "span",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 14px;"
                      }
                    }],
                    "name": "p",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-top: -4px;margin-right: 0%;margin-left: 0%;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;text-align: center;font-size: 15px;color: rgb(62, 62, 62);box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;box-sizing: border-box;"
                    }
                  }],
                  "name": "div",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;display: inline-block;width: 100%;vertical-align: top;box-sizing: border-box;"
                  }
                }],
                "name": "div",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;font-size: 16px;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;box-sizing: border-box;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin: 10px 0%;box-sizing: border-box;"
                }
              }, {
                "children": [{
                  "children": [{
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "span",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                }
              }, {
                "children": [{
                  "children": [{
                    "text": "微信用户能够在群内分享资讯、产品及服务等各种",
                    "type": "text"
                  }, {
                    "children": [{
                      "children": [{
                        "text": "垂直领域的小程序",
                        "type": "text"
                      }],
                      "name": "span",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;color: rgb(61, 167, 66);"
                      }
                    }],
                    "name": "strong",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }, {
                    "text": "，促进社区拼团等服务模式的扩展，使微信",
                    "type": "text"
                  }, {
                    "children": [{
                      "children": [{
                        "text": "非游戏类小程序的活跃用户群持续稳健增长",
                        "type": "text"
                      }],
                      "name": "span",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;color: rgb(61, 167, 66);"
                      }
                    }],
                    "name": "strong",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }, {
                    "text": "。",
                    "type": "text"
                  }, {
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "span",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;font-family: PingFangSC-Light;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-left: 8px;margin-right: 8px;"
                }
              }, {
                "children": [{
                  "children": [],
                  "name": "br",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;"
                }
              }, {
                "children": [{
                  "children": [{
                    "children": [{
                      "text": "财报中微信的完整信息，可查看下方长图获取：",
                      "type": "text"
                    }],
                    "name": "span",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-family: PingFangSC-Light;font-size: 15px;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-left: 8px;margin-right: 8px;"
                  }
                }, {
                  "children": [{
                    "children": [],
                    "name": "span",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 15px;"
                    }
                  }, {
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;margin-right: 8px;margin-left: 8px;"
                  }
                }, {
                  "children": [{
                    "children": [],
                    "name": "img",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height:auto!important;width: 556px;height: 1594px;max-width:100% !important",
                      "src": "https://mmbiz.qpic.cn/mmbiz_jpg/ib3nLDnR1dIicDCIdl9BadGbjm2yVvAiaKTOYkEohsfpr5V67HUI7Xib48FLOGddoz2x1KEwA3HSrmZ1YpAmXz8Eiaw/640?wx_fmt=jpeg"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;text-align: center;"
                  },
                  "continue": true
                }, {
                  "children": [{
                    "children": [],
                    "name": "img",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height:auto!important;max-width:100% !important",
                      "src": "https://mmbiz.qpic.cn/mmbiz_jpg/ib3nLDnR1dIicDCIdl9BadGbjm2yVvAiaKT3f3TNoR5AErOUw5sE6w2xnBcreia1xwVFp8Y6ibAGLMH8XY2SDpUBiayQ/640?wx_fmt=jpeg"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;text-align: center;"
                  },
                  "continue": true
                }, {
                  "children": [{
                    "children": [],
                    "name": "img",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height:auto!important;width: 556px;height: 1743px;max-width:100% !important",
                      "src": "https://mmbiz.qpic.cn/mmbiz_jpg/ib3nLDnR1dIicDCIdl9BadGbjm2yVvAiaKTzSbnz3Qic4E26K9RsZq5hQxIySMIN3KfbKic01NQSgD2gicdkuDCicnOMg/640?wx_fmt=jpeg"
                    }
                  }, {
                    "children": [],
                    "name": "br",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                    }
                  }],
                  "name": "p",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;text-align: center;"
                  },
                  "continue": true
                }],
                "name": "div",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;letter-spacing: 1px;line-height: 1.8;"
                },
                "continue": true
              }, {
                "children": [{
                  "children": [],
                  "name": "br",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                  }
                }],
                "name": "p",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;"
                }
              }],
              "name": "div",
              "attrs": {
                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-size: 16px;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
              },
              "continue": true
            }, {
              "children": [{
                "children": [{
                  "children": [{
                    "children": [{
                      "children": [],
                      "name": "img",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height:auto!important;width:2em;margin-right: 8px;vertical-align: middle;display: inline-block;box-sizing: border-box !important;overflow-wrap: break-word !important;visibility: visible !important;width: 2em !important;max-width:100% !important",
                        "src": "https://mmbiz.qpic.cn/mmbiz_png/ib3nLDnR1dIibmNttyqg6BQkibIhPGxIb1IqJQmFVjJMzIN0ecCkIo9O861Lh8soya5OfhW6Wp7yx5wRUocI49XjQ/640?wx_fmt=png"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "text": "微信公开课",
                          "type": "text"
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                        }
                      }],
                      "name": "p",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;max-width: 100%;min-height: 1em;vertical-align: middle;display: inline-block;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                      }
                    }],
                    "name": "div",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;float: left;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                    },
                    "continue": true
                  }, {
                    "children": [{
                      "children": [{
                        "text": "微信ID:wx-gongkaike",
                        "type": "text"
                      }],
                      "name": "span",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;font-size: 15px;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                      }
                    }],
                    "name": "p",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;float: right;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                    }
                  }],
                  "name": "div",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;overflow: hidden;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                  },
                  "continue": true
                }, {
                  "children": [{
                    "children": [{
                      "children": [],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box;border-radius: 50%;width: 4.5em;height: 4.5em;overflow: hidden;display: inline-block;overflow-wrap: break-word !important;"
                      }
                    }, {
                      "children": [{
                        "children": [],
                        "name": "img",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height:auto!important;width:4.5em;margin-right: auto;margin-bottom: 5px;margin-left: auto;display: block;box-sizing: border-box !important;overflow-wrap: break-word !important;visibility: visible !important;width: 4.5em !important;max-width:100% !important",
                          "src": "https://mmbiz.qpic.cn/mmbiz_png/ib3nLDnR1dIibmNttyqg6BQkibIhPGxIb1IcthOBBUyzFNiaxI7CRoCqaxiaaltb2CwOjky5gibyicsjDftTGjBacsr7Q/640?wx_fmt=png"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box;border-radius: 50%;width: 4.5em;height: 4.5em;overflow: hidden;display: inline-block;overflow-wrap: break-word !important;"
                      },
                      "continue": true
                    }, {
                      "children": [{
                        "children": [{
                          "text": "1.点击历史信息，查看更多内容",
                          "type": "text"
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;font-size: 14px;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                        }
                      }],
                      "name": "p",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;text-align: left;color: rgb(83, 83, 83);font-size: 0.5em;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "text": "2.长按右侧二维码，关注微信公开课",
                          "type": "text"
                        }],
                        "name": "span",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;font-size: 14px;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                        }
                      }],
                      "name": "p",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;text-align: left;color: rgb(83, 83, 83);font-size: 0.5em;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                      }
                    }],
                    "name": "div",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;width: 10em;float: left;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                    },
                    "continue": true
                  }, {
                    "children": [{
                      "children": [],
                      "name": "img",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;height:auto!important;width:8em;box-sizing: border-box !important;overflow-wrap: break-word !important;visibility: visible !important;width: 8em !important;max-width:100% !important",
                        "src": "https://mmbiz.qpic.cn/mmbiz_png/ib3nLDnR1dIibmNttyqg6BQkibIhPGxIb1IxGpRvfT0Z5qhgRRMroIHI5t0U4Qzb54D03z5kUCJYFUZ4RUzXMkvMg/640?wx_fmt=png"
                      }
                    }, {
                      "children": [{
                        "children": [{
                          "children": [{
                            "text": "长按二维码关注",
                            "type": "text"
                          }],
                          "name": "span",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;font-size: 14px;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                          }
                        }],
                        "name": "p",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;letter-spacing: 0.544px;max-width: 100%;min-height: 1em;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                        }
                      }, {
                        "children": [{
                          "children": [],
                          "name": "br",
                          "attrs": {
                            "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;"
                          }
                        }],
                        "name": "p",
                        "attrs": {
                          "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;clear:both;min-height:1em;"
                        }
                      }],
                      "name": "div",
                      "attrs": {
                        "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;color: rgb(83, 83, 83);font-size: 0.5em;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                      }
                    }],
                    "name": "div",
                    "attrs": {
                      "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;width: 7em;float: right;box-sizing: border-box !important;overflow-wrap: break-word !important;"
                    },
                    "continue": true
                  }],
                  "name": "div",
                  "attrs": {
                    "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;padding: 0.5em;max-width: 100%;box-sizing: border-box;border-color: rgb(37, 196, 0);overflow: hidden;border-top-width: 1px;border-top-style: solid;border-bottom-width: 1px;border-bottom-style: solid;overflow-wrap: break-word !important;"
                  },
                  "continue": true
                }],
                "name": "div",
                "attrs": {
                  "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;letter-spacing: 1px;line-height: 1.8;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;line-height: 1.8;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;color: rgb(62, 62, 62);letter-spacing: 0.544px;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin: 1em auto;max-width: 100%;box-sizing: border-box;line-height: 25.6px;border-width: medium;border-style: none;border-color: currentcolor;width: 20em;text-align: center;overflow-wrap: break-word !important;"
                },
                "continue": true
              }],
              "name": "div",
              "attrs": {
                "style": ";max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;font-family: -apple-system-font, BlinkMacSystemFont, Arial, sans-serif;letter-spacing: 0.544px;white-space: normal;widows: 1;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;;;max-width:100%!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;word-wrap:break-word!important;margin-right: auto;margin-left: auto;max-width: 100%;width: 568.677px;box-sizing: border-box !important;overflow-wrap: break-word !important;"
              },
              "continue": true
            }],
            "name": "div",
            "attrs": {
              "style": ";overflow:hidden;color:#333;font-size:17px;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;text-align:justify;position:relative;z-index:0;"
            },
            "continue": true
          }],
          "name": "div",
          "attrs": {
            "style": ";"
          },
          "continue": true
        }, {
          "children": [],
          "name": "ul",
          "attrs": {
            "style": ";"
          }
        }, {
          "children": [{
            "children": [{
              "children": [{
                "children": [{
                  "children": [{
                    "text": " 在看",
                    "type": "text"
                  }],
                  "name": "span",
                  "attrs": {
                    "style": ";"
                  }
                }],
                "name": "span",
                "attrs": {
                  "style": ";"
                }
              }],
              "name": "span",
              "attrs": {
                "style": ";visibility: hidden;"
              }
            }],
            "name": "div",
            "attrs": {
              "style": ";"
            }
          }],
          "name": "div",
          "attrs": {
            "style": ";padding-top:15px;"
          }
        }],
        "name": "div",
        "attrs": {
          "style": ";"
        },
        "continue": true
      }],
      "name": "div",
      "attrs": {
        "style": ";padding:20px 16px 12px;padding:calc(20px + constant(safe-area-inset-top)) calc(16px + constant(safe-area-inset-right)) 12px calc(16px + constant(safe-area-inset-left));padding:calc(20px + env(safe-area-inset-top)) calc(16px + env(safe-area-inset-right)) 12px calc(16px + env(safe-area-inset-left));background-color:#fafafa;background-color:#fff;"
      },
      "continue": true
    }, {
      "children": [],
      "name": "div",
      "attrs": {
        "style": ";padding:0 16px 16px;padding:0 calc(16px + constant(safe-area-inset-right)) calc(16px + constant(safe-area-inset-bottom)) calc(16px + constant(safe-area-inset-left));padding:0 calc(16px + env(safe-area-inset-right)) calc(16px + env(safe-area-inset-bottom)) calc(16px + env(safe-area-inset-left));"
      }
    }],
    "name": "div",
    "attrs": {
      "style": ";-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;line-height:1.6;;;-webkit-touch-callout:none;font-family:-apple-system-font,BlinkMacSystemFont,\"Helvetica Neue\",\"PingFang SC\",\"Hiragino Sans GB\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",Arial,sans-serif;color:#333;background-color:#f2f2f2;letter-spacing:.034em;;;;;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;"
    },
    "continue": true
  }],
  "title": "",
  "imgList": ["https://mmbiz.qpic.cn/mmbiz_jpg/ib3nLDnR1dIicDCIdl9BadGbjm2yVvAiaKTOYkEohsfpr5V67HUI7Xib48FLOGddoz2x1KEwA3HSrmZ1YpAmXz8Eiaw/640?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/ib3nLDnR1dIicDCIdl9BadGbjm2yVvAiaKT3f3TNoR5AErOUw5sE6w2xnBcreia1xwVFp8Y6ibAGLMH8XY2SDpUBiayQ/640?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_jpg/ib3nLDnR1dIicDCIdl9BadGbjm2yVvAiaKTzSbnz3Qic4E26K9RsZq5hQxIySMIN3KfbKic01NQSgD2gicdkuDCicnOMg/640?wx_fmt=jpeg", "https://mmbiz.qpic.cn/mmbiz_png/ib3nLDnR1dIibmNttyqg6BQkibIhPGxIb1IqJQmFVjJMzIN0ecCkIo9O861Lh8soya5OfhW6Wp7yx5wRUocI49XjQ/640?wx_fmt=png", "https://mmbiz.qpic.cn/mmbiz_png/ib3nLDnR1dIibmNttyqg6BQkibIhPGxIb1IcthOBBUyzFNiaxI7CRoCqaxiaaltb2CwOjky5gibyicsjDftTGjBacsr7Q/640?wx_fmt=png", "https://mmbiz.qpic.cn/mmbiz_png/ib3nLDnR1dIibmNttyqg6BQkibIhPGxIb1IxGpRvfT0Z5qhgRRMroIHI5t0U4Qzb54D03z5kUCJYFUZ4RUzXMkvMg/640?wx_fmt=png"]
}
module.exports = {
  demo1,
  demo2,
  demo3
}