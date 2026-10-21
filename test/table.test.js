/**
 * @fileoverview 合并单元格中的行内内容回归测试
 */
const simulate = require('miniprogram-simulate')
const path = require('path')
const fs = require('fs')

wx.getWindowInfo = () => ({ windowWidth: 375 })
wx.getDeviceInfo = () => ({ system: 'iOS 17' })

const Parser = require('../dev/mp-weixin/components/mp-html/parser')
const mpHtml = simulate.load(path.resolve(__dirname, '../dev/mp-weixin/components/mp-html/index'), 'mp-html')

function parse (html) {
  return new Parser({ properties: {} }).parse(html)[0]
}

function declaration (node, name) {
  const declarations = (node.attrs.style || '').split(';')
  const match = declarations.filter(item => item.split(':')[0].trim() === name).pop()
  return match && match.split(':')[1].trim()
}

test.each([
  ['top', 'left', undefined],
  ['middle', 'center', 'center'],
  ['bottom', 'right', 'flex-end']
])('grid cell keeps inline flow with %s / %s alignment', (vertical, horizontal, alignment) => {
  const table = parse(`<table><tr><td colspan="2" style="vertical-align:${vertical};text-align:${horizontal}">Before <a href="https://example.com">link</a> after</td></tr></table>`)
  const cell = table.children[0]
  expect(declaration(table, 'display')).toBe('grid')
  expect(declaration(cell, 'justify-content')).toBe(alignment)
  expect(declaration(cell, 'text-align')).toBe(horizontal)
  // Only the content container participates in flex layout; the text and link share normal flow.
  expect(cell.children).toHaveLength(1)
  const content = cell.children[0]
  expect(content.c).toBe(1)
  expect(content.children.map(node => node.text || node.name)).toEqual(['Before ', 'a', ' after'])
  expect(content.children[1].attrs.href).toBe('https://example.com')
})

test('rowspan cell preserves paragraphs and grid placement', () => {
  const table = parse('<table><tr><td rowspan="2"><p>First <a href="https://example.com">link</a></p><p>Second</p></td><td>Top</td></tr><tr><td>Bottom</td></tr></table>')
  const cell = table.children[0]
  expect(declaration(cell, 'grid-row-start')).toBe('1')
  expect(declaration(cell, 'grid-row-end')).toBe('3')
  expect(cell.children).toHaveLength(1)
  expect(cell.children[0].children.map(node => node.name)).toEqual(['p', 'p'])
  expect(table.children).toHaveLength(3)
})

test('ordinary table does not receive an extra grid content container', () => {
  const table = parse('<table><tr><td>Before <a href="https://example.com">link</a> after</td></tr></table>')
  expect(declaration(table, 'display')).toBe('table')
  expect(table.children[0].children[0].children.map(node => node.text || node.name)).toEqual(['Before ', 'a', ' after'])
})

test('link inside grid content still emits linktap', async () => {
  const comp = simulate.render(mpHtml)
  comp.instance.setContent(fs.readFileSync(path.join(__dirname, 'fixtures/grid-table-inline.html'), 'utf8'))
  await simulate.sleep(50)
  const root = comp.querySelector('#_root')
  root.triggerLifeTime('attached')
  comp.instance._add({ detail: root.instance })
  comp.setData({ copyLink: false })
  const events = []
  comp.addEventListener('linktap', event => events.push(event.detail.href))
  function findLink (nodes, prefix = '') {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].name === 'a') return prefix + i
      const found = findLink(nodes[i].children || [], prefix + i + '_')
      if (found) return found
    }
  }
  root.instance.linkTap({ currentTarget: { dataset: { i: findLink(comp.instance.data.nodes) } } })
  expect(events).toEqual(['https://example.com'])
})
