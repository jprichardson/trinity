var ipc = require('ipc')

document.addEventListener('DOMContentLoaded', function () {
  var el = document.createElement('div')
  el.innerHTML = 'dom ready'
  document.body.appendChild(el)
  ipc.sendToHost('ready')
})

ipc.on('run-test', runTest)

function runTest (testFile) {
  require(testFile)
}
