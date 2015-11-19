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
	var PI2 = Math.PI * 2;

	SMath.DEFAULT_PARAMS = {nbSin: 360, nbCos: 360};

	/**
	 * SMath constructor
	 * @param {Object} params - passed to the constructor
	 * @param {number} params.nbSin - # of cached values for SMath#sin (default: 360)
	 * @param {number} params.nbCos - # of cached values for SMath#cos (default: 360)
	 */
	function SMath (params) {
		this.params = SMath._assign(null, SMath.DEFAULT_PARAMS, params);

		this.cosTable = new Float32Array(this.params.nbCos);
		this.cosFactor = this.params.nbCos / PI2;
		SMath._fillCache(this.cosTable, this.cosFactor, Math.cos);

		this.sinTable = new Float32Array(this.params.nbSin);
		this.sinFactor = this.params.nbSin / PI2;
		SMath._fillCache(this.sinTable, this.sinFactor, Math.sin);
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

	SMath._fillCache = function (array, factor, mathFunction) {
		var length = array.length;
		for (var i = 0; i < length; i++) {
			array[i] = mathFunction(i / factor);
		}
	};

	SMath._assign = function (dst, src1, src2, etc) {
		return [].reduce.call(arguments, function (dst, src) {
			src = src || {};
			for (var k in src) {
				if (src.hasOwnProperty(k)) {
					dst[k] = src[k];
				}
			}
			return dst;
		}, dst || {});
	};

	return SMath;
}));
