export interface Item {
  id: string
  name: string
  type: string
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
