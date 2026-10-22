const fs = require('fs')
const path = require('path')
const vm = require('vm')

const root = path.resolve(__dirname, '..')
const platform = {
  canIUse: () => true,
  getWindowInfo: () => ({ windowWidth: 375 }),
  getDeviceInfo: () => ({ system: 'fixture' })
}

// Execute the source modules without building or loading a platform runtime.
function loadSource (file, imports = {}) {
  const filename = path.join(root, file)
  const source = fs.readFileSync(filename, 'utf8').replace('export default Parser', 'module.exports = Parser')
  const module = { exports: {} }
  vm.runInNewContext(source, {
    module,
    exports: module.exports,
    require: id => {
      if (!(id in imports)) throw Error('Unexpected import: ' + id)
      return imports[id]
    },
    wx: platform,
    uni: platform,
    setTimeout
  }, { filename })
  return module.exports
}

const parsers = [
  ['miniprogram', 'src/miniprogram/parser.js'],
  ['uni-app', 'src/uni-app/components/mp-html/parser.js']
]

describe.each(parsers)('%s numeric entities', (name, file) => {
  const Parser = loadSource(file)
  function parse (html) {
    return new Parser({ properties: {}, tagStyle: {}, nodes: [] }).parse(html)
  }
  test.each([
    ['decimal emoji', '&#128512;', '😀'],
    ['hexadecimal emoji', '&#x1F600;', '😀'],
    ['supplementary Chinese', '&#131072;', '𠀀'],
    ['first supplementary point', '&#65536;', String.fromCodePoint(0x10000)],
    ['last Unicode point', '&#1114111;', String.fromCodePoint(0x10ffff)],
    ['BMP Chinese', '&#20013;', '中'],
    ['BMP hex', '&#x4E2D;', '中'],
    ['plain emoji', '😀', '😀']
  ])('%s survives text parsing', (_, input, expected) => {
    expect(parse('<p>before ' + input + ' after</p>')[0].children[0].text).toBe('before ' + expected + ' after')
  })
  test('decodes an entity in a link attribute', () => {
    expect(parse('<a href="https://example.com/&#x1F600;">fixture</a>')[0].attrs.href).toBe('https://example.com/😀')
  })
})
