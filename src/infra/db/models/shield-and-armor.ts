export interface DbShieldAndArmor {
  id: string
  item_id: string
  damage_reduction: Record<string, string>
  properties: Record<string, string>
  initiative_modifier: number
}
