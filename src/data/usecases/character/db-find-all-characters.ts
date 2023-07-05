import { FindAllCharactersRepository } from '@/data/protocols/repository/index.ts'
import {
  FindAllCharacters,
  FindAllCharactersParams,
  FindAllCharactersResult
} from '@/domain/usecases/index.ts'

export class DbFindAllCharacters implements FindAllCharacters {
  #findAllCharactersRepository: FindAllCharactersRepository
  
  constructor(
    findAllCharactersRepository: FindAllCharactersRepository
  ) {
    this.#findAllCharactersRepository = findAllCharactersRepository
  }
  
  async findAll(params: FindAllCharactersParams): Promise<FindAllCharactersResult[]> {
    const characters = await this.#findAllCharactersRepository.findAll(params.accountId)

    return characters
  }
}
