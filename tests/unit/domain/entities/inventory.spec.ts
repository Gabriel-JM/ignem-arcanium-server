import { Inventory } from '@/domain/entities/index.ts'
import { fakeItem } from '@/tests/unit/mocks/items.ts'

describe('Inventory', () => {
  it('should calculate the total weight of the inventory by its items', () => {
    const sut = new Inventory([
      { ...fakeItem(), weight: 1, quantity: 2 },
      { ...fakeItem(), weight: 5, quantity: 4 },
      { ...fakeItem(), weight: 10, quantity: 3 }
    ])

    expect(sut.weight).toBe(52)
  })
})