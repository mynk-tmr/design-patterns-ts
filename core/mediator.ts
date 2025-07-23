/**
 * Instead of talking directly, components send events to the mediator, which coordinates responses.
 */
interface Mediator {
  notify(event: Event, sender: Component): void
}

type Event = 'toggle' | 'input'

abstract class Component {
  protected mediator!: Mediator
  setMediator(mediator: Mediator) {
    this.mediator = mediator
  }
  notify(event: Event) {
    this.mediator.notify(event, this)
  }
}

class Checkbox extends Component {
  checked: boolean = false
  toggle() {
    this.checked = !this.checked
    console.log(`Checkbox toggled to: ${this.checked}`)
    super.notify('toggle')
  }
}

class TextInput extends Component {
  private text: string = ''
  setText(text: string) {
    this.text = text
    console.log(`TextInput set to: ${text}`)
  }
  transform(type: 'L' | 'U') {
    if (type === 'U') this.setText(this.text.toUpperCase())
    else this.setText(this.text.toLowerCase())
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
  notify(event: Event, _sender: Component): void {
    switch (event) {
      case 'toggle':
        this.handleToggle()
    }
  }
  private handleToggle() {
    if (this.checkbox.checked) {
      console.log('Uppercasing text input due to checkbox toggle.')
      this.textInput.transform('U')
    } else {
      console.log('Lowercasing text input due to checkbox toggle.')
      this.textInput.transform('L')
    }
  }
}

// Example usage
function main() {
  const checkbox = new Checkbox()
  const textInput = new TextInput()
  textInput.setText('jon snow is dead')
  new Router(checkbox, textInput)

  checkbox.toggle() // Toggles checkbox and updates text input to uppercase
  textInput.setText('Hello World') // Sets initial text
  checkbox.toggle() // Toggles checkbox and updates text input to lowercase
}

main() // Run the example
