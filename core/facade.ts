/**
 * Facade Pattern
 *
 * Simplifies access to complex subsystems by providing a simplified interface to it
 */
class Facade {
  constructor(
    private subsystem1: Subsystem1,
    private subsystem2: Subsystem2
  ) {}
  public operation() {
    this.subsystem1.operation1()
    this.subsystem2.operation2()
  }
}

class Subsystem1 {
  public operation1() {
    console.log('Subsystem1: Operation1')
  }
}
class Subsystem2 {
  public operation2() {
    console.log('Subsystem2: Operation2')
  }
}

// Usage
function main() {
  const subsystem1 = new Subsystem1()
  const subsystem2 = new Subsystem2()
  const facade = new Facade(subsystem1, subsystem2)
  facade.operation()
}

main()
