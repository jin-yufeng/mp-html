/*
  search 扩展包
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
*/
module.exports = function(component, args = {}) {
	args.style = args.style || 'background-color:yellow';
	var res = [];
	// #ifdef H5
	(function f(nodes) {
		for (var i = 0, n; n = nodes[i]; i++) {
			if (n.nodeName == '#text' && args.key) {
				let text = n.textContent,
					arr = text.split(args.key);
				if (arr.length > 1) {
					var tag = document.createElement('span');
					tag.s = 1;
					n.parentNode.replaceChild(tag, n);
					for (var j = 0; j < arr.length; j++) {
						if (arr[j]) tag.appendChild(document.createTextNode(arr[j]));
						if (j != arr.length - 1) {
							var node = document.createElement('span');
							if (args.anchor) node.setAttribute('id', 'search' + (res.length + 1))
							node.setAttribute('style', args.style);
							node.appendChild(document.createTextNode(args.key instanceof RegExp ? args.key.exec(text)[0] : args.key))
							tag.appendChild(node);
							res.push(node);
						}
					}
					if (args.key instanceof RegExp) args.key.exec(text);
				}
			} else if (n.s) {
				let text = '';
				for (var k = 0, m; m = n.childNodes[k]; k++) {
					if (m.textContent) text += m.textContent;
					else text += m.childNodes[0].textContent;
				}
				n.parentNode.replaceChild(document.createTextNode(text), n);
				if (args.key && (args.key instanceof RegExp ? args.key.test(text) : text.includes(args.key))) i--;
			} else if (n.childNodes) f(n.childNodes);
		}
	})(component.document.childNodes[0].childNodes);
	// #endif
	// #ifndef H5 || APP-PLUS-NVUE
	var stack = [];
	(function f(nodes) {
		for (var i = 0, n; n = nodes[i]; i++) {
			if (n.type == 'text' && args.key) {
				var text = n.text,
					arr = text.split(args.key);
				if (arr.length > 1) {
					n = {
						name: 'span',
						attrs: {},
						type: 'node',
						c: args.anchor ? 1 : void 0,
						s: 1,
						children: []
					}
					component.$set(nodes, i, n);
					for (var j = 0; j < arr.length; j++) {
						if (arr[j]) n.children.push({
							type: 'text',
							text: arr[j]
						})
						if (j != arr.length - 1) {
							n.children.push({
								name: 'span',
								attrs: {
									id: args.anchor ? 'search' + (res.length + 1) : void 0,
									style: args.style
								},
								children: [{
									type: 'text',
									text: args.key instanceof RegExp ? args.key.exec(text)[0] : args.key
								}]
							})
							res.push(n.children[n.children.length - 1].attrs);
						}
					}
					if (args.key instanceof RegExp) args.key.exec(text);
					if (args.anchor) {
						for (var l = stack.length; l--;)
							if (stack[l].c) break;
							else component.$set(stack[l], 'c', 1);
					}
				}
			} else if (n.s) {
				let text = '';
				for (var k = 0, m; m = n.children[k]; k++) {
					if (m.text) text += m.text;
					else text += m.children[0].text;
				}
				component.$set(nodes, i, {
					type: 'text',
					text
				})
				if (args.key && (args.key instanceof RegExp ? args.key.test(text) : text.includes(args.key))) i--;
			} else if (n.children) {
				stack.push(n);
				f(n.children);
				stack.pop();
			}
		}
	})(component.nodes);
	setTimeout(() => {
		// #endif
		args.success && args.success({
			num: res.length,
			highlight(i, hlstyle = 'background-color:#FF9632') {
				if (i < 1 || i > res.length) return;
				if (this.last) res[this.last - 1].style = args.style;
				this.last = i;
				res[i - 1].style = hlstyle;
			},
			jump: args.anchor ? (i, offset) => {
				if (i > 0 && i <= res.length)
					component.navigateTo({
						id: 'search' + i,
						offset
					})
			} : void 0
		})
		// #ifndef H5 || APP-PLUS-NVUE
	}, 200)
	// #endif
}
