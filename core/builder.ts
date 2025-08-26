/**
 * Builder Pattern
 *
 * Lets you construct complex objects step-by-step.
 * Good for creating objects with many optional parameters.
 */

interface Product {
  name: string
  price?: number
  description?: string
}

class Builder {
  private product: Product = { name: '' }
  reset(): void {
    this.product = { name: '' }
  }
  finish(): Product {
    return this.product
  }
  setName(name: string): this {
    this.product.name = name.toUpperCase()
    return this
  }
  setPrice(price: number): this {
    this.product.price = Math.max(price, 1)
    return this
  }
  setDescription(description: string): this {
    this.product.description = description
    return this
  }
}

class Director {
  private builder!: Builder
  setBuilder(builder: Builder): this {
    this.builder = builder
    return this
  }
  construct(product: 'cookie' | 'cat'): Product {
    this.builder.reset()
    if (product === 'cookie') {
      this.builder
        .setName('Cookie')
        .setPrice(1000)
        .setDescription('🍪 A cookie')
    }
    if (product === 'cat') {
      this.builder.setName('Cat').setDescription('😺 A cat')
    }
    return this.builder.finish()
  }
}

//driver code

function main() {
  const director = new Director()
  director.setBuilder(new Builder())
  const cookie = director.construct('cookie')
  const cat = director.construct('cat')
  console.log(cookie)
  console.log(cat)
}

main()
