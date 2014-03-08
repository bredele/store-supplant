var Supplant = require('supplant');

/**
 * Expose 'store-supplant'
 */

module.exports = function(ctx) {

  var supplant = new Supplant();

	ctx.supplant = function(name) {
		return supplant.text(name, this.data);
	};

	ctx.filter = function() {

	};
};