/**  To capture and restore an object’s internal state without exposing its implementation
- Originator: The object whose state needs saving/restoring.
- Memento: Immutable snapshot of the originator’s state.
- Caretaker: Maintains memento history
*/

interface IMemento<T> {
  readonly state: T //getter
}

interface Originator<T> {
  snap(): IMemento<T>
  goback(memo: IMemento<T>): void
}

class Caretaker<T> {
  protected snaps = [] as IMemento<T>[]
  constructor(protected org: Originator<T>) {}
  backup() {
    this.snaps.push(this.org.snap())
  }
  undo() {
    const memo = this.snaps.pop()
    if (memo) this.org.goback(memo)
  }
}

// Concrete examples
class Snapshot implements IMemento<string> {
  constructor(public readonly state: string) {}
}

class Text implements Originator<string> {
  constructor(public value: string) {}
  snap(): IMemento<string> {
    return new Snapshot(this.value)
  }
  goback(memo: IMemento<string>): void {
    this.value = memo.state
  }
  change() {
    this.value = crypto.randomUUID().slice(0, 8)
  }
}

// Usage
function main() {
  const text = new Text('Initial')
  const caretaker = new Caretaker(text)

  console.log('Current Text:', text.value)
  caretaker.backup()

  text.change()
  console.log('Changed Text:', text.value)
  caretaker.backup()

  text.change()
  console.log('Changed Text Again:', text.value)

  caretaker.undo()
  console.log('After Undo:', text.value)

  caretaker.undo()
  console.log('After Second Undo:', text.value)
}
main()
