export interface DbAlchemicalItem {
  id: string
  item_id: string
  brew_price: number
  brew_time: number
  effects: string
}

export const alchemicalItemsFields = ([
  'item_id',
  'brew_price',
  'brew_time',
  'effects'
]).map(field => `alchemical_items.${field}`)
