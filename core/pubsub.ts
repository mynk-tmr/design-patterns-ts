/**
 * PubSub pattern lets you subscribe to events in one object and react in real time.
 * It's not same as Mediator pattern, where logic is centralized in one object.
 * Here, each subscriber can react independently to events.
 */
export interface Subscriber {
  update(event: string, data: any): void
}

export class Publisher {
  #listeners = new Map<string, Set<Subscriber>>()

  subscribe(event: string, listener: Subscriber) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set())
    }
    this.#listeners.get(event)?.add(listener)
  }

  unsubscribe(event: string, listener: Subscriber) {
    this.#listeners.get(event)?.delete(listener)
  }

  publish(event: string, data: any) {
    this.#listeners
      .get(event)
      ?.forEach((listener) => listener.update(event, data))
  }
}

class Email implements Subscriber {
  constructor(private email: string) {}
  update<T>(event: string, data: T) {
    console.log(
      `Email sent to ${this.email} for event: ${event} with data:`,
      data
    )
  }
}

class SMS implements Subscriber {
  constructor(private phoneNumber: string) {}
  update<T>(event: string, data: T) {
    console.log(
      `SMS sent to ${this.phoneNumber} for event: ${event} with data:`,
      data
    )
  }
}

function main() {
  const publisher = new Publisher()
  const emailSubscriber = new Email('example@example.com')
  const smsSubscriber = new SMS('123-456-7890')

  publisher.subscribe('user:created', emailSubscriber)
  publisher.subscribe('user:created', smsSubscriber)
  publisher.subscribe('user:phonechanged', emailSubscriber)

  publisher.publish('user:created', { id: 1, name: 'John Doe' })
  publisher.publish('user:phonechanged', { id: 1, newPhone: '987-654-3210' })
}

main()
