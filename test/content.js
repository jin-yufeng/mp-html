/**
 * @fileoverview 用于测试的 html 内容
 */
module.exports = `<title>富文本示例</title>
<div>
  <section style="text-align: center; margin: 0px auto;">
    <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
      <span style="font-size: 18px; color: #595959;">表格</span>
    </section>
  </section>
  <section style="margin-top: 1.5em;">
    <table width="100%" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>标题 1</th>
          <th>标题 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center">内容 1</td>
          <td align="center">内容 2</td>
        </tr>
        <tr style="background-color: #f6f8fa;">
          <td align="center">内容 3</td>
          <td align="center"><a>链接</a></td>    
        </tr>
        <tr>
          <td align="center">内容 5</td>
          <td align="center">内容 6</td>
        </tr>
      </tbody>
    </table>
    <div style="font-size: 12px; color: gray; text-align: center; margin-top: 5px;">普通表格</div>
  </section>
  <section style="margin-top: 1.5em;">
    <table width="500px" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>标题 1</th>
          <th>标题 2</th>
          <th>标题 3</th>
          <th>标题 4</th>
          <th>标题 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center">内容 1</td>
          <td align="center">内容 2</td>
          <td align="center">内容 3</td>
          <td align="center">内容 4</td>
          <td align="center">内容 5</td>
        </tr>
        <tr style="background-color: #f6f8fa;">
          <td align="center"><a>链接</a></td>
          <td align="center">内容 7</td>
          <td align="center">内容 8</td>
          <td align="center">内容 9</td>
          <td align="center">内容 10</td>
        </tr>
        <tr>
          <td align="center">内容 11</td>
          <td align="center">内容 12</td>
          <td align="center">内容 13</td>
          <td align="center">内容 14</td>
          <td align="center">内容 15</td>
        </tr>
      </tbody>
    </table>
    <div style="font-size: 12px; color: gray; text-align: center; margin-top: 5px;">长表格，可以单独横向滚动</div>
  </section>
  <section style="margin-top: 1.5em;">
    <table width="100%" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th align="center">标题 1</th>
          <th align="center">标题 2</th>
          <th align="center">标题 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center" colspan="2">内容 1</td>
          <td align="center" rowspan="2">内容 2</td>
        </tr>
        <tr>
          <td align="center" rowspan="2">内容 3</td>
          <td align="center">内容 4</td>
        </tr>
        <tr>
          <td align="center" colspan="2">内容 5</td>
        </tr>
        <tr>
          <td align="center">内容 6</td>
          <td align="center">内容 7</td>
          <td align="center"><a>链接</a></td>
        </tr>
      </tbody>
    </table>
    <div style="font-size: 12px; color: gray; text-align: center; margin-top: 5px;">含有合并单元格的表格</div>
  </section>
  <section id="list" style="text-align: center; margin: 0px auto; margin-top: 2em">
    <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
      <span style="font-size: 18px; color: #595959;">列表</span>
    </section>
  </section>
  <section style="margin-top: 1.5em;">
    <ol style="margin-bottom: 1.5em;">
      <li>这是第一条列表项</li>
      <li>这是第二条列表项</li>
      <li>这是第三条 <a>链接</a></li>
    </ol>
    <ol type="A" style="margin-bottom: 1.5em;">
      <li>这是第一条列表项</li>
      <li>这是第二条列表项</li>
      <li>这是第三条 <a>链接</a></li>
    </ol>
    <ol type="I" style="margin-bottom: 1.5em;">
      <li>这是第一条列表项</li>
      <li>这是第二条列表项</li>
      <li>这是第三条 <a>链接</a></li>
    </ol>
    <ul>
      <li>第一级无序列表</li>
      <li>第一级无序列表
        <ul>
          <li>第二级无序列表</li>
          <li>第二级无序列表
            <ul>
              <li>第三级无序列表</li>
              <li>第三级 <a>链接</a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>    
  </section>
  <section style="text-align: center; margin: 0px auto; margin-top: 2em">
    <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
      <span style="font-size: 18px; color: #595959;">文本</span>
    </section>
  </section>
  <section style="margin-top: 1.5em;">
    <p style="margin-bottom: 1em;">
      <ruby>
        拼<rp>(</rp><rt>pin</rt><rp>)</rp>
        音<rp>(</rp><rt>yin</rt><rp>)</rp>
      </ruby>
      &nbsp;&nbsp;<i>斜体</i>
      &nbsp;&nbsp;<b>粗体</b>
      &nbsp;&nbsp;上标<sup>1</sup>
      &nbsp;&nbsp;下标<sub>2</sub>
    </p>
    <p style="margin-bottom: 1em;">
      <span style="text-decoration: overline;">上划线</span>
      &nbsp;&nbsp;<s>中划线</s>
      &nbsp;&nbsp;<u>下划线</u>
    </p>
    <p>
      <big>大一号</big>
      &nbsp;&nbsp;<span>正常</span>
      &nbsp;&nbsp;<small>小一号</small>
    </p>
    <h2 style="margin-top: 0.5em;">大标题</h2>
    <h3 style="margin-top: 0.5em;">中标题</h3>
    <h4 style="margin-top: 0.5em;">小标题</h4>
  </section>
  <section style="text-align: center; margin: 0px auto; margin-top: 2em">
    <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
      <span style="font-size: 18px; color: #595959;">链接</span>
    </section>
  </section>
  <section style="margin-top: 1.5em; text-align: center;">
    <a href="#">跳转到顶部</a>&nbsp;&nbsp;&nbsp;<a href="#list">跳转到列表</a>
    <div style="font-size: 12px; color: gray; margin-top: 5px;">锚点链接，将滚动到对应位置</div>
  </section>
  <section style="margin-top: 1.5em; text-align: center;">
    <a href="https://github.com/jin-yufeng/mp-html">外部链接</a>
    <div style="font-size: 12px; color: gray; margin-top: 5px;">外部链接，将复制链接</div>
  </section>
  <section style="margin-top: 1.5em; text-align: center;">
    <a href="/pages/jump/jump">内部链接</a>
    <div style="font-size: 12px; color: gray; margin-top: 5px;">内部链接，将跳转页面</div>
  </section>
  <section style="text-align: center; margin: 0px auto; margin-top: 2em">
    <section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;">
      <span style="font-size: 18px; color: #595959;">图片</span>
    </section>
  </section>
  <section style="margin-top: 1.5em; text-align: center;">
    <img src="/demo-thumb.jpg?sign=91b3e495d16f96a0df3d263c9ff95821&t=1609059235" original-src="/demo.jpg?sign=af7082bed28711177bd952dbab67373e&t=1609059255">
    <div style="font-size: 12px; color: gray; margin-top: 5px;">点击预览高清图</div>
  </section>
  <section style="margin-top: 1.5em; text-align: center;">
    <svg width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;">
      <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>
      </path>
    </svg>
    <div style="font-size: 12px; color: gray; margin-top: 5px;">svg 动画</div>
  </section>
</div>`
