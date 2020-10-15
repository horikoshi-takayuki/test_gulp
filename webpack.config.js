// プラグイン処理（new webpack.ProvidePlugin）などを実行するためrequireで読み込み
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	// mode: "development", // gulpの方で切り替え

	// メインのJS
	entry: {
		script: './src/js/app.js',
	},
	output: {
		filename: '[name].js',
	},

	// エントリーポイント分割の場合
	// entry: {
	// 	'top': './src/js/top.app.js',
	// 	'about': './src/js/about.app.js',
	// },
	// output: {
	// 	filename: '[name].js'
	// },

	// jQueryをプラグイン読み込みする場合
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	],

	// vendorファイルを分けたい場合
	optimization: {
		splitChunks: {
			name: 'vendor',
			chunks: 'initial',
		},
	},

	// vendorファイルをCDNなど外部読み込みにかえたい場合
	// externals: {
	// 	jquery: 'jQuery'
	// },

	cache: true,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
};
