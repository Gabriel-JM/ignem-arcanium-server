export interface DbShieldAndArmor {
  id: string
  item_id: string
  damage_reduction: Record<string, string>
  properties: Record<string, string>
  initiative_modifier: number
}

export const shieldsAndArmorsFields = ([
  'item_id',
  'damage_reduction',
  'properties',
  'initiative_modifier'
]).map(field => `shields_armors.${field}`)

