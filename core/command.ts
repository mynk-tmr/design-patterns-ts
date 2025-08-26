/**
 * Command Pattern
 *
 * To convert any operation into an object, so you can undo, redo, defer, store, etc it
 *
 * Command Objects D.I. {reciever, parameters}
 *
 */

interface Command {
  undo(): void
  redo(): void
}

//Reciever of Command
class TextEditor {
  private text: string = ''
  insert(str: string): void {
    this.text += str
  }
  delete(length: number) {
    this.text = this.text.slice(0, -length)
  }
  getText(): string {
    return this.text
  }
}

// Concrete Command
class InsertCommand implements Command {
  constructor(
    private editor: TextEditor,
    private str: string
  ) {
    this.editor.insert(this.str)
  }
  undo(): void {
    this.editor.delete(this.str.length)
  }
  redo(): void {
    this.editor.insert(this.str)
  }
}

// History Tracker
class CommandManager {
  private history: Command[] = []
  private curr = -1
  commit(command: Command) {
    this.history[++this.curr] = command
    this.history.splice(this.curr + 1)
  }
  undo(): void {
    const cmd = this.history[this.curr]
    if (cmd) {
      cmd.undo()
      this.curr--
    }
  }
  redo(): void {
    const cmd = this.history[this.curr + 1]
    if (cmd) {
      cmd.redo()
      this.curr++
    }
  }
}

//driver code
function client() {
  const editor = new TextEditor()
  const manager = new CommandManager()
  do {
    const choice = prompt('Insert[1] Undo[2] Redo[3] Exit[4] ->') || '1'
    switch (choice) {
      case '1':
        const str = prompt('Enter text to insert') || ''
        const command = new InsertCommand(editor, str)
        manager.commit(command)
        break
      case '2':
        manager.undo()
        break
      case '3':
        manager.redo()
        break
      case '4':
        return
    }
    console.log(editor.getText())
    // oxlint-disable-next-line no-constant-condition
  } while (true)
}

client()
