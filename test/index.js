#!/usr/bin/env node

var test = require('ava');
var SMath = require('..');

var sMath = new SMath();

var epsilon = 0.05;
function closeEnough (a, b) { return Math.abs(a - b) < epsilon; }

var angles = [];
var anglesToTest = 10000;
for (var i = 0; i < anglesToTest; i++) angles.push((Math.random() - .5) * 200);

test(`SMath#sin is within ${epsilon} without params`, function (t) {
	angles.forEach(function (angle) {
		t.ok(closeEnough(Math.sin(angle), sMath.sin(angle)));
	});
	t.end();
});

test(`SMath#cos is within ${epsilon} without params`, function (t) {
	angles.forEach(function (angle) {
		t.ok(closeEnough(Math.cos(angle), sMath.cos(angle)));
	});
	t.end();
});
