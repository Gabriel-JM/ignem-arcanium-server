export interface TorchData {
  count: number
  charge: number
  isLit: boolean
}

export class Torch {
  #count: number
  #charge: number
  #isLit: boolean
  #chargeLimit = 6

  constructor(data: TorchData) {
    this.#count = data.count
    this.#charge = data.charge
    this.#isLit = data.isLit
  }

  increaseCharge(quantity: number) {
    this.#charge = this.#charge + quantity > this.#chargeLimit
      ? this.#chargeLimit
      : this.#charge + quantity
  }

  consumeCharge() {
    if (!this.#isLit) return

    this.#charge--

    if (this.#charge !== 0) return

    this.removeTorch()
  }

  addTorch(quantity: number) {
    this.#count += quantity
  }

  removeTorch(quantity = 1) {
    this.#count -= quantity
    this.#isLit = false

    if (this.#count <= 0) {
      this.#count = 0
      this.#charge = 0

      return
    }

    this.#charge = this.#chargeLimit
  }

  getValues() {
    return {
      torchCount: this.#count,
      torchCharge: this.#charge,
      isLit: this.#isLit
    }
  }
}
