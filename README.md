# pswitch
Awaitable switch

## API

### PSwitch
`sw = new PSwitch(initialState)`

Creates a switch.

### PSwitch#set
`sw.set(newState)`

Sets the (Boolean) state of the switch

### PSwitch#value
`isSwitchOn = sw.value`

Gets the current (Boolean) value of the switch

### PSwitch#whenOn
`await sw.whenOn`

A promise which resolves when the switch is turned on.

### PSwitch#whenOff
`await sw.whenOff`

A promise which resolves when the switch is turned off
