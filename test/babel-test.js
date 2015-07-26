import test from 'tape'
import mm from '@mock-module'

test('test1: testing something', (t) => {
  console.log('yo\n dude')
  t.equal(mm(3, 4), 7, '3 + 4 == 7')
  console.error('hi')
  t.end()
})

test('test2: testing something else', (t) => {
  t.ok('it is ok', 'ok it is')
  t.equal(1, 1, '1 === 1')
  t.comment('hello')
  console.dir({name: 'jp', last: 'richardson'})
  console.log("{ name: 'jp', last: 'richardson' }")
  t.equal(1, 2, '1 !== 2')
  t.end()
})
