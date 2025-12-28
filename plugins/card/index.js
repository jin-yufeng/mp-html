/**
 * @fileoverview Card 插件
 */
function Card (vm) {
}

Card.prototype.onParse = function (node, vm) {
  if (node.name === 'card') {
    vm.expose()
  }
}

module.exports = Card
