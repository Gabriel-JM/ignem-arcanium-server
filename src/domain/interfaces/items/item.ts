export type ItemTypes = (
  | 'CONSUMABLE'
  | 'WEAPON'
  | 'SHIELD'
  | 'ARMOR'
  | 'ACCESSORY'
  | 'OIL'
  | 'OINTMENT'
  | 'POTION'
)

export interface Item {
  id: string
  name: string
  type: ItemTypes
  description: string
  price: number
  weight: number
  rarity: string
  charges?: number
  requirements: Record<string, number>
}

export interface ShieldOrArmor extends Item {
  damageReduction: Record<string, string>
  properties: string[]
  initiativeModifier: number
}

export interface AlchemicalItem extends Item {
  brewPrice: number
  brewTime: number
}

export interface Gem extends Item {
  magicTier: number
}
