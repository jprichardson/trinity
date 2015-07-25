'use babel'

// this is the antithesis of how a React application should be made

import React from 'react'
import * as events from '../events'
import TestView from './test.react'
import _debug from '../bdebug'

const debug = _debug('trinity:ui:app')

const App = React.createClass({
  displayName: 'AppView',

  getInitialState () {
    return { tests: [], results: [], dragData: {} }
  },

  handleDragStart ({ pageX }) {
    let rootEl = document.getElementById('trinity-root')
    this.setState({ dragData: {
      dragging: true,
      pageX: pageX,
      width: rootEl.offsetWidth
    }})
  },

  handleDragMove ({ pageX }) {
    let dragData = this.state.dragData
    if (!dragData.dragging) return
    let rootEl = document.getElementById('trinity-root')
    let offset = pageX - dragData.pageX
    let newWidth = dragData.width - offset
    rootEl.style.width = newWidth + 'px'
  },

  handleDragEnd ({ pageX }) {
    this.setState({ dragData: {
      dragging: false
    }})
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
        results.push(results)
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
    document.addEventListener('mousemove', this.handleDragMove)
    document.addEventListener('mouseup', this.handleDragEnd)
  },

  componentDidUnmount () {
    events.unsubscribe(this.handleTestEvents)
    document.removeEventListener('mousemove', this.handleDragMove)
    document.removeEventListener('mouseup', this.handleDragEnd)
  },

  render () {
    let tests = this.state.tests.map(test => <TestView test={ test } />)

    return (
      <div className='inset-panel tree-view-resizer' style={{ width: '100%' }}>
        <div className='panel-heading'>Trinity</div>
        <div className='panel-body tree-view-scroller' style={{ padding: '0 12px 0 12px' }}>
          { tests }
        </div>
        <div className='tree-view-resize-handle' onMouseDown={ this.handleDragStart }/>
      </div>
    )
  }
})

export default App
