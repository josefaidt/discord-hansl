module.exports = function(api) {
  // const presets = [
  //   ['@babel/preset-env', 
  //   {
  //     targets: {
  //       esmodules: true,
  //       node: true
  //     }
  //   }]
  // ]
  const presets = ['@babel/preset-env']
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-parameters',
    ['@babel/plugin-transform-modules-commonjs', {
      allowTopLevelThis: true
    }]
  ]

  let generatorOpts = {
    minified: true,
    comments: false,
    sourceMaps: true
  }

  if (api.env('DEV')) {
    console.log('**************DEVELOPMENT ENABLED**************')
    generatorOpts.minified = false
  }

  return {
    presets,
    plugins,
    generatorOpts
  }
}
