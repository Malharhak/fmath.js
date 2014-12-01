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
	this.NB_DEFAULT_VALUES = 360;
	
	// We create cos functions and array only if no params has been passed or nbCos has been specified
	if (!params || (params && params.nbCos)){
		this.cosTable = new Float32Array(params && params.nbCos ?  params.nbCos : this.NB_DEFAULT_VALUES);
		this.fillCache(this.cosTable, Math.cos);
		SMath.prototype.cos = function (angle) {
			return this.cosTable[(angle * this.cosTable.length / this.PI2) | 0];
		};
	}

	if (params && params.nbSin){
		this.sinTable = new Float32Array(params.nbSin);
		this.fillCache(this.sinTable, Math.sin);
		SMath.prototype.sin = function (angle) {
			return this.sinTable[(angle * this.sinTable.length / this.PI2) | 0];
		};
	}
};

SMath.prototype.fillCache = function(array,mathFunction){
	var length = array.length;
	for (var i = 0 ; i < this.PI2 ; i += this.PI2 / length) {
		array[(i * length / this.PI2) | 0] = mathFunction(i);
	}
}
	
