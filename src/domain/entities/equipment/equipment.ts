import { ItemTypes } from '@/domain/constants/items.js'
import { InvalidEquipmentsError } from '@/domain/errors/equipment/invalid-equipments-error.js'
import { TwoHandsInUseError } from '@/domain/errors/index.js'
import { Item, ShieldOrArmor, Weapon } from '@/domain/interfaces/index.js'

export type EquipementSlotErrors = Array<{
  slot: string
  field: string
  item: Item
}>

export interface EquipmentProps {
  leftHand?: Weapon | ShieldOrArmor
  rightHand?: Weapon | ShieldOrArmor
  armor?: ShieldOrArmor
  accessory1?: Item
  accessory2?: Item
}

export class Equipment {
  #leftHand?: Weapon | ShieldOrArmor
  #rightHand?: Weapon | ShieldOrArmor
  #armor?: ShieldOrArmor
  #accessory1?: Item
  #accessory2?: Item
  
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
    const validHandItemTypes = [ItemTypes.weapon, ItemTypes.shield]

    console.log({ rightHand: this.#rightHand })

    if (this.#leftHand) {
      const invalidLeftHandItem = !validHandItemTypes.includes(
        this.#leftHand?.type.toLowerCase() as typeof validHandItemTypes[number]
      )
      
      invalidLeftHandItem && errors.push({
        slot: 'Left Hand',
        field: 'leftHand',
        item: this.#leftHand
      })
    }
    
    if (this.#rightHand) {
      const invalidRightHandItem = !validHandItemTypes.includes(
        this.#rightHand?.type.toLowerCase() as typeof validHandItemTypes[number]
      )
      
      invalidRightHandItem && errors.push({
        slot: 'Right Hand',
        field: 'rightHand',
        item: this.#rightHand
      })
    }

    if (this.#armor) {
      this.#armor.type.toString() !== ItemTypes.armor && errors.push({
        slot: 'Armor',
        field: 'armor',
        item: this.#armor
      })
    }

    if (this.#accessory1) {
      this.#accessory1.type.toString() !== ItemTypes.accessory && errors.push({
        slot: 'Accessory 1',
        field: 'accessory1',
        item: this.#accessory1
      })
    }

    if (this.#accessory2) {
      this.#accessory2.type.toString() !== ItemTypes.accessory && errors.push({
        slot: 'Accessory 2',
        field: 'accessory2',
        item: this.#accessory2
      })
    }

    if (errors.length) {
      throw new InvalidEquipmentsError(errors)
    }

    this.#validateTwoHands(
      'Left Hand',
      this.#leftHand as Weapon,
      this.#rightHand as Weapon
    )
    this.#validateTwoHands(
      'Right Hand',
      this.#rightHand as Weapon,
      this.#leftHand as Weapon
    )
  }

  #validateTwoHands(
    field: string,
    twoHandsWeapon?: Weapon,
    extraWeapon?: Weapon
  ) {
    if (
      twoHandsWeapon?.properties?.includes('TWO_HANDS')
      && extraWeapon
    ) {
      throw new TwoHandsInUseError({
        field,
        twoHandsWeapon,
        extraWeapon
      })
    }
  }
}
