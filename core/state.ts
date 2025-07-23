/**
 * lets an object change its behavior when its internal state changes.
 * Use when you need to if-else-if on a variable to determine behavior.
 */

abstract class State {
  context!: Context
  setContext(context: Context) {
    this.context = context
  }
  //utils methods
  abstract ring(): void
  abstract mute(): void
}

abstract class Context {
  protected state!: State
  transitionTo(state: State) {
    state.setContext(this)
    this.state = state
  }
}

class SilentState extends State {
  ring(): void {
    console.log('Vibrating ....')
  }
  mute(): void {
    console.log('Already in silent mode.')
  }
}

class RingingState extends State {
  ring(): void {
    console.log('Ringing ....')
  }
  mute(): void {
    this.context.transitionTo(new SilentState())
    console.log('Switched to silent mode.')
  }
}

class PhoneContext extends Context {
  onIncomingCall() {
    this.state.ring()
  }
  putOnMute() {
    this.state.mute()
  }
}

function main() {
  const phone = new PhoneContext()
  phone.transitionTo(new SilentState())
  phone.onIncomingCall() // Vibrating ....

  phone.transitionTo(new RingingState())
  phone.onIncomingCall() // Ringing ....

  phone.putOnMute()
  phone.onIncomingCall() // Vibrating ....

  phone.putOnMute()
  phone.onIncomingCall() // Vibrating ....
}

main()
