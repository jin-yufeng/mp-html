const data = {
  name: 'imgcache',
  prefix: 'imgcache_'
}
function ImgCache (vm) {
  this.vm = vm // 保存实例在其他周期使用
  this.i = 0 // 用于标记第几张图
  vm.imgCache = {
    get list () {
      return uni
        .getStorageInfoSync()
        .keys.filter((key) => key.startsWith(data.prefix))
        .map((key) => key.split(data.prefix)[1])
    },
    get (url) {
      return uni.getStorageSync(data.prefix + url)
    },
    delete (url) {
      const path = uni.getStorageSync(data.prefix + url)
      if (!path) return false
      plus.io.resolveLocalFileSystemURL(path, (entry) => {
        entry.remove()
      })
      uni.removeStorageSync(data.prefix + url)
      return true
    },
    async add (url) {
      const filename = await download(url)
      if (filename) {
        uni.setStorageSync(data.prefix + url, filename)
        return 'file://' + plus.io.convertLocalFileSystemURL(filename)
      }
      return null
    },
    clear () {
      uni
        .getStorageInfoSync()
        .keys.filter((key) => key.startsWith(data.prefix))
        .forEach((key) => {
          uni.removeStorageSync(key)
        })

      plus.io.resolveLocalFileSystemURL(`_doc/${data.name}/`, (entry) => {
        entry.removeRecursively(
          (entry) => {
            console.log(`${data.name}缓存删除成功`, entry)
          },
          (e) => {
            console.log(`${data.name}缓存删除失败`, e)
          }
        )
      })
    }
  }
}

// #ifdef APP-PLUS
ImgCache.prototype.onParse = function (node, parser) {
  // 启用本插件 && 解析图片标签 && 拥有src属性 && 是网络图片
  if (
    this.vm.ImgCache &&
    node.name === 'img' &&
    node.attrs.src &&
    /^https?:\/\//.test(node.attrs.src)
  ) {
    const src = node.attrs.src
    node.attrs.src = ''
    node.attrs.i = this.vm.imgList.length + this.i++
    parser.expose()

    async function getUrl (path) {
      if (await resolveFile(path)) return path
      const filename = await download(src)
      filename && uni.setStorageSync(data.prefix + src, filename)
      return filename
    }

    uni.getStorage({
      key: data.prefix + src,
      success: async (res) => {
        const path = await getUrl(res.data)
        const url = path
          ? 'file://' + plus.io.convertLocalFileSystemURL(path)
          : src
        node.attrs.src = url
        this.vm.imgList[node.attrs.i] = path || src
      },
      fail: async () => {
        const path = await getUrl()
        const url = path
          ? 'file://' + plus.io.convertLocalFileSystemURL(path)
          : src
        node.attrs.src = url
        this.vm.imgList[node.attrs.i] = path || src
      }
    })
  }
}

const taskQueue = new Set()

function download (url) {
  return new Promise((resolve) => {
    if (taskQueue.has(url)) return
    taskQueue.add(url)
    const suffix = /.+\.(jpg|jpeg|png|bmp|gif|webp)/.exec(url)
    const name = `${makeid(8)}_${Date.now()}${suffix ? '.' + suffix[1] : ''}`
    const task = plus.downloader.createDownload(
      url,
      { filename: `_doc/${data.name}/${name}` },
      (download, status) => {
        taskQueue.delete(url)
        resolve(status === 200 ? download.filename : null)
      }
    )
    task.start()
  })
}

// 判断文件存在
function resolveFile (url) {
  return new Promise((resolve) => {
    plus.io.resolveLocalFileSystemURL(url, resolve, () => resolve(null))
  })
}

// 生成uuid
function makeid (length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
// #endif

module.exports = ImgCache
