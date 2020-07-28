/*
  search 扩展包
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
module.exports = function (component, args = {}) {
  args.style = args.style || 'background-color:yellow';
  var obj = {},
    stack = [],
    res = [];
  (function f(nodes, path) {
    for (var i = 0, n; n = nodes[i]; i++) {
      if (n.type == 'text' && args.key) {
        var arr = n.text.split(args.key),
          children = [];
        if (arr.length > 1) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j]) children.push({
              type: 'text',
              text: arr[j]
            })
            if (j != arr.length - 1) {
              res.push(`${path}[${i}].children[${children.length}].attrs.style`);
              children.push({
                name: 'span',
                attrs: {
                  id: args.anchor ? 'anchor' + res.length : void 0,
                  style: args.style
                },
                children: [{
                  type: 'text',
                  text: args.key instanceof RegExp ? args.key.exec(n.text)[0] : args.key
                }]
              })
            }
          }
          if (args.key instanceof RegExp) args.key.exec(n.text);
          if (args.anchor) {
            for (var l = stack.length; l--;)
              if (stack[l].c) break;
              else obj[stack[l].path] = 1;
          }
          obj[`${path}[${i}]`] = {
            name: 'span',
            c: args.anchor ? 1 : void 0,
            s: 1,
            children
          }
        }
      } else if (n.s) {
        var text = '';
        for (var k = 0, m; m = n.children[k]; k++) {
          if (m.text) text += m.text;
          else text += m.children[0].text;
        }
        nodes[i] = {
          type: 'text',
          text
        }
        if (args.key && (args.key instanceof RegExp ? args.key.test(text) : text.includes(args.key))) i--;
        else obj[`${path}[${i}]`] = nodes[i];
      } else if (n.children) {
        stack.push({
          path: `${path}[${i}].c`,
          c: n.c || n.name == 'table'
        });
        f(n.children, `${path}[${i}].children`);
        stack.pop();
      }
    }
  })(component.data.nodes, 'nodes');
  component.setData(obj, () => {
    args.success && args.success({
      num: res.length,
      highlight(i, hlstyle = 'background-color:#FF9632') {
        if (i < 1 || i > res.length) return;
        var obj = {};
        if (this.last) obj[res[this.last - 1]] = args.style;
        this.last = i;
        obj[res[i - 1]] = hlstyle;
        component.setData(obj);
      },
      jump: args.anchor ? (i, offset) => {
        if (i > 0 && i <= res.length)
          component.navigateTo({
            id: 'anchor' + i,
            offset
          })
      } : void 0
    })
  })
}