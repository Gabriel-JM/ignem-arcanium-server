import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import { CreateCharacterRepository } from '@/data/protocols/repository/index.js'
import { CreateCharacter, CreateCharacterParams, CreateCharacterResult } from '@/domain/usecases/index.js'
import { CharacterHealthPoints, CharacterManaPoints } from '@/domain/value-objects/index.js'

export class DbCreateCharacter implements CreateCharacter {
  #uniqueIdGenerator: UniqueIdGenerator
  #createCharacterRepository: CreateCharacterRepository

  constructor(
    uniqueIdGenerator: UniqueIdGenerator,
    createCharacterRepository: CreateCharacterRepository
  ) {
    this.#uniqueIdGenerator = uniqueIdGenerator
    this.#createCharacterRepository = createCharacterRepository
  }
  
  async create(params: CreateCharacterParams): Promise<CreateCharacterResult> {
    const id = this.#uniqueIdGenerator.generate()
    const inventoryId = this.#uniqueIdGenerator.generate()

    const hp = new CharacterHealthPoints(
      params.level,
      params.strength,
      params.constitution
    ).value
    const mp = new CharacterManaPoints(params.level, params.intelligence).value

    await this.#createCharacterRepository.create({
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
      charisma: params.charisma,
      inventoryItems: params.inventoryItems
    })

    return { id }
  }
}
