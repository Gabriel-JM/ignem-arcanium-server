import { FindAllTorchRegistriesRepository } from '@/data/protocols/repository/index.js'
import { FindAllTorchRegistries } from '@/domain/usecases/index.js'

export class DbFindAllTorchRegistries implements FindAllTorchRegistries {
  #findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository

  constructor(findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository) {
    this.#findAllTorchRegistriesRepository = findAllTorchRegistriesRepository
  }

  async findAll() {
    const torchRegistriesList = await this.#findAllTorchRegistriesRepository.findAll()

    return torchRegistriesList
  }
}
