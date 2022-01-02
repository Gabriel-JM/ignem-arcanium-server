import { FindAllTorchRegistries } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
import { Controller } from '@/presentation/protocols'

export class FindAllTorchRegistriesController implements Controller {
  constructor(private readonly findAllTorchRegistries: FindAllTorchRegistries) {}

  async handle() {
    const registries = await this.findAllTorchRegistries.findAll()

    return ok(registries)
  }
}
