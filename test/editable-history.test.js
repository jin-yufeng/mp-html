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

describe.each(['miniprogram', 'uni-app'])('%s editable history', type => {
  let editor, plugin
  beforeEach(() => {
    jest.useFakeTimers()
    const config = require('../plugins/editable/config')
    const Editable = loadSource('plugins/editable/' + type + '/index.js', { './config': config, '../parser': function () {} })
    const data = { first: 'before A', second: 'before B', count: 0, nodes: [] }
    editor = type === 'miniprogram'
      ? { data, setData: patch => Object.assign(data, patch) }
      : Object.assign(data, { $set: (target, key, value) => { target[key] = value } })
    plugin = new Editable(editor)
  })
  afterEach(() => jest.useRealTimers())
  function state () { return type === 'miniprogram' ? editor.data : editor }
  function move (action, times = 1) {
    for (let i = 0; i < times; i++) editor[action]()
    jest.runAllTimers()
  }
  test('restores edits to different paths after undo and redo', () => {
    editor._editVal('first', 'before A', 'after A', true)
    editor._editVal('second', 'before B', 'after B', true)
    move('undo', 2)
    expect([state().first, state().second]).toEqual(['before A', 'before B'])
    move('redo', 2)
    expect([state().first, state().second]).toEqual(['after A', 'after B'])
  })
  test('undo restores the latest value after the capacity is exceeded', () => {
    for (let i = 1; i <= 40; i++) editor._editVal('count', i - 1, i, true)
    move('undo')
    expect(state().count).toBe(39)
    move('redo')
    expect(state().count).toBe(40)
  })
  test('retains the most recent thirty operations', () => {
    for (let i = 1; i <= 40; i++) editor._editVal('count', i - 1, i, true)
    move('undo', 30)
    expect(state().count).toBe(10)
    move('undo')
    expect(state().count).toBe(10)
    move('redo', 30)
    expect(state().count).toBe(40)
    expect(plugin.editHistory.length).toBeLessThanOrEqual(30)
  })
  test('new edits after undo discard the redo branch', () => {
    editor._editVal('first', 'before A', 'after A', true)
    editor._editVal('second', 'before B', 'after B', true)
    move('undo')
    editor._editVal('second', 'before B', 'new B', true)
    move('redo')
    expect(state().second).toBe('new B')
    move('undo', 2)
    expect([state().first, state().second]).toEqual(['before A', 'before B'])
    move('redo', 2)
    expect([state().first, state().second]).toEqual(['after A', 'new B'])
  })
  test('empty history and redo at the end do nothing', () => {
    move('undo'); move('redo')
    expect(state().first).toBe('before A')
    editor._editVal('first', 'before A', 'after A', true)
    move('redo')
    expect(state().first).toBe('after A')
  })
  test('keeps consecutive input values before the view update is committed', () => {
    editor._editVal('first', 'before A', 'a')
    editor._editVal('first', 'before A', 'ab')
    state().first = 'ab'
    move('undo')
    expect(state().first).toBe('a')
    move('undo')
    expect(state().first).toBe('before A')
    move('redo', 2)
    expect(state().first).toBe('ab')
  })
  test('records edits whose view update was already applied', () => {
    state().first = 'after A'
    editor._editVal('first', 'before A', 'after A')
    move('undo')
    expect(state().first).toBe('before A')
    move('redo')
    expect(state().first).toBe('after A')
  })
})
