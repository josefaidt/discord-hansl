const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const rootPath = process.cwd()
const paths = {
  app: path.join(rootPath, 'src'),
  build: path.join(rootPath, 'build')
}

module.exports = {
  target: 'node',
  context: paths.app,
  entry: {
    bot: path.join(paths.app, 'bot.js')
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js'
  },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      bin: path.join(paths.app, 'bin'),
      lib: path.join(paths.app, 'lib')
    }
  }
}
