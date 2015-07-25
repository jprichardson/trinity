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
    test: PropTypes.object
  },

  render () {
    var icon = this.props.assert.ok
      ? <i className='icon icon-check text-success'></i>
      : <i className='icon icon-x text-error'></i>

    return (
      <li className='list-item'>
        { icon }
        { this.props.assert.name }
      </li>
    )
  }
})

export default AssertView
