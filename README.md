# pswitch
Awaitable switch

## API

### PSwitch
`sw = new PSwitch(initialState)`

Creates a multivariate switch, which can have any values

### .set
`sw.set(newState)`

Sets the state of the switch to a new value

### .value
`isSwitchOn = sw.value`

Gets the current value of the switch

### .when
`await sw.when(true)`

A promise which resolves when the switch is set to this value
