interface Item {
  value: number
  left?: Item
  right?: Item
}

class Tree {
  root: Item | undefined
  insert(value: number): Tree {
    const node: Item = { value }
    if (!this.root) this.root = node
    else Tree.insertItem(this.root, node)
    return this
  }
  private static insertItem(root: Item, node: Item) {
    const side = root.value > node.value ? 'left' : 'right'
    if (!root[side]) root[side] = node
    else Tree.insertItem(root[side], node)
  }
}

class DFSIterator {
  private stack: Item[] = []
  constructor(tree: Tree) {
    if (tree.root) this.stack.push(tree.root)
  }
  *[Symbol.iterator]() {
    let node: Item | undefined
    while ((node = this.stack.pop())) {
      yield node

      // Push right before left so left is processed first
      if (node.right) this.stack.push(node.right)
      if (node.left) this.stack.push(node.left)
    }
  }
}

function main() {
  const tree = new Tree()
  tree.insert(5).insert(3).insert(7).insert(2).insert(4)
  for (const node of new DFSIterator(tree)) {
    console.log(node.value)
  }
}

main()
