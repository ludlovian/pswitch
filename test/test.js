'use strict'

import test from 'ava'
import PSwitch from '../src'

const isResolved = (p, ms = 20) =>
  new Promise(resolve => {
    p.then(() => resolve(true))
    setTimeout(() => resolve(false), ms)
  })

test('basic binary switch', async t => {
  const sw = new PSwitch.Binary()
  t.false(sw.value)
  t.true(await isResolved(sw.whenOff))
  t.false(await isResolved(sw.whenOn))

  const pOn = sw.whenOn

  sw.toggle()
  t.true(sw.value)
  t.true(await isResolved(pOn))
  t.false(await isResolved(sw.whenOff))
  t.true(await isResolved(sw.whenOn))
})

test('basic switch', async t => {
  const sw = new PSwitch('a')
  t.is(sw.value, 'a')
  t.false(await isResolved(sw.when('b')))
  t.true(await isResolved(sw.when('a')))

  sw.set('a')
  t.false(await isResolved(sw.when('b')))
  t.true(await isResolved(sw.when('a')))

  sw.set('b')
  t.false(await isResolved(sw.when('a')))
  t.true(await isResolved(sw.when('b')))
})

test('multiple values', async t => {
  const sw = new PSwitch(1)
  t.is(sw.value, 1)
  t.true(await isResolved(sw.when(1)))
  t.false(await isResolved(sw.when(2)))
  t.false(await isResolved(sw.when(3)))

  sw.set(2)
  t.is(sw.value, 2)
  t.false(await isResolved(sw.when(1)))
  t.true(await isResolved(sw.when(2)))
  t.false(await isResolved(sw.when(3)))

  sw.set(3)
  t.is(sw.value, 3)
  t.false(await isResolved(sw.when(1)))
  t.false(await isResolved(sw.when(2)))
  t.true(await isResolved(sw.when(3)))
})
