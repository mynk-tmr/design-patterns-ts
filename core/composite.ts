/**
 * Composite Pattern
 *
 * Allows individual objects and group of objects to be treated uniformly via same interface
 *
 * Makes recursive traversals easy
 */

interface Item {
  get_cost(): number
}

interface Composite extends Item {
  add_child(item: Item): void
  remove_child(item: Item): void
}

class Leaf implements Item {
  constructor(private cost: number) {}
  get_cost(): number {
    return this.cost
  }
}

class Container implements Composite {
  private children: Set<Item> = new Set()
  add_child(item: Item): void {
    this.children.add(item)
  }
  remove_child(item: Item): void {
    if (this.children.delete(item) === false) throw new Error(`Item not found`)
  }
  get_cost(): number {
    return this.children
      .values()
      .reduce((acc, item) => acc + item.get_cost(), 0)
  }
}

//driver code
function print(str: string, item: Item) {
  console.log(str, item.get_cost())
}

function main() {
  const c1 = new Container()
  const c2 = new Container()
  const l1 = new Leaf(10)
  c1.add_child(l1)
  c1.add_child(new Leaf(20))

  c2.add_child(c1)
  c2.add_child(new Leaf(30))

  print('C1 cost ::', c1)
  print('C2 cost ::', c2)

  c1.remove_child(l1)
  print('\nAfter removing l1 ::', l1)
  print('C1 cost ::', c1)
  print('C2 cost ::', c2)
}

main()
