'use strict'

import test from 'ava'
import PSwitch from '../src'

const isResolved = (p, ms = 20) =>
  new Promise(resolve => {
    p.then(() => resolve(true))
    setTimeout(() => resolve(false), ms)
  })

test('switch not awaited', async t => {
  const sw = new PSwitch('a')
  t.is(sw.value, 'a')

  sw.set('b')
  t.is(sw.value, 'b')
})

test('basic switch', async t => {
  const sw = new PSwitch('a')

  const whenA = sw.when('a')
  const whenB = sw.when('b')
  t.is(sw.value, 'a')
  t.true(await isResolved(whenA))
  t.false(await isResolved(whenB))

  sw.set('a')
  t.false(await isResolved(whenB))

  sw.set('b')
  t.true(await isResolved(whenB))

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
