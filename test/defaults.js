#!/usr/bin/env node

var test = require('ava');
var SMath = require('..');

test.skip(`SMath.DEFAULT_PARAMS = ${JSON.stringify(SMath.DEFAULT_PARAMS)}`, function () {});

var sMath = new SMath();
test(`SMath#nbSin = ${SMath.DEFAULT_PARAMS.nbSin}`, function (t) {
	t.is(sMath.params.nbSin, SMath.DEFAULT_PARAMS.nbSin);
	t.end();
});

test(`SMath#nbCos = ${SMath.DEFAULT_PARAMS.nbCos}`, function (t) {
	t.is(sMath.params.nbCos, SMath.DEFAULT_PARAMS.nbCos);
	t.end();
});
