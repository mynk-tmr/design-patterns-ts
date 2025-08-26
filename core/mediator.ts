/**
 * Mediator Pattern
 *
 * Instead of talking directly to each other, the Mediator
 * coordinates the communication between the components
 */

interface Mediator {
  notify(event: 'toggle' | 'input', sender: Component): void
  handleToggle(): void
  handleInput(): void
}

abstract class Component {
  protected mediator!: Mediator
  setMediator(mediator: Mediator) {
    this.mediator = mediator
  }
  notify(event: 'toggle' | 'input'): void {
    this.mediator.notify(event, this)
  }
}

class Checkbox extends Component {
  checked = false
  toggle() {
    this.checked = !this.checked
    this.notify('toggle')
  }
}

class TextInput extends Component {
  value = ''
  setText(value: string) {
    this.value = value
    this.notify('input')
  }
  upper() {
    this.setText(this.value.toUpperCase())
  }
  lower() {
    this.setText(this.value.toLowerCase())
  }
}

class Router implements Mediator {
  constructor(
    private checkbox: Checkbox,
    private textInput: TextInput
  ) {
    this.checkbox.setMediator(this)
    this.textInput.setMediator(this)
  }
  notify(event: 'toggle' | 'input'): void {
    if (event === 'toggle') this.handleToggle()
    else if (event === 'input') this.handleInput()
  }
  handleToggle() {
    console.log(
      `Checkbox is ${this.checkbox.checked ? '✅ checked' : '⛔ unchecked'}`
    )
    if (this.checkbox.checked) this.textInput.upper()
    else this.textInput.lower()
  }
  handleInput() {
    console.log(`Text is ${this.textInput.value}`)
  }
}

//driver code

function main() {
  const checkbox = new Checkbox()
  const textInput = new TextInput()
  new Router(checkbox, textInput)
  while (true) {
    const command = prompt('Toggle[1] Input[2] Exit[3] ->')
    if (command === '1') checkbox.toggle()
    else if (command === '2') textInput.setText(prompt('Enter text :: ') || '')
    else if (command === '3') return
  }
}

main()
