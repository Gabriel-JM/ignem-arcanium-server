import { InvalidEquipmentsError } from '@/domain/errors/invalid-equipments-error.js'
import { Item, ShieldOrArmor, Weapon } from '@/domain/interfaces/index.js'

export type EquipementSlotErrors = Array<{
  slot: string
  field: string
  item: Item
}>

export interface EquipmentProps {
  leftHand: Weapon | ShieldOrArmor
  rightHand: Weapon | ShieldOrArmor
  armor: ShieldOrArmor
  accessory1: Item
  accessory2: Item
}

export class Equipment {
  #leftHand: Weapon | ShieldOrArmor
  #rightHand: Weapon | ShieldOrArmor
  #armor: ShieldOrArmor
  #accessory1: Item
  #accessory2: Item
  
  constructor({
    leftHand,
    rightHand,
    armor,
    accessory1,
    accessory2
  }: EquipmentProps) {
    this.#leftHand = leftHand
    this.#rightHand = rightHand
    this.#armor = armor
    this.#accessory1 = accessory1
    this.#accessory2 = accessory2

    this.#validateEquipment()
  }

  #validateEquipment() {
    const errors: EquipementSlotErrors = []

    const validHandItemTypes = ['WEAPON', 'SHIELD']
    const invalidLeftHandItem = !validHandItemTypes.includes(this.#leftHand.type)
    const invalidRightHandItem = !validHandItemTypes.includes(this.#rightHand.type)

    invalidLeftHandItem && errors.push({
      slot: 'Left Hand',
      field: 'leftHand',
      item: this.#leftHand
    })
    invalidRightHandItem && errors.push({
      slot: 'Right Hand',
      field: 'rightHand',
      item: this.#rightHand
    })
    this.#armor.type !== 'ARMOR' && errors.push({
      slot: 'Armor',
      field: 'armor',
      item: this.#armor
    })
    this.#accessory1.type !== 'ACCESSORY' && errors.push({
      slot: 'Accessory 1',
      field: 'accessory1',
      item: this.#accessory1
    })
    this.#accessory2.type !== 'ACCESSORY' && errors.push({
      slot: 'Accessory 2',
      field: 'accessory2',
      item: this.#accessory2
    })

    if (errors.length) {
      throw new InvalidEquipmentsError(errors)
    }
  }
}
