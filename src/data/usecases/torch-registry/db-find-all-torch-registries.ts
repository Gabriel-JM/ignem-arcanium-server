import { FindAllTorchRegistriesRepository } from '@/data/protocols/repository'
import { FindAllTorchRegistries, FindAllTorchRegistriesResult } from '@/domain/usecases'

export class DbFindAllTorchRegistries implements FindAllTorchRegistries {
  constructor(private readonly findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository) {}

  async findAll() {
    const torchRegistriesList = await this.findAllTorchRegistriesRepository.findAll()

    return torchRegistriesList
  }
}
