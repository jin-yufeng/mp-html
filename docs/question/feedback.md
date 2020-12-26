# 📩 反馈 :id=feedback

## 注意事项 :id=notice
反馈问题前，请先确认以下方式无法解决：  
1. 在 [常见问题](question/faq) 中查看是否已有解决方案
2. 在 [issue](https://github.com/jin-yufeng/mp-html/issues) 中查找是否已有相同或类似的问题
3. 如果是对于渲染效果的问题，请先在下方的模拟器中尝试，如果在浏览器中渲染也不正常，请检查样式

<div style="display: flex;">
  <div style="flex: 1; margin: 0 40px; display: flex; flex-direction: column;">
    <textarea id="input" style="flex: 1; width: 100%; padding: 5px; resize: none;" placeholder="请输入 html 内容"></textarea>
    <div style="text-align: center; margin-top: 10px;">
      <button onclick="reset()">清空</button>
      <button onclick="render()" style="margin-left: 20px;">渲染</button>
    </div>
  </div>
  <div style="flex: 0 0 320px; height: 568px; box-shadow: 0px 0px 10px #c0c0c0;">
    <iframe id="show" style="width: 100%; height: 100%; margin: 0;"></iframe>
  </div>
</div>

## 反馈方式 :id=method
1. *issue* 方式  
   在 *github* 中提出 [issue](https://github.com/jin-yufeng/mp-html/issues/new/choose)（推荐，解决方案可以给其他人参考）
2. 邮箱方式  
   如果不希望公开问题，可以通过邮箱方式联系，发送邮件到 *mp_html@126.com*，邮件格式可参考 [issue 模板](https://github.com/jin-yufeng/mp-html/issues/new/choose)

!> 注意务必按照模板要求填写，未描述清楚或无法复现的问题将不予处理