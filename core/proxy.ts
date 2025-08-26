/**
 * Proxy Pattern
 *
 * Controls access to another object. No extra behaviour is added to the object
 */

interface DocumentService {
  fetch(userId: string): string
}

class Real implements DocumentService {
  fetch(userId: string): string {
    return `✅ Real::fetch ${userId}`
  }
}

class RealProxy implements DocumentService {
  constructor(
    private real: Real,
    private users: string[]
  ) {}
  fetch(userId: string): string {
    if (this.users.includes(userId) === false)
      return `🚫 Not Allowed for ${userId}`
    return this.real.fetch(userId)
  }
}

//usage
function main() {
  const users = ['user1', 'user2']
  const real = new Real()
  const proxy = new RealProxy(real, users)
  console.log(proxy.fetch('user1'))
  console.log(proxy.fetch('user2'))
  console.log(proxy.fetch('user3'))
}

main()
