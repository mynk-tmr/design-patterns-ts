/**
 * Creates a shared global resource that is created lazily / from cache / async way
 */
export class Singleton {
  value: string = ''
  static #instance: Singleton
  private constructor() {}
  static get instance(): Singleton {
    Singleton.#instance ??= new Singleton()
    return Singleton.#instance
  }
}

function main() {
  const singleton1 = Singleton.instance
  const singleton2 = Singleton.instance
  console.log(singleton1 === singleton2) // ✅ true
  singleton1.value = 'Hello, world!'
  console.log(singleton2.value) // ✅ Hello, world!
}

main()
