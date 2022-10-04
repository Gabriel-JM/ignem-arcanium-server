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

export function fakeInventoryItem() {
  return { ...fakeItem(), quantity: 1 }
}

export function fakeWeapon() {
  return <Weapon> {
    ...fakeItem(),
    type: 'WEAPON',
    damage: { slash: '1D6' },
    distance: 0,
    initiativeModifier: 0,
    properties: []
  }
}

export function fakeShield() {
  return <ShieldOrArmor> {
    ...fakeItem(),
    type: 'SHIELD',
    damageReduction: { slash: '1' },
    distance: 0,
    initiativeModifier: 0,
    properties: []
  }
}

export function fakeArmor() {
  return <ShieldOrArmor> {
    ...fakeShield(),
    type: 'ARMOR'
  }
}

export function fakeAccessory() {
  return <Item> {
    ...fakeItem(),
    type: 'ACCESSORY'
  }
}

export function mockListAllCommonItemsRepository() {
  const result = [fakeItem()]

  return {
    result,
    listAllCommon: vi.fn(() => Promise.resolve(result))
  }
}

export function mockFindSlotItemByIdRepository() {
  return {
    findSlotItemById: vi.fn((params) => {
      return Promise.resolve(Object.keys(params).reduce((acc, key) => {
        return { ...acc, [key]: fakeItem() }
      }, {}))
    })
  }
}

export function mockFindManyItemsRepository() {
  return {
    findMany: vi.fn((params) => {
      return Promise.resolve(params.map((id: string) => {
        return { ...fakeItem(), id }
      }))
    })
  }
}
