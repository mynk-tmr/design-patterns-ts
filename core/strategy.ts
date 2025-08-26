/**
 * Strategy Pattern
 *
 * Lets you define a family of algorithms, encapsulate each one, and make them interchangeable.
 */

interface Strategy {
  title: string
  execute(data: string[], filter: string[]): string[]
}

class Context {
  protected strat!: Strategy
  constructor(protected data: string[]) {}
  changeStrategy(strat: Strategy) {
    this.strat = strat
  }
  getCommon(filter: string[]) {
    console.log('Filtering using', this.strat.title)
    return this.strat.execute(this.data, filter)
  }
}

class ArrayStrategy implements Strategy {
  title = 'ArrayStrategy'
  execute(data: string[], filter: string[]): string[] {
    return data.filter((item) => filter.includes(item))
  }
}

class SetStrategy implements Strategy {
  title = 'SetStrategy'
  execute(data: string[], filter: string[]): string[] {
    const set = new Set(data)
    const fset = new Set(filter)
    return set.intersection(fset).values().toArray()
  }
}

// Usage
function main() {
  const data = 'abcdefgdcbxyz'.split('')
  const filter = 'cde'.split('')
  const context = new Context(data)
  context.changeStrategy(new ArrayStrategy())
  console.log(context.getCommon(filter))
  context.changeStrategy(new SetStrategy())
  console.log(context.getCommon(filter))
}

main()
