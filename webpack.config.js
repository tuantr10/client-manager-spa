module.exports = {
  entry: './public/src/index.js',
  output: {
    path: __dirname + '/public/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015', 'react', 'stage-0' ] }
      }]
  },
  watch: true  
};