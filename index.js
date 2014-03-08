var Supplant = require('supplant'),
		each = require('each');

/**
 * Expose 'store-supplant'
 */

module.exports = function(ctx) {

  var supplant = new Supplant();

	ctx.supplant = function(name) {
		return supplant.text(name, this.data);
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