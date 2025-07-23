/* Passes requests through handlers until one handle it. You need loosely coupled processing steps */

abstract class Handler<T = any, R = void> {
  next: Handler | undefined
  setNext(h: Handler): void {
    this.next = h
  }
  handle(request: T): void {
    if (this.canHandle(request)) this.handleRequest(request)
    else this.next?.handle(request)
  }
  abstract canHandle(request: T): boolean
  abstract handleRequest(request: T): R
}

class ConcreteHandler1 extends Handler<number> {
  canHandle(request: number): boolean {
    return request > 1
  }
  handleRequest(request: number): void {
    console.log(`ConcreteHandler1 handles ${request}`)
  }
}

class ConcreteHandler2 extends Handler<number> {
  canHandle(request: number): boolean {
    return request < -1
  }
  handleRequest(request: number): void {
    console.log(`ConcreteHandler2 handles ${request}`)
  }
}

function main() {
  const handler1 = new ConcreteHandler1()
  const handler2 = new ConcreteHandler2()
  handler1.setNext(handler2)
  handler1.handle(5) // Output: ConcreteHandler1 handles 5
  handler1.handle(-2) // Output: ConcreteHandler2 handles -2
  handler1.handle(0) // nothing
}

main()
