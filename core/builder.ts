/**
 * Builder pattern lets you construct complex objects step-by-step.
 * Good for creating objects with many optional parameters.
 */
interface Builder {
  reset(): void
  finish(): Product
}

interface Product {
  name: string
  price?: number
  description?: string
}

interface Director {
  setBuilder(builder: Builder): this
}

class ConcreteBuilder implements Builder {
  private product: Product = { name: '' }
  reset(): void {
    this.product = { name: '' }
  }
  setName(name: string): this {
    this.product.name = name
    return this
  }
  setPrice(price: number): this {
    this.product.price = price
    return this
  }
  setDescription(description: string): this {
    this.product.description = description
    return this
  }
  finish(): Product {
    const finishedProduct = { ...this.product }
    this.reset() // Reset for next use
    return finishedProduct
  }
}

class ConcreteDirector implements Director {
  private builder!: ConcreteBuilder
  setBuilder(builder: ConcreteBuilder): this {
    this.builder = builder
    return this
  }
  constructProduct(type: 'biscuit' | 'cat'): Product {
    this.builder.reset()
    if (type === 'biscuit') {
      return this.builder
        .setName('Biscuit')
        .setPrice(1.5)
        .setDescription('Delicious chocolate biscuit')
        .finish()
    } else {
      return this.builder
        .setName('Cat')
        .setDescription('Fun and educational toy')
        .finish()
    }
  }
}

function main() {
  const builder = new ConcreteBuilder()
  const director = new ConcreteDirector().setBuilder(builder)

  const biscuit = director.constructProduct('biscuit')
  console.log('Biscuit Product:', biscuit)

  const cat = director.constructProduct('cat')
  console.log('Cat Product:', cat)
}

main()
