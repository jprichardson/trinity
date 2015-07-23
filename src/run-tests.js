'use babel'

import { setRightPanel } from './atom'
import _debug from './bdebug'
const debug = _debug('trinity:run-tests')

export default function runTestsFn (fileFilter, file) {
  if (!file.match(fileFilter)) return
  debug(`running ${file}`)
  var div = document.createElement('div')
  div.setAttribute('class', 'padded')
  div.innerHTML = '<div class="inset-panel"><div class="panel-heading">An inset-panel heading</div><div class="panel-body padded">Some Content' +  '</div></div>'
  setRightPanel(atom.workspace, div)
}
