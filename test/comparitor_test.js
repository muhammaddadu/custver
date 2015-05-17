var custver = require('..'),
	Version = require('../lib/version.js'),
	test = require('unit.js');

custver.setOptions('alternative')

describe('Comparitor Testing : lt : alternative', function () {

	var tests = [
		{
			v1: '0.0.0',
			v2: '0.0.1',
			method: 'lt',
			expected: true
		},
		{
			v1: '0.0.1.GA',
			v2: '0.0.1',
			method: 'lt',
			expected: false
		},
		{
			v1: '0.0.1',
			v2: '0.0.1.GA',
			method: 'lt',
			expected: true
		},
		{
			v1: '0.0.1.GA',
			v2: '0.0.1.RC',
			method: 'lt',
			expected: false
		},
		{
			v1: '0.0.1.RC',
			v2: '0.0.1.GA',
			method: 'lt',
			expected: true
		},
		{
			v1: '0.0.1.Beta',
			v2: '0.0.1.GA',
			method: 'lt',
			expected: true
		},
		{
			v1: '0.0.1.GA',
			v2: '0.0.1.Beta',
			method: 'lt',
			expected: false
		},
		{
			v1: '0.0.1',
			v2: '0.0.1.Beta',
			method: 'lt',
			expected: true
		},
		{
			v1: '12.12.2',
			v2: '12.12.1.GA',
			method: 'lt',
			expected: false
		},
		{
			v1: '112.112.2.RC4',
			v2: '112.112.1.RC5',
			method: 'lt',
			expected: false
		}
	]

	tests.forEach(function (currentTest) {
		it('custver.' + currentTest.method + '(\'' + currentTest.v1 + '\', \'' + currentTest.v2 + '\') : ' + currentTest.expected, function () {
			test.assert(custver[currentTest.method](currentTest.v1, currentTest.v2) === currentTest.expected);
		});
	});
});