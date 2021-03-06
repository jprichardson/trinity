'use babel'

// this is the antithesis of how a React application should be made

import React from 'react'
import * as events from '../events'
import TestView from './test.react'
import _debug from '../bdebug'

/* global localStorage document */

const debug = _debug('trinity:ui:app')

const App = React.createClass({
  displayName: 'AppView',

  getInitialState () {
    return { tests: [], results: [], dragData: {} }
  },

  handleTestEvents ({ eventName, data }) {
    debug(`${eventName}: ${JSON.stringify(data, null, 2)}`)
    let tests = this.state.tests
    let test
    switch (eventName) {
      case 'test':
        test = { asserts: [], data: data }
        tests.push(test)
        this.setState({ tests: tests })
        break
      case 'assert':
        test = this.state.tests[this.state.tests.length - 1]
        if (!test) {
          test = { asserts: [], data: data }
          // React.js gods, please forgive me
          this.state.tests.push(test)
        }

        test.asserts.push(data)
        this.setState({ tests: tests })
        break
      case 'comment':
        test = this.state.tests[this.state.tests.length - 1]
        if (!test) {
          test = { asserts: [], data: data }
          // React.js gods, please forgive me
          this.state.tests.push(test)
        }
        // compress comments (or console output) into one block
        // otherwise our output would be choppy and ugly
        let lastAssert = test.asserts[test.asserts.length - 1]
        if (!lastAssert) {
          test.asserts.push(data)
        } else {
          if (lastAssert.type === 'comment') {
            lastAssert.raw += '\n' + data.raw
          } else {
            test.asserts.push(data)
          }
        }
        this.setState({ tests: tests })
        break
      case 'result':
        let results = this.state.results
        results.push(data)
        this.setState({ results: results })
        break
      // editor Saved
      case 'clear':
        this.setState(this.getInitialState())
        break
    }
  },

  componentDidMount () {
    events.subscribe(this.handleTestEvents)

    // restore width
    let width = localStorage.getItem('trinity-width')
    if (!width) return
    // getRootElement().style.width = width + 'px'
  },

  componentDidUnmount () {
    events.unsubscribe(this.handleTestEvents)
  },

  render () {
    let tests = this.state.tests.map(test => <TestView test={ test } />)
    let success = 0
    let fail = 0

    this.state.tests.forEach(function (test) {
      test.asserts.forEach(function (assert) {
        if (assert.type === 'comment') return
        if (assert.ok) success += 1
        else fail += 1
      })
    })

    let failView = fail > 0
      ? <span className='badge badge-error'>{ fail }</span>
      : null

    return (
      <div className='inset-panel native-key-bindings tree-view-resizer' style={{ width: '100%', height: '100%' }} tabIndex={ -1 }>
        <div className='panel-heading'>
          Trinity
          <div className='inline-block' style={{ float: 'right' }}>
            { failView }
            <span className='badge badge-success'>{ success }</span>
          </div>
        </div>
        <div className='panel-body tree-view-scroller' style={{ padding: '0 12px 0 12px' }}>
          { tests }
          {/* HACK HACK */}
          {/* padding blocks, there's no doubt better CSS ways to solve this */}
          {/* this is done as some of the last content isn't shown and scrollbars don't appear until more content */}
          <div className='block'>&nbsp;</div>
          <div className='block'>&nbsp;</div>
        </div>
        <div className='tree-view-resize-handle'/>
      </div>
    )
  }
})

// let _rootEl
function getRootElement () {
  // if (_rootEl) return _rootEl
  return document.getElementById('trinity-root')
  // return _rootEl
}

export default App
