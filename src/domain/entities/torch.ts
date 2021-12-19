export interface TorchData {
  count: number
  charge: number
  isLit: boolean
}

export class Torch {
  #count: number
  #charge: number
  #isLit: boolean

  constructor(data: TorchData) {
    this.#count = data.count
    this.#charge = data.charge
    this.#isLit = data.isLit
  }

  consumeCharge() {
    if (!this.#isLit) return

    this.#charge--

    if (this.#charge !== 0) return
    
    this.removeTorch()
    
    if (this.#count === 0) {
      return void (this.#isLit = false)
    }
    
    this.#charge = 6
  }

  removeTorch(quantity = 1) {
    if (this.#count === 0) return
    this.#count -= quantity
  }

  getValues() {
    return {
      torchCount: this.#count,
      torchCharge: this.#charge,
      isLit: this.#isLit
    }
  }
}
