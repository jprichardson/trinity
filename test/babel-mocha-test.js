import assert from 'assert'
import mm from '@mock-module'

/* global describe it */
// trinity: mocha

describe('some module description', function () {
  describe('someMethod()', function () {
    it('should do something', function () {
      console.log('hello')
      assert('something', 'gonna assert')
      console.dir({name: 'jp'})
      assert.equal(mm(4, 4), 7)
      console.log('done')
    })
  })
})
