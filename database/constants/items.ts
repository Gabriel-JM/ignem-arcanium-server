export const ItemTypes = {
  weapon: 'weapon',
  shield: 'shield',
  armor: 'armor',
  alchemicalItem: 'alchemicalItem',
  gem: 'gem',
  consumable: 'consumable',
  tool: 'tool'
} as const

export const ItemRarities = {
  common: 'common',
  uncommon: 'uncommon',
  rare: 'rare',
  epic: 'epic',
  lendary: 'legendary'
} as const

export const WeaponSubTypes = {
  dagger: 'dagger',
  staff: 'staff',
  shortSword: 'shortSword',
  longSword: 'longSword',
  greatSword: 'greatSword',
  rapier: 'rapier',
  axe: 'axe',
  greatAxe: 'greatAxe',
  hammer: 'hammer',
  greatHammer: 'greatHammer',
  shortBow: 'shortBow',
  bow: 'bow',
  longBow: 'longBow',
  handCrossbow: 'handCrossbow',
  crossbow: 'crossbow'
} as const

export const ShieldSubTypes = {
  buckler: 'buckler',
  lightShield: 'lightShield',
  mediumShield: 'mediumShield',
  greatShield: 'greatShield'
} as const

export const ArmorSubTypes = {
  cloth: 'cloth',
  lightArmor: 'lightArmor',
  mediumArmor: 'mediumArmor',
  heavyArmor: 'heavyArmor'
} as const

export const AlchemicalItemSubTypes = {
  potion: 'potion',
  elixir: 'elixir',
  ointment: 'ointment',
  poison: 'poison',
  oil: 'oil',
  gas: 'gas'
} as const
