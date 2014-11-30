/**
 * @author Anthony Pigeot - http://anthonypigeot.com
 */

var SMath = function() {

// Constants
	var RAD2DEG = 180 / Math.PI;
	var DEG2RAD = Math.PI / 180;
	var PI2 = Math.PI * 2;

	var sMath = {};

// Cos and sin caches
	this.cosTable = new Float32Array(360);
	this.sinTable = new Float32Array(360);

// Fill the caches
	for (var i = 0; i < 360; i++) {
    var angle = i * DEG2RAD;
		this.cosTable[i] = Math.cos(angle);
		this.sinTable[i] = Math.sin(angle);
	}

	this.cos = function (angle) {
		angle %= PI2;
		if (angle < 0) angle += PI2;

		angle = angle * RAD2DEG;
		return this.cosTable[angle | 0];
	};
	this.sin = function (angle) {
		angle %= PI2;
		if (angle < 0) angle += PI2;

		angle = angle * RAD2DEG;
		return this.sinTable[angle | 0];
	};
};