import { InventoryItem } from '@/domain/interfaces/index.js'

export type InventoryProps = Array<InventoryItem>

export class Inventory {
  #weight: number
  
  constructor(props: InventoryProps) {
    const inventoryWeight = props.reduce((acc, item) => {
      return acc + item.weight * item.quantity
    }, 0)

    this.#weight = inventoryWeight    
  }

  get weight() {
    return this.#weight
  }
}
