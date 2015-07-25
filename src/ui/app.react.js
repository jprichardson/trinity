'use babel'

// this is the antithesis of how a React application should be made

import React from 'react'
import * as events from '../events'
import TestView from './test.react'

const App = React.createClass({
  displayName: 'AppView',

  getInitialState () {
    return { tests: [], results: {}, dragData: {} }
  },

  handleTestEvents ({ eventName, data }) {
    let tests = this.state.tests
    let test
    switch (eventName) {
      case 'test':
        test = { asserts: [], comments: [], data: data }
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
        test.comments.push(data)
        this.setState({ tests: tests })
        break
      case 'result':
        let results = this.state.results
        results.push(results)
        this.setState({ results: results })
        break
    }
  },

  componentDidMount () {
    events.subscribe(this.handleTestEvents)

    var self = this
    document.addEventListener('mousemove', function ({ pageX }) {
      let dragData = self.state.dragData
      if (!dragData.dragging) return
      let rootEl = document.getElementById('trinity-root')
      let offset = pageX - dragData.pageX
      let newWidth = dragData.width - offset
      rootEl.style.width = newWidth + 'px'
    })

    document.addEventListener('mouseup', function ({ pageX }) {
      self.setState({ dragData: {
        dragging: false
      }})
    })
  },

  componentDidUnmount () {
    events.unsubscribe(this.handleTestEvents)
  },

  dragStart ({ pageX }) {
    let rootEl = document.getElementById('trinity-root')
    this.setState({ dragData: {
      dragging: true,
      pageX: pageX,
      width: rootEl.offsetWidth
    }})
  },

  render () {
    let tests = this.state.tests.map(test => <TestView test={ test } />)

    return (
      <div className='inset-panel tree-view-resizer' style={{ width: '100%' }}>
        <div className='panel-heading'>Trinity</div>
        <div className='panel-body padded tree-view-scroller'>
          { tests }
        </div>
        <div className='tree-view-resize-handle' onMouseDown={ this.dragStart }/>
      </div>
    )
  }
})

export default App
