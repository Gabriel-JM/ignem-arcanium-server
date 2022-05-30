import { FindAllCharactersRepository } from '@/data/protocols/repository'
import { FindAllCharacters, FindAllCharactersParams, FindAllCharactersResult } from '@/domain/usecases'

export class DbFindAllCharacters implements FindAllCharacters {
  constructor(
    private readonly findAllCharactersRepository: FindAllCharactersRepository
  ) {}
  
  async findAll(params: FindAllCharactersParams): Promise<FindAllCharactersResult[]> {
    const characters = await this.findAllCharactersRepository.findAll(params.accountId)

    return characters
  }
}
