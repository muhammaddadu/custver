/**
 * Custom Version Parse
 * @author Muhammad Dadu
 */

var options = require('./options'),
	Version = require('./version');

const COMPARATORS = {
	'gt': '>',
	'gte': '>=',
	'lt': '<',
	'lte': '<=',
	'eq': '===',
	'neq': '!=='
};

/** Options Methods */
module.exports.options = options(); // Set Default

module.exports.setOptions = function setOptions(opts) {
	opts = typeof opts === 'string' ? options(opts) : opts;
	module.exports.options = opts;
}

/** Generic Methods */

/**
 * [validate description]
 * @param  {[type]} rawVersion [description]
 * @return {[type]}            [description]
 */
module.exports.validate = function validate(rawVersion) {
	var version = new Version(rawVersion);
	return version.getRawVersion() === version.getVersion();
}

/**
 * [getType description]
 * @param  {[type]} rawVersion [description]
 * @return {[type]}            [description]
 */
module.exports.getType = function getType(rawVersion) {
	var version = new Version(rawVersion);
	return version.getDevelopmentStage();
}

/**
 * [bump description]
 * @param  {[type]} developmentStage [description]
 * @return {[type]}                  [description]
 */
module.exports.bump = function bump(developmentStage) {
	var version = new Version(rawVersion);
	return version.bumpVersion.apply(this, arguments);
}

/** Comparison Methods */

/**
 * Autogenerate comparitors
 */
Object.keys(COMPARATORS).forEach(function (identifer) {
	module.exports[identifer] = function (v1, v2) {
		v1 = new Version(v1);
		v2 = new Version(v2);
		// console.log('return ' + v1.getWeight() + ' ' + COMPARATORS[identifer] + ' ' + v2.getWeight());
		return new Function('v1', 'v2', 'return v1.getWeight() ' + COMPARATORS[identifer] + ' v2.getWeight()').apply(this, arguments);
	}
});

/**
 * [compare description]
 * @param  {[type]} v1         [description]
 * @param  {[type]} v2         [description]
 * @param  {[type]} comparator [description]
 * @return {[type]}            [description]
 */
module.exports.compare = function compare(v1, v2) {
	if (module.exports.eq.apply(this, arguments)) {
		return 0;
	}
	if (module.exports.lt.apply(this, arguments)) {
		return -1;
	}
	if (module.exports.gt.apply(this, arguments)) {
		return 1;
	}
}