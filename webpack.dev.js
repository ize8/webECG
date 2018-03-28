const webpack = require('webpack');

module.exports = {
   entry: './src/index.js',
	
   output: {
      path:__dirname,
      filename: '[name].js'
   },


   devtool: 'eval-source-map',

   devServer: {
      inline: true,
      port: 8080
   },

   plugins: [ new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|hun/)],
	
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
