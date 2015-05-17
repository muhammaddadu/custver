module.exports = {
	versioning: {
		// vMajor.Minor.Patch
		expression: /^v?(\d+)\.(\d+)\.(\d+)$/i,
	},
	_developmentStages: [
		{
			type: 'Major',
			expression: /^(\d+)\.\d+\.\d+$/i
		},
		{
			type: 'Minor',
			expression: /^\d+\.(\d+)\.\d+$/i
		},
		{
			type: 'Patch',
			expression: /^\d+\.\d+\.(\d+)$/i
		}
	]
};