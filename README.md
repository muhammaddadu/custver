# custver
A highly customizable version parser

# Usage

```
npm install custver --save
```

In you nodeJS applicaiton
```JavaScript
var custver = require('custver');
```

## Defining Version Formatting
Defining the version formatting can be done in two ways.

## Selecting a predefined version format
This package comes with two predefined version formattings. These are;
- alternative
- symantic

```JavaScript
custver.setOptions('alternative'); // Alternative version formatting
custver.setOptions('symantic'); // Alternative version formatting
```

## Defining a custom version formatiing

```
custver.setOptions({
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
	],
	defaultStageOrder: 4 // A version such as 4.0.0 will be treated as a development stage of General Availability
});
```