var debug = require('./src/bdebug')
var partial = require('lodash.partial')
var App = require('./src/app')
var runTests = require('./src/run-tests')

/* global atom */

atom.config.onDidChange('trinity.debug', function (event) {
  event.newValue ? debug.enable('trinity*') : debug.disable()
})

module.exports = {
  app: null,
  config: require('./src/config'),

  activate: function () {
    var testFn = partial(runTests, atom.config.get('trinity.fileFilter'))
    this.app = new App({
      workspace: atom.workspace,
      runTestsFn: testFn,
      babelOptions: atom.config.get('trinity.babelOptions'),
      // we pass a function, because this may change as more panes (editors) open/close
      projPathsFn: function () { return atom.project.getPaths() }
    })
    this.app.activate.apply(this.app, arguments)
  },

  deactivate: function () {
    this.app.deactivate.apply(this.app, arguments)
  }
}
