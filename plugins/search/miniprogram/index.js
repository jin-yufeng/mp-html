/**
 * @fileoverview search 插件
 */

function Search (vm) {
  /**
   * @description 关键词搜索
   * @param {regexp|string} key 要搜索的关键词
   * @param {boolean} anchor 是否将搜索结果设置为锚点
   * @param {string} style 搜索结果的样式
   */
  vm.search = function (key, anchor, style = 'background-color:yellow') {
    const obj = {}
    const stack = []
    const res = [];

    // 遍历搜索
    (function traversal (nodes, path) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.type === 'text' && key) {
          const arr = node.text.split(key)
          const children = []
          if (arr.length > 1) {
            // 找到关键词
            for (let j = 0; j < arr.length; j++) {
              if (arr[j]) {
                children.push({
                  type: 'text',
                  text: arr[j]
                })
              }
              if (j !== arr.length - 1) {
                // 关键词转为一个 span
                res.push(`${path}[${i}].children[${children.length}].attrs.style`)
                children.push({
                  name: 'span',
                  attrs: {
                    id: anchor ? 'search' + res.length : undefined, // 用于锚点的 id
                    style
                  },
                  children: [{
                    type: 'text',
                    text: key instanceof RegExp ? key.exec(node.text)[0] : key
                  }]
                })
              }
            }
            if (key instanceof RegExp) {
              key.exec(node.text)
            }
            if (anchor) {
              for (let l = stack.length; l--;) {
                // 给父组件做标记，将该标签暴露出来
                if (stack[l].c) {
                  break
                } else {
                  obj[stack[l].path] = 1
                }
              }
            }
            obj[`${path}[${i}]`] = {
              name: 'span',
              c: anchor ? 1 : undefined,
              s: 1,
              children
            }
          }
        } else if (node.s) {
          let text = ''
          // 复原上一次的结果
          for (let k = 0; k < node.children.length; k++) {
            const child = node.children[k]
            if (child.text) {
              text += child.text
            } else {
              text += child.children[0].text
            }
          }
          nodes[i] = {
            type: 'text',
            text
          }
          if (key && (key instanceof RegExp ? key.test(text) : text.includes(key))) {
            i--
          } else {
            obj[`${path}[${i}]`] = nodes[i]
          }
        } else if (node.children) {
          stack.push({
            path: `${path}[${i}].c`,
            c: node.c || node.name === 'table'
          })
          traversal(node.children, `${path}[${i}].children`)
          stack.pop()
        }
      }
    })(vm.data.nodes, 'nodes')

    return new Promise(function (resolve) {
      vm.setData(obj, () => {
        resolve({
          num: res.length, // 结果数量
          /**
           * @description 高亮某一个结果
           * @param {number} i 第几个
           * @param {string} hlstyle 高亮的样式
           */
          highlight (i, hlstyle = 'background-color:#FF9632') {
            if (i < 1 || i > res.length) return
            const obj = {}
            if (this.last) {
              obj[res[this.last - 1]] = style
            }
            this.last = i
            obj[res[i - 1]] = hlstyle
            vm.setData(obj)
          },
          /**
           * @description 跳转到搜索结果
           * @param {number} i 第几个
           * @param {number} offset 偏移量
           */
          jump: anchor
            ? (i, offset) => {
                if (i > 0 && i <= res.length) {
                  vm.navigateTo('search' + i, offset)
                }
              }
            : undefined
        })
      })
    })
  }
}

module.exports = Search
