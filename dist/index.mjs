import Trigger from 'trigger';

const priv = Symbol('priv');
class PSwitch {
  constructor (value) {
    Object.defineProperty(this, priv, {
      value: {
        value,
        triggers: new Map()
      }
    });
    getTrigger(this, value).fire();
  }
  set (value) {
    const p = this[priv];
    if (value === p.value) return
    p.triggers.delete(p.value);
    p.value = value;
    getTrigger(this, value).fire();
  }
  when (value) {
    return new Promise(resolve => getTrigger(this, value).then(resolve))
  }
  get value () {
    return this[priv].value
  }
}
function getTrigger (sw, value) {
  const p = sw[priv];
  let trg = p.triggers.get(value);
  if (trg) return trg
  trg = new Trigger();
  p.triggers.set(value, trg);
  return trg
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

export default PSwitch;
