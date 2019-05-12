import Trigger from 'trigger';

class PSwitch {
  constructor (value) {
    this._value = undefined;
    this._triggers = new Map();
    this.set(value);
  }
  set (value) {
    let prevTrg = this._triggers.get(this._value);
    if (prevTrg) {
      if (value === this._value) return
      this._triggers.set(this._value, new Trigger());
    }
    this._value = value;
    this.when(value).fire();
  }
  when (value) {
    let trg = this._triggers.get(value);
    if (!trg) {
      trg = new Trigger();
      this._triggers.set(value, trg);
    }
    return trg
  }
  get value () {
    return this._value
  }
}
class BinaryPSWitch extends PSwitch {
  set (value) {
    super.set(Boolean(value));
  }
  when (value) {
    return super.when(Boolean(value))
  }
  toggle () {
    this.set(!this._on);
  }
  get whenOn () {
    return this.when(true)
  }
  get whenOff () {
    return this.when(false)
  }
}
PSwitch.Binary = BinaryPSWitch;

export default PSwitch;
