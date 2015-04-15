var VM = require('./'),
	local = VM.legacy;

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

var vm = new VM(obj);

console.log(vm('a'), vm('b'), vm('c'), vm('d'), vm('e'), vm('f()'), vm('g'));
vm('console.log(a, b, c, d, e, f(), g)');
vm(function() {
	console.log(a, b, c, d, e, f(), g);
});
