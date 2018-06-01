const webpack = require('webpack');

module.exports = {
   mode: 'production',
   entry: './src/index.js',
	
   output: {
      path:__dirname,
      filename: '[name].js'
   },

   plugins: [ 
       new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|hun/),
    ],
	
   module: {
      rules: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
				
              options: {
                 presets: ['env', 'react'],
                 plugins: ['transform-decorators-legacy','transform-class-properties',["import", [{ libraryName: "antd", style: "css" }]]],
              }
            }
         },
         {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
         },
         { 
            test: /\.css$/, 
            use: [ 'style-loader', 'css-loader' ]
         }
      ]
   }
};