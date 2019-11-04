'use strict';

const resolved = Promise.resolve();
class PSwitch {
  constructor (value) {
    this.value = value;
    this.awaiters = new Map();
  }
  set (value) {
    if (value === this.value) return
    this.value = value;
    const callbacks = this.awaiters.get(value);
    if (!callbacks) return
    callbacks.forEach(callback => callback());
    this.awaiters.delete(value);
  }
  when (value) {
    if (value === this.value) return resolved
    return new Promise(resolve => {
      const callbacks = this.awaiters.get(value);
      if (callbacks) {
        callbacks.push(resolve);
      } else {
        this.awaiters.set(value, [resolve]);
      }
    })
  }
}
class BinaryPSWitch extends PSwitch {
  constructor (value) {
    super(Boolean(value));
  }
  set (value) {
    super.set(Boolean(value));
  }
  when (value) {
    return super.when(Boolean(value))
  }
  toggle () {
    this.set(!this.value);
  }
  get whenOn () {
    return this.when(true)
  }
  get whenOff () {
    return this.when(false)
  }
}
PSwitch.Binary = BinaryPSWitch;

module.exports = PSwitch;
