var Supplant = require('supplant'),
		each = require('each');

/**
 * Expose 'store-supplant'
 */

module.exports = function(ctx) {

  var supplant = new Supplant();

	ctx.supplant = function(name, fn) {
		if(!fn) return supplant.text(name, this.data);
		each(supplant.props(name), function(key, prop) {
			ctx.on('change ' + prop, function(val) {
				fn(supplant.text(name, ctx.data));
			});
		});
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