/**
 * Options for custver
 * @author Muhammad Dadu
 */
var fs = require('fs'),
	path = require('path'),
	optionsDir = path.join(__dirname, 'options');

/**
 * Loads up predefined options
 * @param  {string} type
 * @return {object} options
 */
module.exports = function (type) {
	type = type || 'alternative';
	return require(path.join(optionsDir, type + '.js'));
};