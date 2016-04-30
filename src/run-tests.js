'use babel'

import minimatch from 'minimatch'
import once from 'onetime'
import React from 'react'
import ReactDOM from 'react-dom'
import tapOut from 'tap-out'
import App from './ui/app.react'
import { setRightPanel } from './atom'
import _debug from './bdebug'
import * as events from './events'
import * as webView from './test-process/webview'

// try to avoid using global atom, refactor to remove
/* global atom */

const debug = _debug('trinity:run-tests')
const mountReactApp = once(mountReact)

export default function runTestsFn (fileFilter, file, textBuffer, babelOptions, projPaths) {
  let match = matchesFilter(fileFilter, file)
  debug(`'${file}' ${match ? 'MATCHES' : 'DOES NOT MATCH'} '${fileFilter}'`)
  if (!match) return
  mountReactApp()
  debug(`running ${file}`)

  var wvContainer = document.getElementById('trinity-wv')
  // delete previous webview
  ;[].slice.call(wvContainer.children).forEach(function (el) {
    el.cleanUp() // not DOM method, found in test-process/webview.js
    el.parentNode.removeChild(el)
  })

  // hacky way to notify React that we're starting over
  // alternatively, could destroy/remount React
  events.publish('clear')

  // have no way of detecting if module is done.... hmm.
  let t = tapOut(function (output) { })

  t.on('assert', (data) => { events.publish('assert', data) })
  t.on('comment', (data) => { events.publish('comment', data) })
  t.on('test', (data) => { events.publish('test', data) })
  t.on('result', (data) => { events.publish('result', data) })

  let cdebug = _debug('trinity:run-tests:console')
  var wv = webView.create(file, textBuffer.getText(), babelOptions, projPaths, ({ message, level }) => {
    cdebug(`${level}: ${message}`)
    t.write(message + '\n')
  })

  wvContainer.appendChild(wv)
}

function mountReact () {
  debug('mounting react...')
  var div = document.createElement('div')
  div.setAttribute('class', 'tree-view-resizer')
  setRightPanel(atom.workspace, div)
  ReactDOM.render(<App />, div)
  debug('react mounted.')

  var divWV = document.createElement('div')
  divWV.setAttribute('id', 'trinity-wv')
  div.appendChild(divWV)
}

function matchesFilter (fileFilter, file) {
  let filters = fileFilter.split(';').map(s => s.trim())
  debug('filters: ${filters}')
  return !!filters.filter(filter => minimatch(file, filter, { matchBase: true })).length
}
