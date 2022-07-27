export function fakeItem() {
  return {
    id: 'any_id',
    name: 'any_name',
    type: 'any_type',
    description: 'any_description',
    rarity: 'any_rarity',
    charges: 0,
    price: 10,
    weight: 10,
    requirements: {}
  }
}

export function mockListAllCommonItemsRepository() {
  const result = [fakeItem()]

  return {
    result,
    listAllCommon: jest.fn(() => Promise.resolve(result))
  }
}
