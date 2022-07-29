export interface DbWeapon {
  id: string
  item_id: string
  damage: Record<string, string>
  properties: string[]
  initiative_modifier: number
  distance: number
}
