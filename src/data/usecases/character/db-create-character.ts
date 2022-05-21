import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CreateCharacterRepository } from '@/data/protocols/repository'
import { CreateCharacter, CreateCharacterParams, CreateCharacterResult } from '@/domain/usecases'

export class DbCreateCharacter implements CreateCharacter {
  constructor(
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly createCharacterRepository: CreateCharacterRepository
  ) {}
  
  async create(params: CreateCharacterParams): Promise<CreateCharacterResult> {
    const id = this.uniqueIdGenerator.generate()

    await this.createCharacterRepository.create({
      id,
      accountId: params.accountId,
      name: params.name,
      icon: params.icon,
      level: params.level,
      gold: params.gold,
      hp: params.hp,
      mp: params.mp,
      strength: params.strength,
      dexterity: params.dexterity,
      constitution: params.constitution,
      intelligence: params.intelligence,
      wisdom: params.wisdom,
      charism: params.charism
    })

    return { id }
  }
}
