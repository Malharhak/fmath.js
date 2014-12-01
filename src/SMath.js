/**
 * @author Anthony Pigeot - http://anthonypigeot.com
 * @contributor Bertrand Coizy - http://twitter.com/etribz
 */

/**
	SMath constructor
	@params: associative array, possible values:
	- nbCos: nb of apparoximative values (default:360)
	- nbSin: nb of apparoximative values (default:360)
	Note: if either sin or cos has been calculated, a default cosinus array will be created
	TODO: atan things
*/
var SMath = function(params) {
	// Constants
	this.RAD2DEG = 180 / Math.PI;
	this.DEG2RAD = Math.PI / 180;
	this.PI2 = Math.PI * 2;

	this.nbCos = params.nbCos || 360;
	this.nbSin = params.nbSin || 360;
	// We create cos functions and array only if no params has been passed or nbCos has been specified
	if (!params || (params && params.nbCos)){
		this.cosTable = new Float32Array(this.nbCos);
// The cos factor is the difference in radians between two lookup values
		this.cosFactor = this.nbCos / this.PI2;
		this.fillCache(this.cosTable, this.cosFactor, Math.cos);
		SMath.prototype.cos = function (angle) {
			angle %= this.PI2;
			if (angle < 0) angle += this.PI2;
			return this.cosTable[(angle * this.cosFactor) | 0];
		};
	}

	if (params && params.nbSin){
		this.sinTable = new Float32Array(this.nbSin);
		this.sinFactor = this.nbSin / this.PI2;
		this.fillCache(this.sinTable, this.sinFactor, Math.sin);
		SMath.prototype.sin = function (angle) {
			angle %= this.PI2;
			if (angle < 0) angle += this.PI2;
			return this.sinTable[(angle * this.sinFactor) | 0];
		};
	}
};

SMath.prototype.fillCache = function(array, factor, mathFunction){
	var length = array.length;
	for (var i = 0 ; i < length ; i += 1) {
		array[i] = mathFunction(i / factor);
	}
}

