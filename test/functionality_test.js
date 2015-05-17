var custver = require('..'),
	Version = require('../lib/version.js'),
	test = require('unit.js');

describe('Version()', function () {

	var tests = {
		'0.0.1' : {
			bump: 'Beta',
			expected: {
				weight: 1,
				version: '0.0.1',
				developmentStage: undefined,
				// bumpedVersion: '0.0.1.Beta'
			}
		},
		'0.0.2.RC' : {
			bump: 'Beta',
			expected: {
				weight: 2.3,
				version: '0.0.2.RC',
				developmentStage: 'Release Candidate',
				// bumpedVersion: '0.0.3.Beta'
			}
		},
		'0.0.2.RC1' : {
			bump: 'Beta',
			expected: {
				weight: 2.31,
				version: '0.0.2.RC1',
				developmentStage: 'Release Candidate',
				// bumpedVersion: '0.0.3.Beta'
			}
		},
		'1.2.1.GA' : {
			bump: 'GA',
			expected: {
				weight: 1002001.4,
				version: '1.2.1.GA',
				developmentStage: 'General Availability',
				// bumpedVersion: '0.0.3.GA'
			}
		},
		'54.32.10.GA' : {
			bump: 'GA',
			expected: {
				weight: 54032010.4,
				version: '54.32.10.GA',
				developmentStage: 'General Availability',
				// bumpedVersion: '0.0.3.GA'
			}
		}
	};

	Object.keys(tests).forEach(function (rawVersion) {
		describe('alternative: new Version(\'' + rawVersion + '\')', function () {
			var version,
				currentTest = tests[rawVersion],
				expected = currentTest.expected;

			before(function () {
				custver.setOptions('alternative');
				version = new Version(rawVersion);
			});

			it('getWeight() === \'' + expected.weight + '\'', function () {
				test.assert(version.getWeight() === expected.weight, 'Weight: ' + version.getWeight());
			});

			it('getRawVersion() === \'' + rawVersion + '\'', function () {
				test.assert(version.getRawVersion() === rawVersion, 'Raw Version: ' + version.getRawVersion());
			});

			it('getVersion() === \'' + expected.version + '\'', function () {
				test.assert(version.getVersion() === expected.version, 'Version: ' + version.getVersion());
			});

			it('getDevelopmentStage() === \'' + expected.developmentStage + '\'', function () {
				test.assert(version.getDevelopmentStage() === expected.developmentStage, 'Development Stage: ' + version.getDevelopmentStage());
			});

			it.skip('bumpVersion(\'' + currentTest.bump + '\') === \'' + expected.bumpedVersion + '\'', function () {

			});
		});
	});

	tests = {
		'v0.0.1' : {
			// bump: 'Patch',
			expected: {
				weight: 1,
				version: 'v0.0.1',
				// bumpedVersion: '0.0.2'
			}
		},
		'v2.1.2' : {
			// bump: 'Major',
			expected: {
				weight: 2001002,
				version: 'v2.1.2',
				// developmentStage: 'Release Candidate',
				// bumpedVersion: '3.1.2'
			}
		},
		'v2.21.2' : {
			// bump: 'Patch',
			expected: {
				weight: 2021002,
				version: 'v2.21.2',
				// developmentStage: 'Release Candidate',
				// bumpedVersion: '2.21.3'
			}
		},
		'v4.2.1' : {
			// bump: 'Major',
			expected: {
				weight: 4002001,
				version: 'v4.2.1',
				// developmentStage: 'General Availability',
				// bumpedVersion: '5.2.1'
			}
		},
		'v54.32.10' : {
			// bump: 'Minor',
			expected: {
				weight: 54032010,
				version: 'v54.32.10',
				// developmentStage: 'General Availability',
				// bumpedVersion: '54.33.10'
			}
		}
	};

	Object.keys(tests).forEach(function (rawVersion) {
		describe('semantic: new Version(\'' + rawVersion + '\')', function () {
			var version,
				currentTest = tests[rawVersion],
				expected = currentTest.expected;

			before(function () {
				custver.setOptions('semantic');
				version = new Version(rawVersion);
			});

			(expected.weight ? it : it.skip)('getWeight() === \'' + expected.weight + '\'', function () {
				test.assert(version.getWeight() === expected.weight, 'Weight: ' + version.getWeight());
			});

			it('getRawVersion() === \'' + rawVersion + '\'', function () {
				test.assert(version.getRawVersion() === rawVersion, 'Raw Version: ' + version.getRawVersion());
			});

			(expected.version ? it : it.skip)('getVersion() === \'' + expected.version + '\'', function () {
				test.assert(version.getVersion() === expected.version, 'Version: ' + version.getVersion());
			});
			(expected.developmentStage ? it : it.skip)('getDevelopmentStage() === \'' + expected.developmentStage + '\'', function () {
				test.assert(version.getDevelopmentStage() === expected.developmentStage, 'Development Stage: ' + version.getDevelopmentStage());
			});

			(expected.bumpedVersion ? it : it.skip)('bumpVersion(\'' + currentTest.bump + '\') === \'' + expected.bumpedVersion + '\'', function () {

			});
		});
	});
});