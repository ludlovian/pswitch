'use strict'

import test from 'ava'
import promiseGoodies from 'promise-goodies'
import PSwitch from '../src'

promiseGoodies()

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
  t.true(await whenA.isResolved())
  t.false(await whenB.isResolved())

  sw.set('a')
  t.false(await whenB.isResolved())

  sw.set('b')
  t.true(await whenB.isResolved())

  t.false(await sw.when('a').isResolved())
  t.true(await sw.when('b').isResolved())
})

test('multiple values', async t => {
  const sw = new PSwitch(1)
  t.is(sw.value, 1)
  t.true(await sw.when(1).isResolved())
  t.false(await sw.when(2).isResolved())
  t.false(await sw.when(3).isResolved())

  sw.set(2)
  t.is(sw.value, 2)
  t.false(await sw.when(1).isResolved())
  t.true(await sw.when(2).isResolved())
  t.false(await sw.when(3).isResolved())

  sw.set(3)
  t.is(sw.value, 3)
  t.false(await sw.when(1).isResolved())
  t.false(await sw.when(2).isResolved())
  t.true(await sw.when(3).isResolved())
})
