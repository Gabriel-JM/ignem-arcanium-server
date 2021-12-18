import { FindAllTorchRegistriesRepository } from '@/data/protocols/repository/find-all-torch-registries-repository'
import { ConsumeAllTorchesCharge } from '@/domain/usecases'

export class DbConsumeAllTorchesCharge implements ConsumeAllTorchesCharge {
  constructor(private readonly findAllTorchRegistriesRepository: FindAllTorchRegistriesRepository) {}
  
  async consumeAll() {
    await this.findAllTorchRegistriesRepository.findAll()
  }
}
