'use babel'

import React, { PropTypes } from 'react'

const App = React.createClass({
  displayName: 'App',

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
