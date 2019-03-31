const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const glob = require('glob')

const rootPath = process.cwd()
const paths = {
  app: path.resolve(rootPath, 'src'),
  public: path.resolve(rootPath, 'public'),
}

module.exports = {
  mode: 'production',
  target: 'node',
  context: paths.app,
  entry: {
    js: glob.sync('/**/*.js'),
  },
  output: {
    path: paths.public,
    filename: 'app.bundle.js',
  },
  resolve: {
    alias: {
      bin: path.join(paths.app, 'bin'),
      lib: path.join(paths.app, 'lib'),
    },
  },
}
