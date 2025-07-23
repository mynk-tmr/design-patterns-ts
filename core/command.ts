/**
 * To convert any operation into an object. The operation’s parameters become fields.
 * The conversion lets you defer execution, queue it, store history, RPC it, etc.
 * Command objects should be injected with Reciever and params
 */
interface Command {
  execute(): void
  undo(): void
  redo(): void
}

// 🎯 Receiver
class TextEditor {
  #content = ''
  insert(text: string) {
    this.#content += text
  }
  delete(length: number) {
    this.#content = this.#content.slice(0, -length)
  }
  getContent() {
    return this.#content
  }
}

// 📦 Concrete Commands
class InsertCommand implements Command {
  constructor(
    private editor: TextEditor,
    private text: string
  ) {}
  execute() {
    this.editor.insert(this.text)
  }
  undo() {
    this.editor.delete(this.text.length)
  }
  redo() {
    this.execute()
  }
}

// 📚 History Tracker
class CommandManager implements Pick<Command, 'undo' | 'redo'> {
  private history: Command[] = []
  private head = -1
  execute(command: Command) {
    command.execute()
    this.head++
    this.history[this.head] = command
    this.history = this.history.slice(0, this.head + 1)
  }
  undo(): void {
    const command = this.history.at(this.head)
    if (command) {
      command.undo()
      this.head--
    }
  }
  redo(): void {
    const command = this.history.at(this.head + 1)
    if (command) {
      command.redo()
      this.head++
    }
  }
}

function main() {
  const editor = new TextEditor()
  const manager = new CommandManager()

  manager.execute(new InsertCommand(editor, 'Hello'))
  manager.execute(new InsertCommand(editor, ' Mayank!'))

  console.log(editor.getContent()) // "Hello, Mayank!"

  manager.undo()
  manager.execute(new InsertCommand(editor, ' Wukong!'))
  console.log(editor.getContent()) // "Hello, Wukong!"
  manager.undo()
  console.log(editor.getContent()) // "Hello"
  manager.redo()
  console.log(editor.getContent()) // "Hello, Wukong!"
}
main()
