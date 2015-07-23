'use babel'

import React from 'react'
import App from './ui/app.react'
import { setRightPanel } from './atom'
import _debug from './bdebug'
const debug = _debug('trinity:run-tests')

export default function runTestsFn (fileFilter, file, textBuffer) {
  if (!file.match(fileFilter)) return
  debug(`running ${file}`)
  var div = document.createElement('div')
  React.render(<App />, div)
  setRightPanel(atom.workspace, div)
}
