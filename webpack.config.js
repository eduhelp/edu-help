var path = require('path');
var combineLoaders = require('webpack-combine-loaders');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: require.resolve('babel-loader'),
        query: {
          presets: ["env", "react", 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])  

      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use:'file-loader', 
        
      }
    ]
     
  }

}

module.exports = {
  mode: 'development'
};

module.exports = config;
