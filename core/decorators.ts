/**
 * add new functionality to an existing object without modifying its structure.
 * This is useful for extending classes at runtime.
 */

type Construct<T = {}> = new (...args: any[]) => T

function Decorator<TBase extends Construct>(Base: TBase) {
  return class extends Base {
    newMethod() {
      console.log('New method added by decorator!')
    }
  }
}

function logger<T>(method: Function) {
  return function (this: T, ...args: any[]) {
    const t = performance.now()
    const result = method.apply(this, args)
    console.log(`Result computed in ${performance.now() - t} ms`)
    return result
  }
}

class Example {
  existingMethod() {
    console.log('Existing method in the class.')
  }
  @logger //needs bunx tsx
  computeSomething(a: number, b: number) {
    return a + b
  }
}

const DecoratedExample = Decorator(Example)

function main() {
  const example = new DecoratedExample()
  example.existingMethod() // Existing method in the class.
  example.newMethod() // New method added by decorator!
  const result = example.computeSomething(5, 10) // Result computed in X ms
  console.log(`Computed result: ${result}`) // Computed result: 15
}
main()
