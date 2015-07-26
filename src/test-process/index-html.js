var ipc = require('ipc')
var Mocha = require('mocha')

document.addEventListener('DOMContentLoaded', function () {
  var el = document.createElement('div')
  el.innerHTML = 'dom ready'
  document.body.appendChild(el)
  ipc.sendToHost('ready')
})

ipc.on('run-test', runTest)

function runTest (testFile, text, babelOptions) {
  // super hacky, should probably use recast
  if (text.includes('trinity: mocha')) {
    runMocha(testFile)
  } else {
    require(testFile)
  }
}

function runMocha (testFile) {
  var opts = {
    ui: 'bdd',
    reporter: 'tap',
    timeout: 30000
  }
  var mocha = new Mocha(opts)
  mocha.useColors(false)
  mocha.addFile(testFile)
  mocha.run(function (failures) {})
}
