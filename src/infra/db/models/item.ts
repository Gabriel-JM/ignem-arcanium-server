export interface DbItem {
  id: string
  name: string
  type: string
  rarity: string
  description: string
  charges: number
  price: number
  weight: number
  requirements?: Record<string, string>
}

export const itemsFields = ([
  'name',
  'type',
  'rarity',
  'description',
  'price',
  'weight',
  'requirements'
]).map(field => `items.${field}`)
