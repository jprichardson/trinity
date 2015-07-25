'use babel'

import once from 'onetime'
import path from 'path'
import React from 'react'
import tapOut from 'tap-out'
import vm from 'vm'
import App from './ui/app.react'
import { setRightPanel } from './atom'
import _debug from './bdebug'
import * as events from './events'
import * as webView from './test-process/webview'


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

  // have no way of detecting if module is done.... hmm.
  let t = tapOut(function (output) { })

  t.on('assert', (data) => { events.publish('assert', data) })
  t.on('comment', (data) => { events.publish('comment', data) })
  t.on('test', (data) => { events.publish('test', data) })
  t.on('result', (data) => { events.publish('result', data) })

  let cdebug = _debug('trinity:run-tests:console')
  var wv = webView.create(file, ({ message, level }) => {
    cdebug(`${level}: ${message}`)
    t.write(message + '\n')
  })

  wvContainer.appendChild(wv)
}

function mountReact () {
  debug('mounting react...')
  var div = document.createElement('div')
  div.setAttribute('class', 'tree-view-resizer')
  React.render(<App />, div)
  setRightPanel(atom.workspace, div)
  debug('react mounted.')

  var divWV = document.createElement('div')
  divWV.setAttribute('id', 'trinity-wv')
  div.appendChild(divWV)
}
