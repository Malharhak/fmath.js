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

	SMath.DEFAULT_PARAMS = {
		resolution: 360,
		minAtan: -40,
		maxAtan: 40
	};

	/**
	 * SMath constructor
	 * @param {Object} params - passed to the constructor
	 * @param {number} [params.resolution] - # of cached values for any function. Is overriden by optional specific values
	 * @param {number} [params.nbSin] - # of cached values for SMath#sin (defaults to the resolution)
	 * @param {number} [params.nbCos] - # of cached values for SMath#cos (defaults to the resolution)
	 * @param {number} [params.nbAtan] - # of caches values for SMath#atan (defaults to the resolution)
	 * @param {number} [params.minAtan] - Minimal value for the caching of atan (default: -20) - If asking a lower value, will return the lowest known
	 * @param {number} [params.maxAtan] - Maximal value for the caching of atan (default: 20) - If asking ahigher value, will return the highest known
	 */
	function SMath (params) {
		this.params = SMath._assign(null, SMath.DEFAULT_PARAMS, params);
		SMath._setDefaultValues(this.params);

		this.cosTable = new Float32Array(this.params.nbCos);
		this.cosFactor = this.params.nbCos / PI2;
		SMath._fillCache(this.cosTable, this.cosFactor, Math.cos);

		this.sinTable = new Float32Array(this.params.nbSin);
		this.sinFactor = this.params.nbSin / PI2;
		SMath._fillCache(this.sinTable, this.sinFactor, Math.sin);

		this.atanTable = new Float32Array(this.params.nbAtan);
		this.atanFactor = this.params.nbAtan / (this.params.maxAtan - this.params.minAtan)
		SMath._fillAtanCache(this.atanTable, this.atanFactor, this.params.minAtan);
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
	SMath.prototype.atan = function (tan) {
		var index = ((tan - this.params.minAtan) * this.atanFactor) | 0;
		if (index < 0) {
			return - Math.PI / 2;
		} else if (index >= this.params.nbAtan) {
			return Math.PI / 2;
		}
		return this.atanTable[index];
	};

	SMath._setDefaultValues = function (params) {
		var functionNames = ["nbSin", "nbCos", "nbAtan"];
		for (var i = functionNames.length - 1; i >= 0; i--) {
			var key = functionNames[i];
			params[key] = params[key] || params.resolution;
		}
	};

	SMath._fillAtanCache = function (array, factor, min) {
		for (var i = 0; i < array.length; i++) {
			var tan = min + i / factor;
			array[i] = Math.atan(tan);
		}
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
