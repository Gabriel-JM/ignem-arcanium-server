import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CreateCharacterRepository } from '@/data/protocols/repository'
import { CreateCharacter, CreateCharacterParams, CreateCharacterResult } from '@/domain/usecases'
import { CharacterHealthPoints, CharacterManaPoints } from '@/domain/value-objects'

export class DbCreateCharacter implements CreateCharacter {
  constructor(
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly createCharacterRepository: CreateCharacterRepository
  ) {}
  
  async create(params: CreateCharacterParams): Promise<CreateCharacterResult> {
    const id = this.uniqueIdGenerator.generate()
    const inventoryId = this.uniqueIdGenerator.generate()

    const hp = new CharacterHealthPoints(
      params.level,
      params.strength,
      params.constitution
    ).value
    const mp = new CharacterManaPoints(params.level, params.intelligence).value

    await this.createCharacterRepository.create({
      id,
      inventoryId,
      accountId: params.accountId,
      name: params.name,
      icon: params.icon,
      level: params.level,
      characterPoints: params.characterPoints,
      gold: params.gold,
      hp,
      mp,
      alignment: params.alignment,
      description: params.description,
      strength: params.strength,
      dexterity: params.dexterity,
      constitution: params.constitution,
      intelligence: params.intelligence,
      wisdom: params.wisdom,
      charisma: params.charisma
    })

    return { id }
  }
}
