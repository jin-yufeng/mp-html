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
    const res = []
    const stack = [];

    // 遍历搜索
    (function traversal (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if (node.type === 'text' && key) {
          const text = node.text
          const arr = text.split(key)
          if (arr.length > 1) {
            node = {
              name: 'span',
              attrs: {},
              type: 'node',
              c: anchor ? 1 : undefined,
              s: 1,
              children: []
            }
            vm.$set(nodes, i, node)
            for (let j = 0; j < arr.length; j++) {
              if (arr[j]) {
                node.children.push({
                  type: 'text',
                  text: arr[j]
                })
              }
              if (j !== arr.length - 1) {
                // 关键词转为一个 span
                node.children.push({
                  name: 'span',
                  attrs: {
                    id: anchor ? 'search' + (res.length + 1) : undefined, // 用于锚点的 id
                    style: style
                  },
                  children: [{
                    type: 'text',
                    text: key instanceof RegExp ? key.exec(text)[0] : key
                  }]
                })
                res.push(node.children[node.children.length - 1].attrs)
              }
            }
            if (key instanceof RegExp) {
              key.exec(text)
            }
            if (anchor) {
              for (let l = stack.length; l--;) {
                if (stack[l].c) {
                  break
                } else {
                  vm.$set(stack[l], 'c', 1)
                }
              }
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
          vm.$set(nodes, i, {
            type: 'text',
            text
          })
          if (key && (key instanceof RegExp ? key.test(text) : text.includes(key))) {
            i--
          }
        } else if (node.children) {
          stack.push(node)
          traversal(node.children)
          stack.pop()
        }
      }
    })(vm.nodes)

    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve({
          num: res.length, // 结果数量
          /**
           * @description 高亮某一个结果
           * @param {number} i 第几个
           * @param {string} hlstyle 高亮的样式
           */
          highlight (i, hlstyle = 'background-color:#FF9632') {
            if (i < 1 || i > res.length) return
            if (this.last) {
              res[this.last - 1].style = style
            }
            this.last = i
            res[i - 1].style = hlstyle
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
      }, 200)
    })
  }
}

module.exports = Search
