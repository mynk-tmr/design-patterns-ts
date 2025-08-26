/**
 * Template Pattern
 *
 * Defines algorithm skeleton up front, but allows steps to be customized by subclasses.
 */

abstract class Template {
  public template() {
    this.step1()
    this.step2()
    this.step3()
  }
  protected step1() {
    console.log('Starting ....')
  }
  protected abstract step2(): void
  protected abstract step3(): void
}

class FetchRender extends Template {
  protected step2() {
    console.log('Fetching data ...')
  }
  protected step3() {
    console.log('Rendering data ...')
  }
}

function main() {
  const xs = new FetchRender()
  xs.template()
}

main()
