'use babel'

import path from 'path'

export function create (jsFile, text, outputHandler) {
  var webView = document.createElement('webview')
  webView.setAttribute('nodeintegration', '')
  webView.setAttribute('disablewebsecurity', '')
  webView.setAttribute('preload', 'file://' + path.resolve(__dirname, './preload.js'))
  webView.setAttribute('src', 'file://' + path.resolve(__dirname, './index.html'))

  function ipcMessageHandler ({ channel }) {
    if (channel !== 'ready') return
    webView.send('run-test', jsFile, text)
  }

  function consoleHandler ({ level, message, line, sourceId }) {
    outputHandler({ level, message })
  }

  webView.addEventListener('ipc-message', ipcMessageHandler)
  webView.addEventListener('console-message', consoleHandler)

  webView.cleanUp = function () {
    webView.removeEventListener('ipc-message', ipcMessageHandler)
    webView.removeEventListener('console-message', consoleHandler)
  }

  return webView
}
