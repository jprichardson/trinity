var os = require('os')
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
