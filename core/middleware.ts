/**
 * Middleware Pattern
 *
 * Passes requests through handlers until one of them handles it
 *
 * Use to get loosely coupled processing steps
 */

abstract class Handler<Res = any> {
  protected abstract canHandle(request: Res): boolean
  protected abstract process(request: Res): void
  protected next: Handler | null = null
  setNext<T extends Handler>(handler: T): T {
    this.next = handler
    return handler
  }
  handle(request: Res): void {
    if (this.canHandle(request)) this.process(request)
    else this.next?.handle(request)
  }
}

class EvenHandler extends Handler<number> {
  canHandle(request: number): boolean {
    return request % 2 === 0
  }
  process(request: number): void {
    console.log(`EvenHandler:: ${request}`)
  }
}

class NegHandler extends Handler<number> {
  canHandle(request: number): boolean {
    return request < 0
  }
  process(request: number): void {
    console.log(`NegHandler:: ${request}`)
  }
}

class StringHandler extends Handler<string> {
  canHandle(request: string): boolean {
    return typeof request === 'string'
  }
  process(request: string): void {
    console.log(`StringHandler:: ${request}`)
  }
}

// client
function client(handler: Handler) {
  handler.handle(-2)
  handler.handle(3)
  handler.handle(-3)
  handler.handle('hello')
}

function main() {
  const even = new EvenHandler()
  const neg = new NegHandler()
  const string = new StringHandler()
  even.setNext(neg).setNext(string)
  client(even)
}

main()
