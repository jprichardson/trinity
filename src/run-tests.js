'use babel'

import once from 'onetime'
import path from 'path'
import React from 'react'
import vm from 'vm'
import App from './ui/app.react'
import { setRightPanel } from './atom'
import _debug from './bdebug'
import * as webView from './test-process/webview'

var cp = require('child_process')

const debug = _debug('trinity:run-tests')
const mountReactApp = once(mountReact)

export default function runTestsFn (fileFilter, file, textBuffer) {
  if (!file.match(fileFilter)) return
  mountReactApp()
  debug(`running ${file}`)

  var wvContainer = document.getElementById('trinity-wv')
  // delete previous webview
  ;[].slice.call(wvContainer.children).forEach(function (el) {
    el.cleanUp() // not DOM method, found in test-process/webview.js
    el.parentNode.removeChild(el)
  })

  let cdebug = _debug('trinity:run-tests:console')
  var wv = webView.create(file, function ({ message, level }) {
    cdebug(`${level}: ${message}`)
  })

  wvContainer.appendChild(wv)
}

function mountReact () {
  debug('mounting react...')
  var div = document.createElement('div')
  React.render(<App />, div)
  setRightPanel(atom.workspace, div)
  debug('react mounted.')

  var divWV = document.createElement('div')
  divWV.setAttribute('id', 'trinity-wv')
  div.appendChild(divWV)
}
