import { CharacterManaPoints } from '@/domain/value-objects/index.js'

describe('CharacterManaPoints', () => {
  it('should generate the correct mana points value', () => {
    const character1Mp = new CharacterManaPoints(2, 2)
    const character2Mp = new CharacterManaPoints(6, 3)

    expect(character1Mp.value).toBe(14)
    expect(character2Mp.value).toBe(28)
  })
})
