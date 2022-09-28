import { Equipment, EquipmentProps, Inventory, InventoryProps } from '@/domain/entities/index.js'
import { Attributes } from '@/domain/interfaces/index.js'
import { CharacterHealthPoints, CharacterManaPoints } from '@/domain/value-objects/index.js'
import { CharacterStatus } from './status.js'

export interface CharacterProps {
  level: number
  attributes: Attributes
  equipments?: EquipmentProps
  inventoryItems?: InventoryProps
}

export class Character {
  #status: Array<CharacterStatus> = []
  #attributes: Attributes
  #level: number
  #hp: CharacterHealthPoints
  #mp: CharacterManaPoints
  #equipment: Equipment
  #inventory: Inventory
  #maxInventoryWeight = 200

  constructor({
    level,
    attributes,
    equipments,
    inventoryItems
  }: CharacterProps) {
    this.#level = level
    this.#attributes = attributes
    this.#hp = new CharacterHealthPoints(
      level,
      attributes.strength,
      attributes.constitution
    )
    this.#mp = new CharacterManaPoints(
      level,
      attributes.intelligence
    )

    this.#equipment = new Equipment(equipments ?? {})
    this.#inventory = new Inventory(inventoryItems ?? [])

    if (this.#inventory.weight > this.#maxInventoryWeight) {
      this.#status.push(CharacterStatus.OVERLOADED)
    }
  }

  get status() {
    return this.#status
  }

  get healthAndManaPoints() {
    return {
      hp: this.#hp,
      mp: this.#mp
    }
  }
}
