var path = require('path')
var register = require('babel/register')

function hook (projPaths, babelOptions) {
  var localModPath = path.resolve(projPaths[0], babelOptions.babelLocalModules)

  return register({
    resolveModuleSource: function (src) {
      if (src.indexOf('@') !== 0) return src
      if (src.indexOf('/') > 0) return src // npm scoped module

      var localModuleName = src.split('@')[1]
      var localModule = path.join(localModPath, localModuleName)
      return localModule
    },
    extensions: ['.js'],
    optional: [
      'es7.decorators',
      'es7.asyncFunctions',
      'es7.objectRestSpread'
    ],
    cache: false
  })
}

module.exports = hook
