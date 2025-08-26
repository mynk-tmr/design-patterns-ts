/**
 * State Pattern
 *
 * Allows an object to alter its behaviour when its state changes
 *
 * Simplifies complex if-else-if statements
 */

abstract class State {
  public context!: Context
  abstract ring(): void
  abstract mute(): void
  abstract unmute(): void
}

abstract class Context {
  state!: State
  transitionTo(state: State) {
    this.state = state
    this.state.context = this
  }
}

class SilentState extends State {
  ring() {
    console.log('🎧 vibrating ....')
  }
  mute() {
    console.log('🎧 already muted')
  }
  unmute() {
    this.context.transitionTo(new RingingState())
  }
}

class RingingState extends State {
  ring() {
    console.log('🎵 playing ringtone ...')
  }
  mute() {
    this.context.transitionTo(new SilentState())
  }
  unmute() {
    console.log('🎧 already unmuted')
  }
}

class Phone extends Context {
  constructor() {
    super()
    this.transitionTo(new RingingState())
  }
  call() {
    this.state.ring()
  }
  settings(props: { mute: boolean }) {
    if (props.mute) {
      this.state.mute()
    } else {
      this.state.unmute()
    }
  }
}

function main() {
  const phone = new Phone()
  let ch = true
  while (ch) {
    phone.call()
    phone.settings({ mute: confirm('\nMute?') })
    ch = confirm('\nGet another call?')
  }
}
main()
