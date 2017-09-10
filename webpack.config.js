module.exports = {
  entry: './public/src/app.js',
  output: {
    path: __dirname + '/public/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015', 'react' ] }
      }]
  },
  watch: true  
};