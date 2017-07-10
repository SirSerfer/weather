var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

    plugins: [
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

   

  module: {
    loaders: [
          {
              loader: 'babel-loader',
              test: /\.js$/,
              exclude: /node_modules/,
              query: {
                 presets: ['es2015']
              }
          }
      ],
      rules: [
          {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'  
              ]
          },
          {
               test: /\.(png|svg|jpg|gif)$/,
               use: [
                   'file-loader'
               ]
          }
      ]
  },

  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
     new webpack.DefinePlugin({
             'process.env.NODE_ENV': '"production"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
  
};