/**
 * Iterator Pattern
 *
 * Lets you traverse elements of a collection without exposing its underlying representation
 */

interface CustomIterator<T> {
  next(): T
  done(): boolean
  reset(): void
  current(): T | undefined
}

interface Aggregate<T> {
  getIter(): CustomIterator<T>
  getReverseIter?(): CustomIterator<T>
}

interface Dot {
  value: number
  left?: Dot
  right?: Dot
}

class Tree {
  public root = null as null | Dot
  insert(value: number) {
    if (this.root === null) this.root = { value }
    else Tree.insertNode(this.root, value)
  }
  private static insertNode(root: Dot, value: number) {
    const side = value > root.value ? 'right' : 'left'
    if (root[side] === undefined) root[side] = { value }
    else Tree.insertNode(root[side], value)
  }
}

class DFSIterator implements CustomIterator<Dot> {
  private stack: Dot[] = []
  constructor(private tree: Tree) {
    this.reset()
  }
  next(): Dot {
    const dot = this.stack.pop()
    if (dot === undefined) throw new Error('dfs::no more items')
    if (dot.right) this.stack.push(dot.right)
    if (dot.left) this.stack.push(dot.left)
    return dot
  }
  done(): boolean {
    return this.stack.length === 0
  }
  reset(): void {
    this.stack = []
    if (this.tree.root) this.stack.push(this.tree.root)
  }
  current(): Dot | undefined {
    return this.stack.at(-1)
  }
}

class TreeAggregate implements Aggregate<Dot> {
  constructor(private tree: Tree) {}
  getIter(): CustomIterator<Dot> {
    return new DFSIterator(this.tree)
  }
}

//driver code
function format(dot: Dot) {
  console.log(
    `${dot.value}${dot.left ? `\tlf : ${dot.left.value}` : ''}${
      dot.right ? `\trt : ${dot.right.value}` : ''
    }`
  )
}

function main() {
  const tree = new Tree()
  ;(prompt('Enter values :: ') || '0')
    .split(/\s+/)
    .map((v) => tree.insert(parseInt(v)))

  const iter = new TreeAggregate(tree).getIter()
  while (!iter.done()) {
    const ch = prompt('Next[1] Reset[2] Current[3] Exit[4] ->') || '1'
    switch (ch) {
      case '1':
        format(iter.next())
        break
      case '2':
        iter.reset()
        break
      case '3':
        format(iter.current()!)
        break
      case '4':
        return
    }
  }
}
main()
