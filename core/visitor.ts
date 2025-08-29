/**
 * Visitor Pattern
 *
 * remove processing functionality from objects and move it to a separate class
 *
 * Visitor implements "double dispatch".
 */

interface ShapeVisitor {
  visitCircle(circle: Circle): void
  visitSquare(rectangle: Square): void
}

interface Shape {
  accept(visitor: ShapeVisitor): void
}

class Circle implements Shape {
  constructor(public readonly radius: number) {}
  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this)
  }
}

class Square implements Shape {
  constructor(public readonly side: number) {}
  accept(visitor: ShapeVisitor): void {
    visitor.visitSquare(this)
  }
}

class Calculator implements ShapeVisitor {
  public area = 0
  public peri = 0

  visitCircle(circle: Circle): void {
    this.area += Math.PI * Math.pow(circle.radius, 2)
    this.peri += 2 * Math.PI * circle.radius
  }

  visitSquare(square: Square): void {
    this.area += square.side * square.side
    this.peri += 4 * square.side
  }
}

//driver code

function main() {
  const calc = new Calculator()
  const shapes: Shape[] = [
    new Circle(7),
    new Circle(14),
    new Square(7),
    new Square(4)
  ]

  shapes.forEach((shape) => shape.accept(calc))
  console.log('Area :: ', calc.area)
  console.log('Peri :: ', calc.peri)
}

main()
