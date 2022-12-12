export interface DbGem {
  id: string
  item_id: string
  magic_tier: number
}

export const gemsFields = ([
  'item_id',
  'magic_tier'
]).map(field => `gems.${field}`)
