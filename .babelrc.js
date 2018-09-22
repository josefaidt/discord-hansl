module.exports = function(api) {
  const presets = ['@babel/preset-env']
  const plugins = ['@babel/plugin-proposal-class-properties']

  api.cache.using(() => process.env.NODE_ENV === 'DEV')

  let generatorOpts = {
    minified: true,
    comments: false,
    sourceMaps: true
  }

  if (process.env.NODE_ENV === 'DEV') {
    generatorOpts.minified = false
  }

  return {
    presets,
    plugins,
    generatorOpts
  }
}
