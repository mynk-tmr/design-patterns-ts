/**
 * PubSub Pattern
 *
 * Lets you subscribe to events in one object and react to them in other objects
 *
 * Different from Mediator Pattern, where logic is centralized in one object
 */

interface Subscriber {
  update<T extends keyof EventMap>(event: T, data: EventMap[T]): void
}

type EventMap = { order: string; changePhone: string }

interface Publisher {
  subscribe(event: keyof EventMap, subscriber: Subscriber): void
  unsubscribe(event: keyof EventMap, subscriber: Subscriber): boolean
  notify: Subscriber['update']
}

class Email implements Subscriber {
  constructor(public email: string) {}
  update<T extends keyof EventMap>(event: T, data: EventMap[T]): void {
    console.log(`Sent email to ${this.email} / ${event} / ${data}`)
  }
}

class SMS implements Subscriber {
  constructor(public phone: string) {}
  update<T extends keyof EventMap>(event: T, data: EventMap[T]): void {
    console.log(`Sent SMS to ${this.phone} / ${event} / ${data}`)
  }
}

class Turso implements Publisher {
  private subs = new Map<keyof EventMap, Set<Subscriber>>()
  subscribe(event: keyof EventMap, subscriber: Subscriber): void {
    if (!this.subs.has(event)) this.subs.set(event, new Set())
    this.subs.get(event)?.add(subscriber)
  }
  unsubscribe(event: keyof EventMap, subscriber: Subscriber): boolean {
    return this.subs.get(event)?.delete(subscriber) || false
  }
  notify<T extends keyof EventMap>(event: T, data: EventMap[T]): void {
    this.subs.get(event)?.forEach((sub) => sub.update(event, data))
  }
}

function main() {
  const turso = new Turso()
  const email = new Email('zyq0y@example.com')
  const sms = new SMS('9876543210')
  turso.subscribe('order', email)
  turso.subscribe('order', sms)
  turso.subscribe('changePhone', email)
  turso.notify('order', 'Hello')
  turso.notify('changePhone', '234567890')
  turso.unsubscribe('order', email)
  turso.notify('order', 'Done')
}

main()
