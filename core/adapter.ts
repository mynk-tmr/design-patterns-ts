/**
 * Adapter Pattern
 *
 * Converts incompatible interfaces into compatible using a wrapper.
 *
 * Decouple from 3rd party APIs
 */

class Legacy {
  //adaptee
  request(url: string): string {
    console.log(`Legacy::request ${url}`)
    const data = url.slice(0, 3).repeat(2)
    return `Legacy::data ${data}`
  }
}

// API that client expects
interface Target {
  bring(url: string): Promise<{ data: string }>
}

class LegacyAdapter implements Target {
  constructor(private legacy: Legacy) {}
  async bring(url: string): Promise<{ data: string }> {
    const data = this.legacy.request(url)
    return { data }
  }
}

//driver code
function client(target: Target) {
  target.bring('http://url').then(({ data }) => console.log(data))
}

function main() {
  const wrap = new LegacyAdapter(new Legacy())
  client(wrap)
  client({
    bring: async (url: string) => {
      console.log(`Neo::request ${url}`)
      const str = url.toUpperCase()
      return { data: `Neo::data ${str}` }
    }
  })
}

main()
