'use strict'

import test from 'ava'
import PSwitch from '../src'

const isResolved = (p, ms = 20) =>
  new Promise(resolve => {
    p.then(() => resolve(true))
    setTimeout(() => resolve(false), ms)
  })

test('basic switch', async t => {
  const sw = new PSwitch()
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
  const sw = new PSwitch('truthy')

  t.true(sw.value)
  const pOn = sw.whenOn
  const pOff = sw.whenOff

  sw.set({ more: 'truthy' })

  t.true(sw.value)
  t.is(pOn, sw.whenOn)
  t.is(pOff, sw.whenOff)
})
