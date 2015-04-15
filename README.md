# localify

Localify allows you to run arbitrary code with the shallow properties of the object copied into the scope. It can be thought of as a `with` statement that copies the object. It runs very similarly to node's vm module, but works for the browser. This solution is much more efficient than vm-browserify's iframe method.

## VM

Node
```js
var VM = require('localify');
```

Common
```js
var obj = {
	a: 5,
	b: 's',
	c: true,
	d: null,
	e: undefined,
	f: function() {
		console.log(4);
		return 4;
	},
	g: [{
		a: 7,
		b: 8
	}, 6, 7]
};

var vm = new VM(obj);
```

These all do the same thing:
```js
console.log(vm('a'), vm('b'), vm('c'), vm('d'), vm('e'), vm('f()'), vm('g'));

vm('console.log(a, b, c, d, e, f(), g)');

vm(function() {
	console.log(a, b, c, d, e, f(), g);
});

// 4
// 5 's' true null undefined 4 [ { a: 7, b: 8 }, 6, 7 ]
// 4
// 5 's' true null undefined 4 [ { a: 7, b: 8 }, 6, 7 ]
// 4
// 5 's' true null undefined 4 [ { a: 7, b: 8 }, 6, 7 ]
```

## Legacy

This is the legacy version with the previous functionality, which also provides a serialize function, similar to JSON.stringify, but also parses functions.

```js
var local = VM.legacy;
```

## Context

```js
eval(local.context(obj));

console.log(a, b, c, d, e, f(), g);

// 4
// 5 's' true null undefined 4 [ { a: 7, b: 8 }, 6, 7 ]
```

## Serialize

```js
console.log(local.serialize(obj));

//{a:5,b:"s",c:true,d:null,e:undefined,f:function () {
//		console.log(4);
//		return 4;
//	},g:[{a:7,b:8,},6,7,],}
```
