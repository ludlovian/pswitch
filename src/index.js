'use strict'

import trigger from 'trigger'

// PSwitch
//
// A promise-base binary switch. You can `await` the switch being flicked
//

export default class PSwitch {
  constructor (value) {
    this._on = undefined
    this._whenOn = trigger()
    this._whenOff = trigger()
    this.set(value)
  }

  set (value) {
    if (this._on === !!value) return
    this._on = !!value
    if (this._on) {
      this._whenOn.fire()
      this._whenOff = trigger()
    } else {
      this._whenOff.fire()
      this._whenOn = trigger()
    }
  }

  toggle () {
    this.set(!this._on)
  }

  get whenOn () {
    return this._whenOn
  }

  get whenOff () {
    return this._whenOff
  }

  get value () {
    return this._on
  }
}
