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
  }

  removeTorch(quantity = 1) {
    this.#count -= quantity
    this.#isLit = false
    
    if (this.#count <= 0) {
      this.#count = 0
      this.#charge = 0
      
      return
    }
    
    this.#charge = 6
  }

  getValues() {
    return {
      torchCount: this.#count,
      torchCharge: this.#charge,
      isLit: this.#isLit
    }
  }
}
