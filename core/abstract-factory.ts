/**
 * Abstract Factory Pattern
 *
 * Create families of related objects without specifying their concrete classes.
 */

namespace UI {
  export interface Button {
    click(): void
  }
  export interface Checkbox {
    check(): void
  }
}

interface AbstractUIFactory {
  createButton(): UI.Button
  createCheckbox(): UI.Checkbox
}

class Win32UIFactory implements AbstractUIFactory {
  createButton(): UI.Button {
    return { click: () => console.log('Win32 button clicked') }
  }
  createCheckbox(): UI.Checkbox {
    return { check: () => console.log('Win32 checkbox checked') }
  }
}

class MacOSUIFactory implements AbstractUIFactory {
  createButton(): UI.Button {
    return { click: () => console.log('MacOS button clicked') }
  }
  createCheckbox(): UI.Checkbox {
    return { check: () => console.log('MacOS checkbox checked') }
  }
}

// driver code
function client(factory: AbstractUIFactory) {
  const button = factory.createButton()
  const checkbox = factory.createCheckbox()
  button.click()
  checkbox.check()
}

function main() {
  client(
    process.platform === 'win32' ? new Win32UIFactory() : new MacOSUIFactory()
  )
}

main()
