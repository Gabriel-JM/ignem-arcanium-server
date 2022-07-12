import { nanoid } from 'nanoid'

export function makeWeapons() {
  return [
    {
      itemId: nanoid(),
      weaponId: nanoid(),
      name: 'Dagger',
      description: 'Deadly short range blades',
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
    }
  ]
}
