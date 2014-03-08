var Supplant = require('supplant'),
		each = require('each');

/**
 * Expose 'store-supplant'
 */

module.exports = function(ctx) {

  var supplant = new Supplant();

  /**
   * Variable substitution on strings.
   * 
   * @param  {String}   str 
   * @param  {Function} fn  optional
   * @return {String}
   */
  
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


	/**
	 * Add substitution filters.
	 * 
	 * @param  {String|Object}   name 
	 * @param  {Function} fn  
	 * @return {Store}  
	 */
	
	ctx.filter = function(name, fn) {
		if(typeof name !== 'string') {
			each(name, this.filter, this);
		} else {
			supplant.filter(name, fn)
		}
		return this;
	};
};