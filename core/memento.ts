/**
 * Memento Pattern
 *
 * To capture and restore an object's state without revealing its implementation
 *
 * Needs 3 things :
 * - Originator - the object whose state is to be captured
 * - Memento - immutable snapshot of Originator's state
 * - Caretaker - keeps track of Mementos
 */

interface IMemento<T> {
  readonly state: T
}

interface Originator<T> {
  snap(): IMemento<T>
  goback(memo: IMemento<T>): void
}

class Caretaker<T> {
  protected memos = new Map<number, IMemento<T>>()
  constructor(private ob: Originator<T>) {}
  backup() {
    this.memos.set(Date.now(), this.ob.snap())
  }
  restore(date: string | number) {
    const memo = this.memos.get(Number(date))
    if (memo) this.ob.goback(memo)
    else console.log('❌ Memento not found')
  }
  list() {
    console.table(Object.fromEntries(this.memos))
  }
}

class Text implements Originator<string> {
  private state = ''
  snap(): IMemento<string> {
    return { state: this.state }
  }
  goback(memo: IMemento<string>) {
    this.change(memo.state)
  }
  change(text: string) {
    this.state = text
    console.log('\n\x1b[34m ✍️ Text :: %s\x1b[0m', this.state)
  }
}

//driver

function main() {
  const text = new Text()
  const caretaker = new Caretaker(text)
  let ch = true
  while (ch) {
    text.change(prompt('\nEnter text :: ') || '')
    caretaker.backup()
    caretaker.list()
    const dxi = (prompt('\nRestore [key or n]?') || 'n').toLowerCase()
    if (dxi !== 'n') caretaker.restore(dxi)
    ch = confirm('\nContinue?')
  }
}

main()
