var path = require('path')
var webpack = require('webpack')

var libs = [
	'ansi-regex',
	'classnames',
	'css-loader/lib/css-base',
	'jss',
	'jss-camel-case',
	'jss-default-unit',
	'jss-extend',
	'jss-isolate',
	'jss-nested',
	'jss-props-sort',
	'jss-vendor-prefixer',
	'lodash',
	'mobx',
	'mobx-react',
	'moment',
	'numeral',
	'querystring',
	'react',
	'react-bootstrap',
	'react-dom',
	'react-deep-force-update/lib',
	'react-fa',
	'react-hot-loader/index',
	'react-hot-loader/patch',
	'react-infinite',
	'react-jss',
	'react-list',
	'react-router',
	'react-router-bootstrap',
	'react-select',
	'react-sticky',
	'redbox-react',
	'sockjs-client/lib/entry',
	'strip-ansi',
	'style-loader/addStyles',
	'superagent',
	'url'
]

module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./src/index'
		],
		lib: libs
	},

	output: {
		path: path.resolve(__dirname, '_bld'),
		filename: 'app.js'
	},

	cache: true,
	debug: true,
	devtoolx: 'source-map',
	devServer: {
		historyApiFallback: true
	},

	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},

	module: {
		preLoadersx: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'source-map'
			}
		],
		loaders: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'awesome-typescript',
				query: {
					doTypeCheck: false,
					skipDeclarationFilesCheck: true
				}
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url',
				query: {
					limit: 10000,
					mimetype: 'application/font-woff',
					noEmit: false
				}
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file',
				query: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.s[ac]ss$/,
				loader: 'style?singleton!css!sass',
			},
			{
				test: /\.html$/,
				loader: 'file',
				query: {
					name: '[name].[ext]'
				}
			}
		]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')
	]
}