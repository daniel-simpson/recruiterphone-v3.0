const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const functions = fs.readdirSync('./src/functions');
const lib = fs.readdirSync('./src/lib')

let entry = {}
for(var i in functions) {
  entry[functions[i].split('.')[0]] = [ ...lib.map(l => `./src/lib/${l}`), `./src/functions/${functions[i]}`, ]
}

console.log('entry', entry);

module.exports = {
  entry: entry,
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    libraryTarget: "commonjs",
    path: `${ __dirname }/dist/functions`,
    filename: '[name].js'
  }
}