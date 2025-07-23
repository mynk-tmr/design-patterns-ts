interface Clonable<T> {
  clone(): T
}

// 📁 Base Entity
abstract class Media implements Clonable<Media> {
  constructor(
    public title: string,
    public duration: number
  ) {}
  abstract clone(): Media
}

// 🎵 Concrete Prototype
class Track extends Media {
  constructor(
    title: string,
    duration: number,
    public artist: string
  ) {
    super(title, duration)
  }
  clone(): Track {
    return new Track(this.title, this.duration, this.artist)
  }
}

// 📦 Composite Prototype
class Playlist extends Media {
  constructor(
    title: string,
    private tracks: Track[] = []
  ) {
    const duration = tracks.reduce((acc, tk) => tk.duration + acc, 0)
    super(title, duration)
  }

  addTrack(track: Track): void {
    this.tracks.push(track)
    this.duration += track.duration
  }

  clone(): Playlist {
    const clonedTracks = this.tracks.map((track) => track.clone())
    return new Playlist(this.title, clonedTracks)
  }
}

class PrototypeRegistry<T extends Clonable<T>> {
  #registry = new Map<string, T>()

  register(name: string, prototype: T): void {
    this.#registry.set(name, prototype)
  }

  clone(name: string): T | undefined {
    const proto = this.#registry.get(name)
    return proto?.clone()
  }

  list(): string[] {
    return Array.from(this.#registry.keys())
  }
}

function main() {
  // 🧪 Usage Example
  const registry = new PrototypeRegistry<Media>()

  const chillTrack = new Track('Rain Sounds', 180, 'Ambient Collective')
  const upbeatTrack = new Track('Sunny Day', 240, 'Pop Inc.')

  const chillPlaylist = new Playlist('Chill Vibes')
  chillPlaylist.addTrack(chillTrack)
  chillPlaylist.addTrack(upbeatTrack)

  // 📌 Register prototypes
  registry.register('chillTrack', chillTrack)
  registry.register('chillPlaylist', chillPlaylist)

  // 🔁 Clone from registry
  const clonedTrack = registry.clone('chillTrack')
  const clonedPlaylist = registry.clone('chillPlaylist')

  console.log(clonedTrack)
  console.log(clonedPlaylist)
}
main()
