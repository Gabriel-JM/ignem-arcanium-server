import { nanoid } from 'nanoid'

export function makeWeapons() {
  return [
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Dagger',
      description: 'Deadly short range blade',
      damage: 'STR/DEX+1',
      damage_type: '["SLASH","PIERCE"]',
      properties: '["THROWABLE","LIGHT","PRECISION"]',
      initiative_modifier: 1,
      price: 5,
      weight: 25,
      distance: 0
    },
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Wood Staff',
      description: 'A wood made combat staff',
      damage: 'STR+2',
      damage_type: '["STRIKE"]',
      properties: '[]',
      initiative_modifier: 0,
      price: 10,
      weight: 60,
      distance: 0
    },
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Short Sword',
      description: 'A short and light weight combat sword',
      damage: 'STR/DEX+2',
      damage_type: '["SLASH","PIERCE"]',
      properties: '["LIGHT"]',
      initiative_modifier: 0,
      price: 10,
      weight: 45,
      distance: 0
    },
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Long Sword',
      description: 'Most common and versatile sword used by warriors and kings',
      damage: 'STR+3',
      damage_type: '["SLASH","PIERCE"]',
      properties: '["RESISTANT"]',
      initiative_modifier: -2,
      price: 14,
      weight: 70,
      distance: 0
    },
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Great Sword',
      description: 'A really long blade sword, that most be used with two hands and sometimes',
      damage: 'STR+4',
      damage_type: '["SLASH","PIERCE"]',
      properties: '["RESISTANCE","TWO_HANDS","HEAVY"]',
      initiative_modifier: -4,
      price: 18,
      weight: 105,
      distance: 0
    },
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Rapier',
      description: 'A straight sword with a narrow pointed blade',
      damage: 'STR/DEX+2',
      damage_type: '["PIERCE"]',
      properties: '["LIGHT"]',
      initiative_modifier: 0,
      price: 12,
      weight: 40,
      distance: 0
    },
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Rapier',
      description: 'A straight sword with a narrow pointed blade',
      damage: 'STR/DEX+2',
      damage_type: '["PIERCE"]',
      properties: '["LIGHT"]',
      initiative_modifier: 0,
      price: 12,
      weight: 40,
      distance: 0
    }
  ]
}
