'use strict';

(function (_, plugin) {
	var _private = {
		'registerMixin' : function (_) {
			plugin.mixin[plugin.name] = plugin.fn;
			_.mixin(plugin.mixin);
		}
	};

	if (_) { // Global underscore.js
		plugin.fn = plugin.factory(_);
		plugin.mixin = {};
	}

	if (typeof exports !== 'undefined' && plugin.fn) { // CommonJS
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = plugin.fn;
		}

		exports[plugin.name] = plugin.fn;
	} else if (typeof define === 'function' && define.amd) { // AMD
		define(['underscore'], function (_) {
			plugin.fn = plugin.factory(_);

			_private.registerMixin(_);

			return plugin.fn;
		});
	} else if (!_) {
		/*
			underscore.js isn't defined and user is
			trying to use mixin directly without
			CommonJS or AMD support
		*/
		throw 'underscore.js not defined.';
	} else {
		_private.registerMixin(_);
	}
})(window._, {
	'name' : 'myMixin',
	'factory' : function (_) {
		return function () {
			// implementation
		};
	}
});