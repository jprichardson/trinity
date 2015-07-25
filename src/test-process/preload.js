var os = require('os')
var util = require('util')
var eolRegex = new RegExp(os.EOL + '$')

// yes, this is backwards... but it's because webview has a nice console handler
process.stdout.write = function (msg) {
  msg = msg.replace(eolRegex, '')
  console.log(msg)
}

process.stderr.write = function (msg) {
  msg = msg.replace(eolRegex, '')
  console.error(msg)
}

// patch console.dir, returns [object Object]
console.dir = function (obj) {
  console.log(util.inspect(obj))
}

var oldLog = console.log.bind(console)
console.log = function () {
  // emulate node.js console.log
  var msg = util.format.apply(util, arguments)
  oldLog(msg)
}
