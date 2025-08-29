/**
 * Decorator Pattern
 *
 * Add additional behavior to an object without modifying its structure or signature
 *
 * Runtime extensibility
 */

class Demo {
  constructor(private args: number[] = []) {}
  add() {
    return this.args.reduce((acc, item) => acc + item, 0)
  }
  @withLog
  isSmaller(num: number) {
    console.log(
      `${num} is ${num < this.add() ? 'smaller' : 'bigger'} than demo's Sum`
    )
  }
}

function withPrint(Base: typeof Demo) {
  return class extends Base {
    print() {
      console.log(`Sum of args is ${this.add()}`)
    }
  }
}

function withLog<O, T, R>(method: (this: O, ...args: T[]) => R): typeof method {
  return function (...args) {
    console.log(`[LOG] Called ${method.name} with ${args}`)
    return method.apply(this, args)
  }
}

//driver code
function main() {
  const MyDemo = withPrint(Demo)
  const demo = new MyDemo([1, 2, 3])
  demo.print()
  demo.isSmaller(10)
}

main()
