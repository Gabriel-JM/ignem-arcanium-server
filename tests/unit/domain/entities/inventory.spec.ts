import { Inventory } from '@/domain/entities/index.js'
import { fakeItem } from '@/tests/unit/mocks/items.js'

describe('Inventory', () => {
  it('should calculate the total weight of the inventory by its items', () => {
    const sut = new Inventory([
      { ...fakeItem(), weight: 1 },
      { ...fakeItem(), weight: 5 },
      { ...fakeItem(), weight: 10 }
    ])

    expect(sut.weight).toBe(16)
  })
})