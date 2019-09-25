// index/li.js
Component({
  relations: {
    './ul': {
      type: 'parent'
    },
    './ol': {
      type: 'parent'
    }
  },
  data: {
    floor:1
  }
})
