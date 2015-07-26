var test = require('tape')

test('test1: testing something', function (t) {
  console.log('yo\n dude')
  t.equal(1, 2, '1 !== 2')
  t.assert(true, 'testing')
  console.error('hi')
  t.end()
})

test('test2: testing something else', function (t) {
  t.ok('it is ok', 'ok it is')
  t.equal(1, 1, '1 === 1')
  t.comment('hello')
  console.dir({name: 'jp', last: 'richardson'})
  console.log("{ name: 'jp', last: 'richardson' }")
  t.equal(1, 2, '1 !== 2')
  t.end()
})
