var contextify = require('./contextify').contextify;

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

eval(contextify(obj));
console.log(a, b, c, d, e, f(), g);
