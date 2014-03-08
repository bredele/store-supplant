var Supplant = require('supplant'),
		each = require('each');

/**
 * Expose 'store-supplant'
 */

module.exports = function(ctx) {

  var supplant = new Supplant();

	ctx.supplant = function(str, fn) {
		if(fn) {
			each(supplant.props(str), function(key, prop) {
				ctx.on('change ' + prop, function(val) {
					fn(supplant.text(str, ctx.data));
				});
			});
		}
		return supplant.text(str, this.data);
	};

	ctx.filter = function(name, fn) {
		if(typeof name !== 'string') {
			each(name, this.filter, this);
		} else {
			supplant.filter(name, fn)
		}
		return this;
	};
};