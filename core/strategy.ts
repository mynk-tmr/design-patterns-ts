/**
 * Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 * Strategies are decoupled from those who use it
 */

interface Strategy<T> {
  name: string
  execute(data: T[], filter: T[]): T[]
}

class Context<T> {
  constructor(protected strategy: Strategy<T>) {}
  changeStrategy(strategy: Strategy<T>) {
    this.strategy = strategy
  }
}

class ArrayStrategy<T> implements Strategy<T> {
  name = 'Array Strategy'
  execute(data: T[], filter: T[]): T[] {
    return data.filter((item) => !filter.includes(item))
  }
}

class SetStrategy<T> implements Strategy<T> {
  name = 'Set Strategy'
  execute(data: T[], filter: T[]): T[] {
    return new Set(data).difference(new Set(filter)).values().toArray()
  }
}

class RunThis<T> extends Context<T> {
  diff(data: T[], filter: T[]): T[] {
    const t = performance.now()
    const res = this.strategy.execute(data, filter)
    console.log(
      `Time taken by ${this.strategy.name} :: ${performance.now() - t} ms`
    )
    return res
  }
}

function client() {
  const context = new RunThis<string>(new ArrayStrategy())
  const data = getData()
  const filter = getFilter()
  const result = context.diff(data, filter)
  console.log(result)
  context.changeStrategy(new SetStrategy())
  const result2 = context.diff(data, filter)
  console.log(result2)
}

client()

//data
function getData() {
  const data = [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
    'honeydew',
    'kiwi',
    'lemon',
    'mango',
    'nectarine',
    'orange',
    'peach',
    'quince',
    'raspberry',
    'strawberry',
    'tomato',
    'ugli',
    'vanilla',
    'watermelon',
    'xigua',
    'yellow',
    'zucchini',
    'aardvark',
    'badger',
    'camel',
    'cat',
    'dog',
    'elephant',
    'fox',
    'goat',
    'hippo',
    'iguana',
    'jaguar',
    'kangaroo',
    'lemur',
    'monkey',
    'narwhal',
    'octopus',
    'panda',
    'penguin',
    'quokka',
    'raccoon',
    'sloth',
    'tiger',
    'unicorn',
    'vulture',
    'wolverine',
    'xerus',
    'yak',
    'zebra',
    'aardvark',
    'badger',
    'camel',
    'cat',
    'dog',
    'elephant',
    'fox',
    'goat',
    'hippo',
    'iguana',
    'jaguar',
    'kangaroo',
    'lemur',
    'monkey',
    'narwhal',
    'octopus',
    'panda',
    'penguin',
    'quokka',
    'raccoon',
    'sloth',
    'tiger',
    'unicorn',
    'vulture',
    'wolverine',
    'xerus',
    'yak',
    'zebra',
    'aardvark',
    'badger',
    'camel',
    'cat',
    'dog',
    'elephant',
    'fox',
    'goat',
    'hippo',
    'iguana',
    'jaguar',
    'kangaroo',
    'lemur',
    'monkey',
    'narwhal',
    'octopus',
    'panda',
    'penguin',
    'quokka',
    'raccoon',
    'sloth',
    'tiger',
    'unicorn',
    'vulture',
    'wolverine',
    'xerus',
    'yak',
    'zebra',
    'aardvark',
    'badger',
    'camel',
    'cat',
    'dog',
    'elephant',
    'fox'
  ]
  return data
}

function getFilter() {
  const filter = [
    'banana',
    'date',
    'unicorn',
    'lemon',
    'mango',
    'nectarine',
    'orange',
    'peach',
    'quince',
    'raspberry',
    'strawberry',
    'tomato',
    'ugli',
    'vanilla',
    'watermelon',
    'xigua',
    'yellow',
    'zucchini',
    'aardvark',
    'badger',
    'camel',
    'cat'
  ]
  return filter
}
