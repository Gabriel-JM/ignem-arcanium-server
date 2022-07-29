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
