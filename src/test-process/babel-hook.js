var path = require('path')
var register = require('babel-core/register')

function hook (projPaths, babelOptions) {
  var localModPath = path.resolve(projPaths[0], babelOptions.resolvePath)

  return register({
    resolveModuleSource: function (src) {
      if (src.indexOf(babelOptions.resolvePrefix) !== 0) return src

      var localModuleName = src.split(babelOptions.resolvePrefix)[1]
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
