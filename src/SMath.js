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
	this.NB_DEFAULT_VALUES = 3600;
	
	var sMath = {};
	
	// We create cos functions and array only if no params has been passed or nbCos has been specified
	if (!params || (params && params.nbCos)){
		this.cosTable = new Float32Array(params && params.nbCos ?  params.nbCos : this.NB_DEFAULT_VALUES);
		this.fillCache(this.cosTable);
		SMath.prototype.cos = function (angle) {
			angle %= this.PI2;
			if (angle < 0) 
				angle += this.PI2;
			angle = angle * this.RAD2DEG;
			return this.cosTable[angle | 0];
		};
	}

	if (params && params.nbSin){
		this.sinTable = new Float32Array(params.nbSin);
		this.fillCache(this.sinTable);
		SMath.prototype.sin = function (angle) {
			angle %= this.PI2;
			if (angle < 0) 
				angle += this.PI2;
			angle = angle * this.RAD2DEG;
			return this.sinTable[angle | 0];
		};
	}
};

SMath.prototype.fillCache = function(array){
	console.log(array.length)
	for (var i = array.length -1; i >= 0 ; i--) {
		this.cosTable[i] = Math.cos(i * this.DEG2RAD);
	}
}

