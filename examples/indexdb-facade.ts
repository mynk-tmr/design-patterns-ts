class IndexDBFacade {
  constructor(
    private dbname: string,
    private store: string
  ) {}
  #getDb(): Promise<IDBDatabase> {
    return new Promise((done, err) => {
      const r = indexedDB.open(this.dbname, 1)
      r.onupgradeneeded = () => r.result.createObjectStore(this.store)
      r.onsuccess = () => done(r.result)
      r.onerror = () => err(r.error)
    })
  }
  async #getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    const db = await this.#getDb()
    return db.transaction(this.store, mode).objectStore(this.store)
  }
  async get(key: string): Promise<string> {
    const store = await this.#getStore('readonly')
    return new Promise((done, err) => {
      const r = store.get(key)
      r.onsuccess = () => done(r.result)
      r.onerror = () => err(r.error)
    })
  }
  async set(key: string, value: string): Promise<void> {
    const store = await this.#getStore('readwrite')
    const r = store.put(value, key)
    r.onerror = () => {
      throw r.error
    }
  }
}

async function main() {
  const db = new IndexDBFacade('mydb', 'mystore')
  await db.set('theme', 'green')
  const theme = await db.get('theme')
  document.body.style.backgroundColor = theme
}
main()
