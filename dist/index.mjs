import Trigger from 'trigger';

class PSwitch {
  constructor (value) {
    this._on = undefined;
    this._whenOn = new Trigger();
    this._whenOff = new Trigger();
    this.set(value);
  }
  set (value) {
    if (this._on === !!value) return
    this._on = !!value;
    if (this._on) {
      this._whenOn.fire();
      this._whenOff = new Trigger();
    } else {
      this._whenOff.fire();
      this._whenOn = new Trigger();
    }
  }
  toggle () {
    this.set(!this._on);
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

export default PSwitch;
