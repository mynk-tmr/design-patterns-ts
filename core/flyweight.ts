/**
 * You’re creating thousands of objects which will share some state (like icons).
 */

interface SharedState {
  char: string
  size: number
  color: string
}

interface MutableState {
  x: number
  y: number
  angle: number
}

// 🎨 Flyweights : init with shared, but method get mutable
class EmojiStyle {
  constructor(private state: SharedState) {}
  render(props: MutableState) {
    const { char, size, color } = this.state
    const { x, y, angle } = props
    console.log(
      `${char} at (${x}, ${y}) with ${size}px ${color} rotated ${angle}°`
    )
  }
}

// Unique Objects injected with mutable and flyweight
class EmojiParticle {
  constructor(
    public state: MutableState,
    private style: EmojiStyle
  ) {}
  draw() {
    this.style.render(this.state)
  }
}

// 🏭 Factory to cache styles [REQUIRED]
class EmojiStyleFactory {
  private styles = new Map<string, EmojiStyle>()

  get(state: SharedState): EmojiStyle {
    const key = `${state.char}_${state.size}_${state.color}`
    if (!this.styles.has(key)) {
      this.styles.set(key, new EmojiStyle(state))
    }
    return this.styles.get(key)!
  }

  count() {
    return this.styles.size
  }
}

function main() {
  const factory = new EmojiStyleFactory()
  const particles: EmojiParticle[] = []

  const emojis = ['🌟', '🎉', '🤩', '💖']
  const colors = ['red', 'green', 'blue']
  const sizes = [16, 32]

  const getSharedState = (i: number) => ({
    char: emojis[i % emojis.length]!,
    size: sizes[i % sizes.length]!,
    color: colors[i % colors.length]!
  })

  const getMutableState = () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    angle: Math.floor(Math.random() * 360)
  })

  for (let i = 0; i < 50; i++) {
    const style = factory.get(getSharedState(i))
    const p = new EmojiParticle(getMutableState(), style)
    particles.push(p)
  }

  particles.forEach((p) => p.draw())
  console.log(`\n🧠 50 Emojis with Flyweight Styles: ${factory.count()}`)
}

main()
