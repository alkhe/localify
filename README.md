# localify

Localify allows you to run arbitrary code with the shallow properties of the object copied into the scope. It can be thought of as a `with` statement that copies the object. It also provides a serialize function, which is similar to JSON.stringify, but also parses functions.

## Context

Node
```js
var localify = require('localify');
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
