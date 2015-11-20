var test = require('ava');
var FMath = require('..');

test.skip(`FMath.DEFAULT_PARAMS = ${JSON.stringify(FMath.DEFAULT_PARAMS)}`, function () {});

// Test with the default resolution (360 for everything)
var fMathDefault = new FMath();
test(`new FMath().params.nbSin = ${FMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(fMathDefault.params.nbSin, FMath.DEFAULT_PARAMS.resolution);
	t.end();
});

test(`new FMath().params.nbCos = ${FMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(fMathDefault.params.nbCos, FMath.DEFAULT_PARAMS.resolution);
	t.end();
});

test(`new FMath().params.nbAtan = ${FMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(fMathDefault.params.nbAtan, FMath.DEFAULT_PARAMS.resolution);
	t.end();
});

// Test with a different sin value. cos & tan should be 360, sin should be 720
var fMath720 = new FMath({
	resolution: 360,
	nbSin: 720
});
test(`new FMath({resolution: 360,nbSin: 720}).params.nbCos = ${FMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(fMath720.params.nbCos, FMath.DEFAULT_PARAMS.resolution);
	t.end();
});
test(`new FMath({resolution: 360,nbSin: 720}).params.nbSin = 720`, function (t) {
	t.is(fMath720.params.nbSin, 720);
	t.end();
});