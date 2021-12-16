export interface TorchData {
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export class Torch {
  #torchCount: number
  #torchCharge: number
  #isLit: boolean

  constructor(data: TorchData) {
    this.#torchCount = data.torchCount
    this.#torchCharge = data.torchCharge
    this.#isLit = data.isLit
  }

  lit() {
    this.#isLit = true
  }

  consumeCharge() {
    if (!this.#isLit) return

    this.#torchCharge--

    if (this.#torchCharge === 0) {
      this.removeTorch()
    }
  }

  removeTorch(quantity = 1) {
    if (this.#torchCount === 0) return
    this.#torchCount -= quantity
  }
}
