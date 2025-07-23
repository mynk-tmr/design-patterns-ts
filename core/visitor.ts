/**
 * Visitor lets you add operations to a class hierarchy without modifying the classes themselves. It centralizes behavior into visitor classes using double dispatch.
 */

interface Visitor {
  visitCircle(circle: Circle): void
  visitSquare(square: Square): void
}

//invite method is mandatory
interface Shape {
  invite(visitor: Visitor): void
}

class Circle implements Shape {
  constructor(public radius: number) {}
  //generic dispatch
  invite(visitor: Visitor): void {
    visitor.visitCircle(this) //specific dispatch
  }
}

class Square implements Shape {
  constructor(public sideLength: number) {}
  invite(visitor: Visitor): void {
    visitor.visitSquare(this)
  }
}

class AreaCalculator implements Visitor {
  totalArea = 0
  visitCircle(circle: Circle): void {
    this.totalArea += Math.PI * circle.radius * circle.radius
  }
  visitSquare(square: Square): void {
    this.totalArea += square.sideLength * square.sideLength
  }
}

class PerimeterCalculator implements Visitor {
  totalPerimeter = 0
  visitCircle(circle: Circle): void {
    this.totalPerimeter += 2 * Math.PI * circle.radius
  }
  visitSquare(square: Square): void {
    this.totalPerimeter += 4 * square.sideLength
  }
}

// Example usage
function main() {
  const shapes: Shape[] = [new Circle(5), new Square(4), new Circle(3)]

  const areaCalculator = new AreaCalculator()
  const perimeterCalculator = new PerimeterCalculator()

  for (const shape of shapes) {
    shape.invite(areaCalculator)
    shape.invite(perimeterCalculator)
  }

  console.log(`Total Area: ${areaCalculator.totalArea}`)
  console.log(`Total Perimeter: ${perimeterCalculator.totalPerimeter}`)
}

main()
