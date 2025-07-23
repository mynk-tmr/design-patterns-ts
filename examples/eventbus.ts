// EventBus: lightweight pub/sub broker

type EventDataMap = {
  'user:login': { username: string }
  'user:logout': { username: string; timestamp: Date }
  'user:register': { username: string; email: string }
}
type EventTypes = keyof EventDataMap
type EventCallback<T extends EventTypes> = (data: EventDataMap[T]) => void

class EventBus {
  private events: Map<EventTypes, Set<EventCallback<any>>> = new Map()

  subscribe<T extends EventTypes>(event: T, callback: EventCallback<T>) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)?.add(callback)
    return () => this.unsubscribe(event, callback)
  }

  unsubscribe<T extends EventTypes>(event: T, callback: EventCallback<T>) {
    this.events.get(event)?.delete(callback)
  }

  publish<T extends EventTypes>(event: T, data: EventDataMap[T]) {
    this.events.get(event)?.forEach((callback) => callback(data))
  }
}

function main() {
  const bus = new EventBus()

  const unsubscribeLogin = bus.subscribe('user:login', (data) => {
    console.log(`User logged in: ${data.username}`)
  })
  const _unsubscribeLogout = bus.subscribe('user:logout', (data) => {
    console.log(`User logged out: ${data.username} at ${data.timestamp}`)
  })

  bus.publish('user:login', { username: 'john_doe' })
  console.log('Waiting for user logout...')
  setTimeout(() => {
    bus.publish('user:logout', { username: 'john_doe', timestamp: new Date() })
  }, 3000)

  unsubscribeLogin()

  bus.publish('user:login', { username: 'jane_doe' }) // No output, as the callback is unsubscribed
}

main()
