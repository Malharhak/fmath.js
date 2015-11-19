var test = require('ava');
var SMath = require('..');

var PI_2 = Math.PI * 2;

var NUM_ANGLES_TO_TEST = 10000;
var MAX_TEST_ANGLE_RAD = 200;
var angles = [];
for (var i = 0; i < NUM_ANGLES_TO_TEST; i++) angles.push(MAX_TEST_ANGLE_RAD*2*(Math.random() - .5));

function closeEnough (a, b, epsilon) {
	return Math.abs(a - b) < epsilon;
}

[
	null, // use default params, accurate
	{nbSin: 1,  nbCos: 1}, // cache only one possible value, pretty much useless due to lack of accuracy
	{nbSin: 30, nbCos: 30}, // a little better but still very inaccurate
	{nbSin: 180, nbCos: 180}, // a bit less accurate than default
	{nbSin: 4320, nbCos: 4320}, // extremely accurate
].forEach(function (params) {
	var sMath = new SMath(params);

	var sinEpsilon = PI_2 / sMath.params.nbSin;
	test(`SMath#sin = Math.sin ±${sinEpsilon.toPrecision(3)} (nbSin ${params ? sMath.params.nbSin : "default"})`, function (t) {
		angles.forEach(function (angle) {
			t.ok(closeEnough(Math.sin(angle), sMath.sin(angle), sinEpsilon));
		});
		t.end();
	});

	var cosEpsilon = PI_2 / sMath.params.nbCos;
	test(`SMath#cos = Math.cos ±${cosEpsilon.toPrecision(3)} (nbCos ${params ? sMath.params.nbCos : "default"})`, function (t) {
		angles.forEach(function (angle) {
			t.ok(closeEnough(Math.cos(angle), sMath.cos(angle), cosEpsilon));
		});
		t.end();
	});
});
