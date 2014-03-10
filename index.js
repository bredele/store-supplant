var Supplant = require('supplant');

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
			var props = supplant.props(str),
			l = props.length;
			while(l--) {
				ctx.on('change ' + props[l], function(val) {
					fn(supplant.text(str, ctx.data));
				});
			}
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
			for(var i in name) {
				this.filter(i, name[i]);
			}
		} else {
			supplant.filter(name, fn)
		}
		return this;
	};
};