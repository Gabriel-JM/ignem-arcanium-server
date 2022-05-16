import { ConsumeAllTorchesCharge } from '@/domain/usecases'
import { noContent } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'

export class ConsumeAllTorchesChargeController implements Controller {
  constructor(private readonly consumeAllTorchesCharge: ConsumeAllTorchesCharge) {}

  async handle(): Promise<HTTPResponse> {
    await this.consumeAllTorchesCharge.consumeAll()

    return noContent()
  }
}
