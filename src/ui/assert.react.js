'use babel'

import React, { PropTypes } from 'react'

const AssertView = React.createClass({
  displayName: 'AssertView',

  getDefaultProps () {
    return {
      assert: {}
    }
  },

  propTypes: {
    assert: PropTypes.object
  },

  render () {
    var icon = this.props.assert.ok
      ? <i className='icon icon-check text-success'></i>
      : <i className='icon icon-x text-error'></i>

    var content = this.props.assert.type === 'comment'
      ? <pre className='test-comment'>{ this.props.assert.raw }</pre>
      : <span>{ icon }{ this.props.assert.name }</span>

    return (
      <li className='list-item'>
        { content }
      </li>
    )
  }
})

export default AssertView
