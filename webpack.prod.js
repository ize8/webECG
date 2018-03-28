const webpack = require('webpack');

module.exports = {
   entry: './src/index.js',
	
   output: {
      path:__dirname,
      filename: '[name].js'
   },

   plugins: [ 
       new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|hun/),
       new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
       new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true
        },
        output: {
          comments: false,
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      })
    ],
	
   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['env', 'react'],
               plugins: ['transform-decorators-legacy','transform-class-properties',["import", [{ libraryName: "antd", style: "css" }]]]
            }
         },
         {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
         },
         { 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
         }
      ]
   }
};