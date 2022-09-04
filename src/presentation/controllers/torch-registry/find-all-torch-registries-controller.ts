import { FindAllTorchRegistries } from '@/domain/usecases/index.js'
import { ok } from '@/presentation/helpers/index.js'
import { Controller } from '@/presentation/protocols/index.js'

export class FindAllTorchRegistriesController implements Controller {
  #findAllTorchRegistries: FindAllTorchRegistries

  constructor(findAllTorchRegistries: FindAllTorchRegistries) {
    this.#findAllTorchRegistries = findAllTorchRegistries
  }

  async handle() {
    const registries = await this.#findAllTorchRegistries.findAll()

    return ok(registries)
  }
}
