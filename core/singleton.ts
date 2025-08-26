/**
 * Singleton
 * Creates a shared global resource that is created lazily / from cache / async way
 */

class Singleton {
  data: any = null
  static #instance: Singleton
  private constructor() {
    console.log('✅ Singleton created')
  }
  static get instance() {
    Singleton.#instance ??= new Singleton()
    return Singleton.#instance
  }
}

function main() {
  const s1 = Singleton.instance
  const s2 = Singleton.instance
  console.log(s1 === s2)
  s1.data = 'Hello'
  console.log('s2.data -', s2.data)
}

main()
