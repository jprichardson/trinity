'use babel'

import React, { PropTypes } from 'react'
import * as events from '../events'
window.events= events

const App = React.createClass({
  displayName: 'App',

  handleTestEvents ({ eventName, data }) {
    
  },

  componentDidMount () {
    events.subscribe(this.handleTestEvents)
  },

  componentDidUnmount () {
    events.unsubscribe(this.handleTestEvents)
  },

  render () {
    return (
      <div className='inset-panel'>
        <div className='panel-heading'>Trinity</div>
        <div className='panel-body padded'>
          some content from react
        </div>
      </div>
    )
  }
})

export default App
