// index/ol.js
Component({
  data: {
    // 不同type
    "A": ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    "a": ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "I": ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "IXX", "XX"],
    "i": ["", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "ixx", "xx"]
  },
  relations: {
    './li': {
      type: 'child',
      linked: function(target) {
        target.setData({
          type: "ol",
          num: this.data.type == "1" ? this.num++ : this.data[this.data.type][this.num++]
        })
      }
    }
  },
  properties: {
    'start': {
      type: Number,
      value: 1
    },
    'type': {
      type: String,
      value: "1"
    }
  },
  attached() {
    this.num = this.data.start;
    if (!this.num) this.num = 1;
    if (!this.data.type) this.data.type = "1";
  },
})