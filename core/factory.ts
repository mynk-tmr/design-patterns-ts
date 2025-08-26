/**
 * Factory Pattern
 *
 * Creates objects without specifying their concrete classes.
 * Subclasses decide which objects to create.
 */

interface Shape {
  draw(): void
}

interface ShapeFactory {
  area: number
  create(): Shape
}

class CircleFactory implements ShapeFactory {
  area: number = 0
  setRadius(value: number) {
    this.area = Math.PI * value * value
    this.area = Math.round(this.area * 100) / 100
  }
  create(): Shape {
    const draw = () => console.log(`circle:: ${this.area}`)
    return { draw }
  }
}

class RectangleFactory implements ShapeFactory {
  area: number = 0
  setDimensions(value: [number, number]) {
    this.area = value[0] * value[1]
  }
  create(): Shape {
    const draw = () => console.log(`rectangle:: ${this.area}`)
    return { draw }
  }
}

//driver code
function client(factory: ShapeFactory) {
  const shape = factory.create()
  shape.draw()
  console.log('✅ shape drawn. Now cleaning up...')
}

function main() {
  const circle = new CircleFactory()
  const rect = new RectangleFactory()
  circle.setRadius(10)
  rect.setDimensions([10, 20])
  client(circle)
  client(rect)
}

main()
