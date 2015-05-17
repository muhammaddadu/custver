module.exports = {
	versioning: {
		expression: /^(\d+)\.(\d+)\.(\d+)+/i
	},
	developmentStages : [
		{
			type: 'Alpha',
			expression: /\.v(\d*)$/i,
			order: '1'
		},
		{
			type: 'Beta',
			expression: /\.Beta(\d*)$/i,
			order: '2'
		},
		{
			type: 'Release Candidate',
			expression: /\.RC(\d*)$/i,
			order: '3'
		},
		{
			type: 'General Availability',
			expression: /\.GA$/i,
			order: '4'
		}
	]//,
	//defaultStageOrder: 4
};