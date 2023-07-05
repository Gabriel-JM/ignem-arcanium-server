import { Item } from './item.ts'

export interface InventoryItem extends Item {
  quantity: number
}
