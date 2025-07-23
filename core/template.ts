/**
 * Template Method defines the skeleton of an algorithm up front while allowing steps to be customized by subclasses.
 */

abstract class Template {
  template() {
    this.step1()
    this.step2()
    this.step3()
  }
  protected step1() {
    console.log('Initialising ....')
  }
  abstract step2(): void
  abstract step3(): void
}

class FetchRender extends Template {
  step2() {
    console.log('Fetching data ....')
  }
  step3() {
    console.log('Rendering data ....')
  }
}

function main() {
  const fetchRender = new FetchRender()
  fetchRender.template()
}
main()
