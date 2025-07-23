/**
 * Abstract Factory Pattern
 * This pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.
 * Use when object creations depend on runtime conditions
 */

namespace UI {
  export interface Button {
    click(): void
  }
  export interface Checkbox {
    check(): void
  }
}

abstract class AbstractUIFactory {
  abstract createButton(): UI.Button
  abstract createCheckbox(): UI.Checkbox
}

class WindowsUIFactory extends AbstractUIFactory {
  createButton(): UI.Button {
    return { click: () => console.log('Windows Button Clicked') }
  }
  createCheckbox(): UI.Checkbox {
    return { check: () => console.log('Windows Checkbox Checked') }
  }
}

class MacOSUIFactory extends AbstractUIFactory {
  createButton(): UI.Button {
    return { click: () => console.log('MacOS Button Clicked') }
  }
  createCheckbox(): UI.Checkbox {
    return { check: () => console.log('MacOS Checkbox Checked') }
  }
}

function getFactory() {
  return process.platform === 'win32'
    ? new WindowsUIFactory()
    : new MacOSUIFactory()
}

function main() {
  const factory = getFactory()
  const button = factory.createButton()
  const checkbox = factory.createCheckbox()
  button.click()
  checkbox.check()
}

main()
