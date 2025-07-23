/**
 * Clones existing objects without using constructors. Use when
 * - copy object with current state;
 * - object creation needs costly API calls
 *
 * Prototype Registry provides an easy way to access frequently-used prototypes.
 * It stores a set of pre-built objects that are ready to be copied.
 */
interface Clonable<T> {
  clone(): T
  deepclone?(): T
}

class Bytes implements Clonable<Bytes> {
  constructor(private value: number) {}
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
  deepclone(): Media {
    const newBytes = this.bytes.map((byte) => byte.clone())
    return new Media(this.title, newBytes)
  }
}

function main() {
  const media = new Media('Sample Media', [new Bytes(1024), new Bytes(2048)])
  const clonedMedia = media.clone()
  const deepClonedMedia = media.deepclone()
  console.log(media === clonedMedia) // false
  console.log(media.bytes === clonedMedia.bytes) // true
  console.log(media.bytes === deepClonedMedia.bytes) // false
}

main()
