class Notification {
  constructor(
    public message: string,
    protected timeout = 2000
  ) {}
  display() {
    console.log(this.message)
    return new Promise((r) => setTimeout(r, this.timeout))
  }
}

class NotificationQueue {
  #notifications: Notification[] = []
  #isShowing = false

  //singleton code
  static #instance: NotificationQueue
  private constructor() {}
  static getInstance(): NotificationQueue {
    NotificationQueue.#instance ??= new NotificationQueue()
    return NotificationQueue.#instance
  }

  //methods
  push(item: Notification) {
    this.#notifications.push(item)
    this.#showNext()
  }
  async #showNext() {
    if (this.#isShowing || this.#notifications.length < 1) return
    this.#isShowing = true
    await this.#notifications.shift()!.display()
    this.#isShowing = false
    this.#showNext()
  }
}

function main() {
  const queue = NotificationQueue.getInstance()
  queue.push(new Notification('🔔 Welcome to the dashboard!'))
  queue.push(new Notification('✅ Changes saved successfully.'))
  queue.push(new Notification('⚠️ Session expiring soon.', 4000))

  // Optional: push from another “module” or file
  const anotherQueueReference = NotificationQueue.getInstance()
  anotherQueueReference.push(new Notification('📬 New message received!', 1600))
}

main()
