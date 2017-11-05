import path from 'path';

export default {
  entry: './client/index.js',
  output: {
    path: path.resolve('public/js'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/ },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./client'),
      path.resolve('./node_modules')
    ]
  }
}
