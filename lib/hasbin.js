'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');

module.exports = hasbin;
hasbin.async = hasbin;
hasbin.sync = hasbinSync;
hasbin.all = hasbinAll;
hasbin.all.sync = hasbinAllSync;
hasbin.some = hasbinSome;
hasbin.some.sync = hasbinSomeSync;

hasbin.every = hasbin.all;
hasbin.any = hasbin.some;

function hasbin (bin, done) {
	async.some(getPaths(bin), fileExists, done);
}

function hasbinSync (bin) {
	return getPaths(bin).some(fileExistsSync);
}

function hasbinAll (bins, done) {
	async.every(bins, hasbin.async, done);
}

function hasbinAllSync (bins) {
	return bins.every(hasbin.sync);
}

function hasbinSome (bins, done) {
	async.some(bins, hasbin.async, done);
}

function hasbinSomeSync (bins) {
	return bins.some(hasbin.sync);
}

function getPaths (bin) {
	var envPath = (process.env.PATH || '');
	return envPath.split(':').map(function (chunk) {
		return path.join(chunk, bin);
	});
}

function fileExists (filePath, done) {
	fs.stat(filePath, function (error, stat) {
		done(stat.isFile());
	});
}

function fileExistsSync (filePath) {
	return fs.statSync(filePath).isFile();
}
