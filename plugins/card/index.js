/**
 * @fileoverview Card 插件
 */
let index = 0

function Card (vm) {
  this.vm = vm
}

Card.prototype.onUpdate = function () {
  this.cards = []
}

Card.prototype.onParse = function (node) {
  if (node.name === 'card') {
    node.attrs.mode = this.vm.editable? 0: 1;
  }
}

Card.prototype.onLoad = function () {
    
}

module.exports = Card
