/**
 * Convert incompatible interface into compatible with a wrapper.
 * Decouple from 3rd party libs
 */

// Adaptee: Legacy API
class Legacy {
  send(body: string) {
    return `${body}`
  }
}

//Target -> the API that client wants
interface Target {
  request(body: object): object
}

class LegacyAdapter implements Target {
  constructor(private adaptee: Legacy) {}
  request(body: object): object {
    let res = this.adaptee.send(JSON.stringify(body))
    return JSON.parse(res)
  }
}

class ClientCode {
  postData(tgt: Target) {
    const obj = tgt.request({ age: '24' })
    console.table(obj)
  }
}

function main() {
  const client = new ClientCode()
  client.postData(new LegacyAdapter(new Legacy()))
  client.postData({ request: (b) => ({ ...b, newapi: 'true' }) })
}
main()
