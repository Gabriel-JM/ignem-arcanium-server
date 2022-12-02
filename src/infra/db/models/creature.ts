export interface DbCreature {
  id: string
  name: string
  icon: string
  alignment: string
  description: string
  gold: number
  status_effects: string[]
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export const creaturesFields = ([
  'name',
  'icon',
  'alignment',
  'description',
  'gold',
  'status_effects',
  'hp',
  'mp',
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]).map(field => `creatures.${field}`)
