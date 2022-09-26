import { Item, ShieldOrArmor, Weapon } from '@/domain/interfaces/index.js'

export function fakeItem() {
  return <Item> {
    id: 'any_id',
    name: 'any_name',
    type: 'CONSUMABLE',
    description: 'any_description',
    rarity: 'any_rarity',
    charges: 0,
    price: 10,
    weight: 10,
    requirements: {}
  }
}

export function fakeWeapon() {
  return <Weapon> {
    ...fakeItem(),
    damage: { slash: '1D6' },
    distance: 0,
    initiativeModifier: 0,
    properties: []
  }
}

export function fakeShieldOrArmor() {
  return <ShieldOrArmor> {
    ...fakeItem(),
    damageReduction: { slash: '1' },
    distance: 0,
    initiativeModifier: 0,
    properties: []
  }
}

export function mockListAllCommonItemsRepository() {
  const result = [fakeItem()]

  return {
    result,
    listAllCommon: vi.fn(() => Promise.resolve(result))
  }
}
