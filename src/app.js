'use babel'

import { CompositeDisposable } from 'atom'
import runTests from './run-tests'
import _debug from './bdebug'

const debug = _debug('trinity:app')

export default class App {
  constructor ({ workspace, fileFilter, babelOptions, projPathsFn }) {
    this.disposables = new CompositeDisposable()
    this.workspace = workspace
    this.fileFilter = fileFilter
    this.babelOptions = babelOptions
    this.projPathsFn = projPathsFn
  }

  activate () {
    this.disposables.add(this.workspace.observeTextEditors((editor) => {
      debug(`editor opened with ${editor.getPath()}`)
      this.disposables.add(editor.onDidSave((event) => {
        debug(`editor saved ${event.path}`)
        runTests(this.fileFilter, event.path, editor.getBuffer(), this.babelOptions, this.projPathsFn())
      }))
    }))
  }

  deactivate () {
    this.disposables.dispose()
  }

  run () {
    let editor = this.workspace.getActiveTextEditor()
    runTests('**', editor.getPath(), editor.getBuffer(), this.babelOptions, this.projPathsFn())
  }
}
