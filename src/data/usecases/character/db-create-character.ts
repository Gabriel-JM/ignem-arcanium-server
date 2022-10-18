import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import { CreateCharacterRepository, FindManyItemsRepository, FindSlotItemByIdRepository } from '@/data/protocols/repository/index.js'
import { Character } from '@/domain/entities/index.js'
import { ShieldOrArmor, Weapon } from '@/domain/interfaces/index.js'
import { CreateCharacter, CreateCharacterParams, CreateCharacterResult } from '@/domain/usecases/index.js'

export class DbCreateCharacter implements CreateCharacter {
  #uniqueIdGenerator: UniqueIdGenerator
  #findSlotItemsRepository: FindSlotItemByIdRepository
  #findManyItemsRepository: FindManyItemsRepository
  #createCharacterRepository: CreateCharacterRepository

  constructor(
    uniqueIdGenerator: UniqueIdGenerator,
    findSlotItemsRepository: FindSlotItemByIdRepository,
    findManyItemsRepository: FindManyItemsRepository,
    createCharacterRepository: CreateCharacterRepository
  ) {
    this.#uniqueIdGenerator = uniqueIdGenerator
    this.#findSlotItemsRepository = findSlotItemsRepository
    this.#findManyItemsRepository = findManyItemsRepository
    this.#createCharacterRepository = createCharacterRepository
  }
  
  async create(params: CreateCharacterParams): Promise<CreateCharacterResult> {
    const id = this.#uniqueIdGenerator.generate('characters')

    const equipmentItems = await this.#findSlotItemsRepository.findSlotItemById(
      { ...params.equipment }
    )
    const items = await this.#findManyItemsRepository
      .findMany(params.inventoryItems
        .map(inventoryItem => inventoryItem.itemId)
      )

    const character = new Character({
      level: params.level,
      attributes: {
        strength: params.strength,
        dexterity: params.dexterity,
        constitution: params.constitution,
        intelligence: params.intelligence,
        wisdom: params.wisdom,
        charisma: params.charisma
      },
      equipments: {
        leftHand: equipmentItems.leftHand as Weapon,
        rightHand: equipmentItems.rightHand as Weapon,
        armor: equipmentItems.armor as ShieldOrArmor,
        accessory1: equipmentItems.accessory1,
        accessory2: equipmentItems.accessory2
      },
      inventoryItems: items?.map(item => {
        const inventoryItem = params.inventoryItems.find(i => {
          return i.itemId === item.id
        })

        if (!inventoryItem) {
          throw new Error('Find wrong item')
        }

        return { ...item, quantity: inventoryItem.quantity }
      }) ?? []
    })

    const { hp, mp } = character.healthAndManaPoints

    await this.#createCharacterRepository.create({
      id,
      accountId: params.accountId,
      name: params.name,
      icon: params.icon,
      level: params.level,
      characterPoints: params.characterPoints,
      gold: params.gold,
      statusEffects: character.status,
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
      equipment: {
        leftHand: equipmentItems.leftHand?.id,
        rightHand: equipmentItems.rightHand?.id,
        armor: equipmentItems.armor?.id,
        accessory1: equipmentItems.accessory1?.id,
        accessory2: equipmentItems.accessory2?.id
      },
      inventoryItems: params.inventoryItems
    })

    return { id }
  }
}
