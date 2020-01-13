'use strict';

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
    if (value === this.value) return Promise.resolve()
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

module.exports = PSwitch;
