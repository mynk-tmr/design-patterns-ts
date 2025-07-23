/**
 * Bridge pattern allows you to avoid class explosion, by switching from inheritance to composition
 * If you have too many variants of a class, you need Bridge
 *
 */

//Implementation : defines primitives
interface Implementation {
  data: string
  load(): Promise<void>
}

// 🔌 Abstraction -> uses Implementation's fields to achieve tasks.
abstract class Abstraction {
  constructor(protected impl: Implementation) {}
  abstract exec(): Promise<void>
}

class NodeJS implements Implementation {
  data = ''
  async load() {
    const fs = await import('node:fs/promises')
    this.data = await fs.readFile('./file.txt', 'utf-8')
  }
}

class BunJS implements Implementation {
  data = ''
  async load() {
    const bun = await import('bun')
    this.data = await bun.file('./file.txt').text()
  }
}

class Reader extends Abstraction {
  async exec() {
    await this.impl.load()
    console.log(`Data loaded: ${this.impl.data}`)
  }
}

async function main() {
  const reader = new Reader(new NodeJS())
  await reader.exec()
  const reader2 = new Reader(new BunJS())
  await reader2.exec()
}

main()
