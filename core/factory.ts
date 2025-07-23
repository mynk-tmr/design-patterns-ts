/**
 * Factory pattern lets you create objects without specifying their concrete classes.
 * Subclasses can be used to create specific types of objects.
 * Useful for creating objects based on some input or configuration.
 */

interface Shape {
  draw(): void
}

interface ShapeFactory {
  createShape(): Shape
}

class CircleFactory implements ShapeFactory {
  createShape(): Shape {
    return { draw: () => console.log('Drawing a Circle') }
  }
}

class SquareFactory implements ShapeFactory {
  createShape(): Shape {
    return { draw: () => console.log('Drawing a Square') }
  }
}

class Client {
  constructor(private factory: ShapeFactory) {}
  changeFactory(factory: ShapeFactory) {
    this.factory = factory
  }
  animate() {
    const shape = this.factory.createShape()
    shape.draw()
    console.log(`Animating shape...`)
  }
}

function main() {
  const client = new Client(new CircleFactory())
  client.animate() // Output: Drawing a Circle
  client.changeFactory(new SquareFactory())
  client.animate() // Output: Drawing a Square
}

main()
