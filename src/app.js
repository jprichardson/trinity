'use babel'

import { CompositeDisposable } from 'atom'
import _debug from './bdebug'

const debug = _debug('trinity:app')

export default class App {
  constructor ({ workspace, runTestsFn, babelOptions, projPathsFn }) {
    this.disposables = new CompositeDisposable()
    this.workspace = workspace
    this.runTestsFn = runTestsFn
    this.babelOptions = babelOptions
    this.projPathsFn = projPathsFn
  }

  activate () {
    this.disposables.add(this.workspace.observeTextEditors((editor) => {
      debug(`editor opened with ${editor.getPath()}`)
      this.disposables.add(editor.onDidSave((event) => {
        debug(`editor saved ${event.path}`)
        this.runTestsFn(event.path, editor.getBuffer(), this.babelOptions, this.projPathsFn())
      }))
    }))
  }

  deactivate () {
    this.disposables.dispose()
  }
}
