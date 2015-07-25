'use babel'

import React, { PropTypes } from 'react'
import AssertView from './assert.react'

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
      <div className='block'>
        <h3>{ this.props.test.data.name }</h3>
        <ul className='list-group'>
          { this.props.test.asserts.map(assert => <AssertView assert = { assert } />) }
        </ul>
      </div>
    )
  }
})

export default TestView
