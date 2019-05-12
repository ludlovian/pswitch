'use strict'

import test from 'ava'
import PSwitch from '../src'

const isResolved = (p, ms = 20) =>
  new Promise(resolve => {
    p.then(() => resolve(true))
    setTimeout(() => resolve(false), ms)
  })

test('basic switch', async t => {
  const sw = new PSwitch.Binary()
  t.false(sw.value)
  t.true(await isResolved(sw.whenOff))
  t.false(await isResolved(sw.whenOn))

  const pOn = sw.whenOn

  sw.toggle()
  t.true(sw.value)
  t.is(pOn, sw.whenOn)
  t.false(await isResolved(sw.whenOff))
  t.true(await isResolved(sw.whenOn))
})

test('redundant set', async t => {
  const sw = new PSwitch(true)

  t.true(sw.value)
  const pOn = sw.whenOn
  const pOff = sw.whenOff

  sw.set(true)

  t.true(sw.value)
  t.is(pOn, sw.whenOn)
  t.is(pOff, sw.whenOff)
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
