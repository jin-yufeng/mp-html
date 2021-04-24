const ctx = {}

module.exports = {
  get: id => ctx[id],
  set: (id, vm) => { ctx[id] = vm },
  remove: id => { ctx[id] = undefined }
}
