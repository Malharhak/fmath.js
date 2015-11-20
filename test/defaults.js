var test = require('ava');
var SMath = require('..');

test.skip(`SMath.DEFAULT_PARAMS = ${JSON.stringify(SMath.DEFAULT_PARAMS)}`, function () {});

// Test with the default resolution (360 for everything)
var sMathDefault = new SMath();
test(`new SMath().params.nbSin = ${SMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(sMathDefault.params.nbSin, SMath.DEFAULT_PARAMS.resolution);
	t.end();
});

test(`new SMath().params.nbCos = ${SMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(sMathDefault.params.nbCos, SMath.DEFAULT_PARAMS.resolution);
	t.end();
});

test(`new SMath().params.nbAtan = ${SMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(sMathDefault.params.nbAtan, SMath.DEFAULT_PARAMS.resolution);
	t.end();
});

// Test with a different sin value. cos & tan should be 360, sin should be 720
var sMath720 = new SMath({
	resolution: 360,
	nbSin: 720
});
test(`new SMath({resolution: 360,nbSin: 720}).params.nbCos = ${SMath.DEFAULT_PARAMS.resolution}`, function (t) {
	t.is(sMath720.params.nbCos, SMath.DEFAULT_PARAMS.resolution);
	t.end();
});
test(`new SMath({resolution: 360,nbSin: 720}).params.nbSin = 720`, function (t) {
	t.is(sMath720.params.nbSin, 720);
	t.end();
});