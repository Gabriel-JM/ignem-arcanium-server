import { ConsumeAllTorchesCharge } from '@/domain/usecases/index.js'
import { noContent } from '@/presentation/helpers/index.js'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.js'

export class ConsumeAllTorchesChargeController implements Controller {
  #consumeAllTorchesCharge: ConsumeAllTorchesCharge
  
  constructor(consumeAllTorchesCharge: ConsumeAllTorchesCharge) {
    this.#consumeAllTorchesCharge = consumeAllTorchesCharge
  }

  async handle(): Promise<HTTPResponse> {
    await this.#consumeAllTorchesCharge.consumeAll()

    return noContent()
  }
}
