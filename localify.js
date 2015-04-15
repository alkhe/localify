module.exports = function(o) {
	eval((function() {
		var src = '';
		for (var prop in o) {
			if (o.hasOwnProperty(prop)) {
				src += 'var ' + prop + '=o[\'' + prop + '\'];';
			}
		}
		return src;
	})());
	return function() {
		return arguments[0] instanceof Function ? arguments[0]() : eval(arguments[0]);
	}
};

{
	var serialize = function(o) {
		var str = '';
		switch (typeof o) {
			case 'string':
				str += JSON.stringify(o);
				break;
			case 'number':
			case 'boolean':
			case 'undefined':
			case 'function':
				str += o;
				break;
			case 'object':
				if (!o || o instanceof RegExp) {
					str += o;
				}
				else if (o instanceof Date) {
					str += 'new Date(' + o + ')';
				}
				else if (o instanceof Array) {
					str += '[' + arrayToSource(o) + ']';
				}
				else {
					str += '{' + objectToSource(o) + '}';
				}
				break;
		}
		return str;
	}

	var arrayToSource = function(o) {
		var str = '';
		for (var prop in o) {
			if (o.hasOwnProperty(prop)) {
				str += serialize(o[prop]) + ',';
			}
		}
		return str;
	};

	var objectToSource = function(o) {
		var str = '';
		for (var prop in o) {
			if (o.hasOwnProperty(prop)) {
				str += prop + ':' + serialize(o[prop]) + ',';
			}
		}
		return str;
	};

	var toSource = function(o) {
		var str = '';
		for (var prop in o) {
			if (o.hasOwnProperty(prop)) {
				str += 'var ' + prop + '=' + serialize(o[prop]) + ';';
			}
		}
		return str;
	};

	module.exports.legacy = {
		context: toSource,
		serialize: serialize
	};
}
