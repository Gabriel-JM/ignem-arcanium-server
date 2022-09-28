import { Item } from './item.js'

export interface InventoryItem extends Item {
  quantity: number
}
