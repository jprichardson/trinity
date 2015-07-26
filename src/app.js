'use babel'

import { CompositeDisposable } from 'atom'
import _debug from './bdebug'

const debug = _debug('trinity:app')

export default class App {
  constructor ({ workspace, runTestsFn, babelOptions }) {
    this.disposables = new CompositeDisposable()
    this.workspace = workspace
    this.runTestsFn = runTestsFn
    this.babelOptions = babelOptions
  }

  activate () {
    this.disposables.add(this.workspace.observeTextEditors((editor) => {
      debug(`editor opened with ${editor.getPath()}`)
      this.disposables.add(editor.onDidSave((event) => {
        debug(`editor saved ${event.path}`)
        this.runTestsFn(event.path, editor.getBuffer(), this.babelOptions)
      }))
    }))
  }

  deactivate () {
    this.disposables.dispose()
  }
}
