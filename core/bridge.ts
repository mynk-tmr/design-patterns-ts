/**
 * Bridge Pattern
 *
 * Decouple an abstraction from its implementation so that the two can vary independently
 *
 * Use when classes vary in 2 dimensions
 */

//Implementation Hierarchy
interface Theme {
  apply(text: string): string
}

class LightTheme implements Theme {
  apply(text: string): string {
    return `\x1b[31m${text}\x1b[0m`
  }
}

class DarkTheme implements Theme {
  apply(text: string): string {
    return `\x1b[34m${text}\x1b[0m`
  }
}

// Abstraction Hierarchy
abstract class Shape {
  constructor(protected theme: Theme) {}
  abstract draw(): void
}

class Circle extends Shape {
  draw(): void {
    const ans = this.theme.apply(`${Math.PI * 4 * 4}`)
    console.log(`circle of area ${ans}`)
  }
}

class Rectangle extends Shape {
  draw(): void {
    const ans = this.theme.apply(`${4 * 4}`)
    console.log(`rectangle of area ${ans}`)
  }
}

//driver code
function client(shape: Shape) {
  shape.draw()
}

function main() {
  const circle = new Circle(new LightTheme())
  const rect = new Rectangle(new DarkTheme())
  client(circle)
  client(rect)
}

main()
