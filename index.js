var debug = require('./src/bdebug')
var App = require('./src/app')

/* global atom */

atom.config.onDidChange('trinity.debug', function (event) {
  event.newValue ? debug.enable('trinity*') : debug.disable()
})

module.exports = {
  app: null,
  config: require('./src/config'),

  activate: function () {
    this.app = new App({
      workspace: atom.workspace,
      fileFilter: atom.config.get('trinity.fileFilters'),
      babelOptions: atom.config.get('trinity.babelOptions'),
      // we pass a function, because this may change as more panes (editors) open/close
      projPathsFn: function () { return atom.project.getPaths() }
    })
    this.app.activate.apply(this.app, arguments)
    this.app.disposables.add(atom.commands.add('atom-workspace', 'trinity:run', this.app.run.bind(this.app)))
  },

  deactivate: function () {
    this.app.deactivate.apply(this.app, arguments)
  }
}
