/**
 * @class  Version
 * @author  Muhammad Dadu
 */

var options = require('./options'),
	custVer = require('..')

module.exports = Version;

/**
 * [Version description]
 * @param {string} rawVersion
 * @constructor
 */
function Version (rawVersion, customOptions) {
	this.rawVersion = rawVersion;
	this.options = customOptions || custVer.options;
	// Parse rawVersion using the options
	var versionEx = this.options.versioning.expression,
		developmentStages = this.options.developmentStages;
	// Validate Input
	if (!versionEx) {
		throw new Error('Versioning Expression Not Found');
	}
	if (!versionEx.test(rawVersion)) {
		throw new Error('Invalid Input for Version');
	}

	var parts = this.options.versioning.expression.exec(rawVersion);
	if (parts.length < 1) {
		throw new Error('Invalid version expression');
	}

	this.baseVersion = this.version = parts.shift(); // This is the base version from the input
	this.parts = parts;

	// Check if their is a development stage attached
	var devStageRaw = rawVersion.replace(this.baseVersion, '');
	if (devStageRaw.length !== 0) {
		// Match Stage
		for (var i = 0, l = developmentStages.length; !this.currentStage && i < l; ++i) {
			var stage = developmentStages[i];
			if (stage.expression && stage.expression.test(devStageRaw)) {
				this.currentStage = stage;
			}
		}
		// Work Some Magic
		if (!this.currentStage) {
			throw new Error('Invalid version expression');
		}
		
		var stageParts = this.currentStage.expression.exec(devStageRaw);
		this.ext = stageParts.shift().replace(stageParts[0], ''),
		this.extVersion = stageParts[0] ? stageParts.shift() : '';

		this.version += this.ext + this.extVersion;
	}

}

/**
 * Returns the weight of the version
 * @return {float}
 */
Version.prototype.getWeight = function getWeight() {
	function pad(n, width) {
		return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
	}
	var weight = '';
	// Calculate weight without ext
	for (var i = 0, l = this.parts.length, part; i < l, part = this.parts[i]; ++i) {
		weight += pad(part, 3);
	}

	if (this.ext && this.currentStage.order) {
		weight += '.' + this.currentStage.order + this.extVersion;
	} else if (this.options.defaultStageOrder) {
		weight += '.' + this.options.defaultStageOrder;
	}

	return parseFloat(weight);
}

/**
 * Returns the input version
 * @return {string}
 */
Version.prototype.getRawVersion = function getRawVersion() {
	return this.rawVersion;
}

/**
 * Returns the processed version
 * @return {string}
 */
Version.prototype.getVersion = function getVersion() {
	return this.version;
}

/**
 * Returns the development stage of a version
 * @return {string}
 */
Version.prototype.getDevelopmentStage = function getDevelopmentStage() {
	return this.currentStage && this.currentStage.type;
}

/**
 * Bumps version depending on the current development stage and the expected development stage
 * @param  {string} developmentStage [description]
 * @return {string} version
 */
Version.prototype.bumpVersion = function bumpVersion(developmentStage) {
	throw new Error('Not Implemented Yet');
}