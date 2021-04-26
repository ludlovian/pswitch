import { test } from 'uvu'
import * as assert from 'uvu/assert'

import promiseGoodies from 'promise-goodies'

import PSwitch from '../src/index.mjs'

promiseGoodies()

test('switch not awaited', async () => {
  const sw = new PSwitch('a')
  assert.is(sw.value, 'a')

  sw.set('b')
  assert.is(sw.value, 'b')
})

test('basic switch', async () => {
  const sw = new PSwitch('a')

  const whenA = sw.when('a')
  const whenB = sw.when('b')
  assert.is(sw.value, 'a')
  assert.ok(await whenA.isResolved())
  assert.not.ok(await whenB.isResolved())

  sw.set('a')
  assert.not.ok(await whenB.isResolved())

  sw.set('b')
  assert.ok(await whenB.isResolved())

  assert.not.ok(await sw.when('a').isResolved())
  assert.ok(await sw.when('b').isResolved())
})

test('multiple values', async () => {
  const sw = new PSwitch(1)
  assert.is(sw.value, 1)
  assert.ok(await sw.when(1).isResolved())
  assert.not.ok(await sw.when(2).isResolved())
  assert.not.ok(await sw.when(3).isResolved())

  sw.set(2)
  assert.is(sw.value, 2)
  assert.not.ok(await sw.when(1).isResolved())
  assert.ok(await sw.when(2).isResolved())
  assert.not.ok(await sw.when(3).isResolved())

  sw.set(3)
  assert.is(sw.value, 3)
  assert.not.ok(await sw.when(1).isResolved())
  assert.not.ok(await sw.when(2).isResolved())
  assert.ok(await sw.when(3).isResolved())
})

test.run()
