const fs = require('fs')
const glob = require('glob')
const standard = require('standard')

// 解析参数
let fix = false
let mode = '**/*.@(js|vue)'
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--fix') {
    fix = true
  } else {
    mode = process.argv[i]
  }
}

// 检查 js 文件
function lintJs (filePath, content) {
  const res = standard.lintTextSync(content, {
    global: ['App', 'Page', 'Component', 'wx', 'requirePlugin', 'uni', 'test', 'expect', 'plus', 'Image'],
    fix
  }).results
  // 写回修复的内容
  if (fix && res[0].output) {
    fs.writeFileSync(filePath, res[0].output)
  }
  // 打印错误信息
  for (let i = 0; i < res[0].messages.length; i++) {
    const item = res[0].messages[i]
    console.log(filePath + ':' + item.line + ':' + item.column + ': ' + item.message)
  }
}

// 检查 vue 文件
function lintVue (filePath, content) {
  // 提取 script 部分
  const script = content.match(/<script>([\s\S]+?)<\/script>/)
  const line = content.substr(0, script.index).split('\n').length - 1
  const res = standard.lintTextSync(script[1], {
    global: ['uni', 'plus', 'weex'],
    fix
  }).results
  // 写回修复的内容
  if (fix && res[0].output) {
    fs.writeFileSync(filePath, content.replace(/<script>[\s\S]+?<\/script>/, '<script>' + res[0].output + '</script>'))
  }
  // 打印错误信息
  for (let i = 0; i < res[0].messages.length; i++) {
    const item = res[0].messages[i]
    console.log(filePath + ':' + (line + item.line) + ':' + item.column + ': ' + item.message)
  }
}

glob(mode, {
  ignore: ['node_modules/**', 'coverage/**', 'dist/**', 'dev/**', '**/*.min.js']
}, (_, files) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].includes('.js')) {
      lintJs(files[i], fs.readFileSync(files[i], 'utf-8'))
    } else if (files[i].includes('.vue')) {
      lintVue(files[i], fs.readFileSync(files[i], 'utf-8'))
    }
  }
})
