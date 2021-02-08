const path = require('path');

module.exports = {
	entry: './server/index.ts',
	target: "node",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'server-tsconfig.json'
						}
					}
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'server-dist'),
	},
};
