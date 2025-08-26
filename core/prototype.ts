/**
 * Prototype Pattern
 *
 * Clones existing objects without using constructors. Uses
 *  - copy object with current state;
 *  - object creation needs costly API calls
 *
 * Prototype Registry provides an easy way to access frequently-used prototypes.
 */
interface Clonable<T> {
  clone(): T
  deepClone?(): T
}

class Bytes implements Clonable<Bytes> {
  constructor(public readonly value: number) {}
  clone(): Bytes {
    return new Bytes(this.value)
  }
}

class Media implements Clonable<Media> {
  constructor(
    public title: string,
    public bytes: Bytes[]
  ) {}
  clone(): Media {
    return new Media(this.title, this.bytes)
  }
  deepClone(): Media {
    const nbytes = this.bytes.map((b) => b.clone())
    return new Media(this.title, nbytes)
  }
  show() {
    const msg = `${this.title} has ${this.bytes
      .map((b) => b.value)
      .join(', ')} bytes`
    console.log('🎵', msg)
  }
}

class Registry<T extends Clonable<T>> {
  private registry: Map<string, T> = new Map()

  register(key: string, prototype: T): void {
    this.registry.set(key, prototype)
    console.log(`✅ ${key} registered`)
  }

  clone(key: string): T {
    const proto = this.registry.get(key)
    if (proto) return proto.clone()
    throw `Prototype::NOT_FOUND KEY=${key}`
  }

  list() {
    return Array.from(this.registry.keys())
  }
}

// driver code

function getPrompts(): [string, Bytes[]] {
  const gname = prompt('Enter title :: ') || 'Guest'
  const gbits = (prompt('Enter bytes :: ') || '0 0')
    .split(/\s+/)
    .map((v) => new Bytes(parseInt(v)))
  return [gname, gbits]
}

function gcc() {
  const registry = new Registry<Media>()
  let loop = true
  while (loop) {
    const [gname, gbits] = getPrompts()
    registry.register(gname, new Media(gname, gbits))
    loop = confirm('\nAdd more?')
  }

  console.log('\nRegistry ::', registry.list())
  loop = true
  while (loop) {
    const key = prompt('Enter key :: ') || 'Guest'
    const m = registry.clone(key)
    m.show()
    loop = confirm('\nAnother?')
  }
}

gcc()
