/* Lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.). */

interface Iterator<T> {
  next(): T | undefined
  done(): boolean // while(!it.done()) { ... }
  reset(): void
  current(): T | undefined
  key(): string | number | undefined
}

// oxlint-disable-next-line no-unused-vars
interface Aggregator<T> {
  getIter(): Iterator<T>
  getReverseIter(): Iterator<T>
}
