import { Item } from './item.ts'

export type WeaponProperties = (
  | 'THROWABLE'
  | 'LIGHT'
  | 'RESISTANT'
  | 'TWO_HANDS'
  | 'HEAVY'
  | 'AMMUNITION'
  | 'RELOAD'
  | 'PRECISION'
)

export interface Weapon extends Item {
  damage: Record<string, string>
  properties: WeaponProperties[]
  initiativeModifier: number
  distance: number
}
