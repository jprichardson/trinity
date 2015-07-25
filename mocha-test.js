var assert = require('assert')

/* global describe it */
// trinity: mocha

describe('some module description', function () {
  describe('someMethod()', function () {
    it('should do something', function () {
      console.log('hello')
      assert('something', 'gonna assert')
      console.dir({name: 'jp'})
      console.log('done')
    })
  })
})
