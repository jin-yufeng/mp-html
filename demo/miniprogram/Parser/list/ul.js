// index/ul.js
Component({
  created() {
    this.floor = 1;
  },
  attached() {
    this.triggerEvent('addul', this, {
      bubbles: true,
      composed: true
    })
  },
  relations: {
    './li': {
      type: 'child'
    }
  },
  methods: {
    // 设置多层ul
    addul(e) {
      setTimeout(() => {
        e.detail.floor = ++this.floor;
        var lis = e.detail.getRelationNodes('./li');
        for (var li of lis) {
          li.setData({
            floor: e.detail.floor
          })
        }
      }, 10)
    }
  }
})