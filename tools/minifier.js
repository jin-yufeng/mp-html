const uglify = require('uglify-js')
const through2 = require('through2')

/**
 * @description 压缩内联 wxs 脚本
 */
function wxs () {
  return through2.obj(function (file, _, callback) {
    if (file.isBuffer()) {
      file.contents = Buffer.from(file.contents.toString().replace(/<wxs(.*?)>([\s\S]+?)<\/wxs>/, (_, $1, $2) => {
        return `<wxs${$1}>${uglify.minify($2, {
          fromString: true,
          mangle: {
            toplevel: true
          }
        }).code}</wxs>`
      }))
    }
    this.push(file)
    callback()
  })
}

/**
 * @description 压缩 json 文件
 */
function json () {
  return through2.obj(function (file, _, callback) {
    if (file.isBuffer()) {
      file.contents = Buffer.from(JSON.stringify(JSON.parse(file.contents.toString())))
    }
    this.push(file)
    callback()
  })
}

module.exports = {
  wxs,
  json
}
