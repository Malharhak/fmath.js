var test = require('ava');
var SMath = require('..');

test.skip(`SMath.DEFAULT_PARAMS = ${JSON.stringify(SMath.DEFAULT_PARAMS)}`, function () {});

var sMath = new SMath();
test(`new SMath().params.nbSin = ${SMath.DEFAULT_PARAMS.nbSin}`, function (t) {
	t.is(sMath.params.nbSin, SMath.DEFAULT_PARAMS.nbSin);
	t.end();
});

test(`new SMath().params.nbCos = ${SMath.DEFAULT_PARAMS.nbCos}`, function (t) {
	t.is(sMath.params.nbCos, SMath.DEFAULT_PARAMS.nbCos);
	t.end();
});
