/**
 * Controls access to another object. No extra behaviour added to the original object.
 * Proxies are not controlled by client code. Decorators are.
 * Both proxy and decorator implement the same interface as the original object.
 */

//interface to duplicate
interface DocumentService {
  fetch(userId: string): string
}

class RealDocumentService implements DocumentService {
  fetch(userId: string): string {
    return `Secret document for ${userId}`
  }
}

// Proxy with access control
class AuthProxy implements DocumentService {
  constructor(
    private realService: DocumentService,
    private authenticatedUsers: Set<string>
  ) {}

  fetch(userId: string): string {
    if (!this.authenticatedUsers.has(userId)) {
      return 'Access denied.'
    }
    return this.realService.fetch(userId)
  }
}

function main() {
  const authUsers = new Set(['mayank123'])
  const proxy = new AuthProxy(new RealDocumentService(), authUsers)
  console.log(proxy.fetch('mayank123')) // ✅ Secret document
  console.log(proxy.fetch('intruder')) // 🚫 Access denied
}
main()
