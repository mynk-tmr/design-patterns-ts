/**
 * Flyweight Pattern
 *
 * To create thousands of objects which will share some state
 */

interface SharedState {
  color: string
  emoji: string
}

interface MutableState {
  text: string
}

class Flyweight {
  constructor(private state: SharedState) {}
  render(props: MutableState) {
    const color = Bun.color(this.state.color, 'ansi')
    console.log(`${color} ${this.state.emoji} ${props.text} \x1b[0m`)
  }
}

class Unique {
  constructor(
    private fly: Flyweight,
    private mut: MutableState
  ) {}
  draw() {
    this.fly.render(this.mut)
  }
}

//Required factory to cache flyweights
class FlyweightFactory {
  private pool = new Map<string, Flyweight>()

  get(state: SharedState): Flyweight {
    const key = JSON.stringify(state)
    const fly = this.pool.get(key)
    if (!fly) this.pool.set(key, new Flyweight(state))
    else console.log('✅ Flyweight::REUSED\x1b[0m')
    return this.pool.get(key)!
  }

  count() {
    return this.pool.size
  }
}

//driver code

function main() {
  const factory = new FlyweightFactory()
  const emojis = ['🌟', '🎉', '🤩', '💖']
  const colors = ['red', 'green', 'blue']

  const get_shared = () => ({
    color: colors[Math.floor(Math.random() * colors.length)]!,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]!
  })

  const get_mut = () => ({ text: prompt('Enter text :: ') || 'Guest' })

  while (true) {
    const state = get_shared()
    const mut = get_mut()
    const fly = factory.get(state)
    const item = new Unique(fly, mut)
    item.draw()
    console.log(`Flyweight count :: ${factory.count()}`)

    const ch = confirm('\nAnother?')
    if (!ch) break
  }
}

main()
