var test = require('tape')

test('testing something', function (t) {
  t.assert(true, 'testing')
  t.end()
})

test('testing something else', function (t) {
  t.ok('it is ok', 'ok it is')
  t.equal(1, 1, '1 === 1')
  t.equal(1, 2, '1 !== 2')
  t.end()
})
