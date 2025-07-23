/**
 * Allows individual objects and groups of objects to be treated uniformly via same interface.
 * Makes recursive traversals of complex object structures easy.
 */
interface Item {
  //uniform interface
  getValue(): number
}

interface Composite extends Item {
  addChild(child: Item): void
  removeChild(child: Item): void
}

class Leaf implements Item {
  constructor(private value: number) {}
  getValue(): number {
    return this.value
  }
}

class Container implements Composite {
  protected children: Set<Item> //always has children
  constructor(items: Item[] = []) {
    this.children = new Set(items)
  }
  getValue(): number {
    let total = 0
    for (const ch of this.children) total += ch.getValue()
    return total
  }
  addChild(child: Item): void {
    this.children.add(child)
  }
  removeChild(child: Item): void {
    this.children.delete(child)
  }
}

function main() {
  const cont1 = new Container([new Leaf(10), new Leaf(20)])
  const cont2 = new Container([cont1, new Leaf(30)])
  console.log(cont2.getValue()) // 60
  cont2.removeChild(cont1)
  console.log(cont2.getValue()) // 30
  cont2.addChild(new Leaf(15))
  console.log(cont2.getValue()) // 45
}

main()
