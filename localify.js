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

	var localify = module.exports = {
		context: toSource,
		serialize: serialize
	};
}
