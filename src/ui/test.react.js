'use babel'

import React, { PropTypes } from 'react'

const TestView = React.createClass({
  displayName: 'TestView',

  getDefaultProps () {
    return {
      test: {
        asserts: [],
        comments: [],
        data: {}
      }
    }
  },

  propTypes: {
    test: PropTypes.object
  },

  render () {
    return (
      <h3 className='block'>
        { this.props.test.data.name }
      </h3>
    )
  }
})

export default TestView
