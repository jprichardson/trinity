'use babel'

import { EventEmitter } from 'events'

var ee = new EventEmitter()

export function publish (eventName, data) {
  ee.emit('event', { eventName, data })
}

export function subscribe (callback) {
  ee.on('event', callback)
}

export function unsubscribe (callback) {
  ee.off('event', callback)
}
