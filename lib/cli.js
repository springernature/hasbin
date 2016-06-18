#!/usr/bin/env node

'use strict';

var usage = 'hasbin [--all|--some|--first] cmd [...]';

var argv = require('minimist')(process.argv.slice(2), { boolean: true });

var bins = argv._;
var modes = ['all', 'some', 'first'].filter(function (mode) {
	return argv[mode];
});

if (!bins.length || modes.length > 1) {
	console.error(usage);
	process.exit(2);
}

var mode = modes.length ? modes[0] : 'all';

var fn;
var printResult = false;
switch (mode) {
	case 'all': {
		fn = require('./hasbin').all.sync;
		break;
	}

	case 'some': {
		fn = require('./hasbin').some.sync;
		break;
	}

	case 'first': {
		fn = require('./hasbin').first.sync;
		printResult = true;
		break;
	}
}

var result = fn(bins);

if (printResult) {
	console.log(result);
}
if (!result) {
	process.exit(1);
}
