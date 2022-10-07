import { CreateCharacter, CreateCharacterInventoryItem } from '@/domain/usecases/index.js'
import { created } from '@/presentation/helpers/index.js'
import { Controller } from '@/presentation/protocols/controller.js'

interface CreateCharacterControllerParams {
  accountId: string
  name: string
  gold: number
  icon: string
  level: number
  characterPoints: number
  alignment: string
  description?: string
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  equipment?: {
    leftHand?: string
    rightHand?: string
    armor?: string
    accessory1?: string
    accessory2?: string
  }
  inventoryItems?: Array<CreateCharacterInventoryItem>
}

export class CreateCharacterController implements Controller {
  #createCharacter: CreateCharacter
  
  constructor(createCharacter: CreateCharacter) {
    this.#createCharacter = createCharacter
  }

  async handle(params: CreateCharacterControllerParams) {
    const characterId = await this.#createCharacter.create({
      accountId: params.accountId,
      name: params.name,
      gold: params.gold,
      icon: params.icon,
      level: params.level,
      characterPoints: params.characterPoints,
      alignment: params.alignment,
      description: params.description,
      strength: params.strength,
      dexterity: params.dexterity,
      constitution: params.constitution,
      intelligence: params.intelligence,
      wisdom: params.wisdom,
      charisma: params.charisma,
      equipment: params.equipment ?? {},
      inventoryItems: params.inventoryItems ?? []
    })

    return created(characterId)
  }  
}
