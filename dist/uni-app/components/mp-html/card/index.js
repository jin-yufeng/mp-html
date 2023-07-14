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
  // if (node.name === 'card') {
  //   if (!node.attrs.oid) {
  //     node.attrs.oid = 'a' + index++
  //   }
  //   this.cards.push(node.attrs.oid)
  // }
}

Card.prototype.onLoad = function () {
  // setTimeout(() => {
  //   for (let i = 0; i < this.cards.length; i++) {
  //     const ctx = context.get(this.cards[i])
  //     ctx.id = this.cards[i]
  //     this.vm._cards.push(ctx)
  //   }
  // }, 500)
}

export default Card
