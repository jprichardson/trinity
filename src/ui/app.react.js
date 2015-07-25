'use babel'

// this is the antithesis of how a React application should be made

import React, { PropTypes } from 'react'
import * as events from '../events'
import TestView from './test.react'
window.events= events

const App = React.createClass({
  displayName: 'AppView',

  getInitialState () {
    return { tests: [], results: {} }
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
        results = this.state.results
        results.push(results)
        this.setState({ results: results })
        break
    }
  },

  componentDidMount () {
    events.subscribe(this.handleTestEvents)
  },

  componentDidUnmount () {
    events.unsubscribe(this.handleTestEvents)
  },

  componentWillUpdate () {

  },

  render () {
    let tests = this.state.tests.map(test => <TestView test={ test } />)

    return (
      <div className='inset-panel'>
        <div className='panel-heading'>Trinity</div>
        <div className='panel-body padded'>
          { tests }
        </div>
      </div>
    )
  }
})

export default App
