/**
 * @author Anthony Pigeot - http://anthonypigeot.com
 * @contributor Bertrand Coizy - http://twitter.com/etribz
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return (root.SMath = factory());
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.SMath = factory();
	}
}(this, function () {
	/**
		SMath constructor
		@params: associative array, possible values:
		- nbCos: nb of apparoximative values (default:360)
		- nbSin: nb of apparoximative values (default:360)
		Note: if either sin or cos has been calculated, a default cosine array will be created
		TODO: atan things
	*/
	var PI2 = Math.PI * 2;

	function SMath (params) {
		this.params = params = params || {};
		this.nbCos = params.nbCos || 360;
		this.nbSin = params.nbSin || 360;

		this.cosTable = new Float32Array(this.nbCos);
		this.cosFactor = this.nbCos / PI2;
		SMath.fillCache(this.cosTable, this.cosFactor, Math.cos);

		this.sinTable = new Float32Array(this.nbSin);
		this.sinFactor = this.nbSin / PI2;
		SMath.fillCache(this.sinTable, this.sinFactor, Math.sin);
	};
	SMath.prototype.cos = function (angle) {
		angle %= PI2;
		if (angle < 0) angle += PI2;
		return this.cosTable[(angle * this.cosFactor) | 0];
	};
	SMath.prototype.sin = function (angle) {
		angle %= PI2;
		if (angle < 0) angle += PI2;
		return this.sinTable[(angle * this.sinFactor) | 0];
	};

	SMath.fillCache = function (array, factor, mathFunction) {
		var length = array.length;
		for (var i = 0; i < length; i++) {
			array[i] = mathFunction(i / factor);
		}
	};

	return SMath;
}));
