import { CharacterHealthPoints } from '@/domain/value-objects/index.ts'

describe('CharacterHealthPoints', () => {
  it('should generate the correct health points value', () => {
    const character1Hp = new CharacterHealthPoints(2, 2, 2)
    const character2Hp = new CharacterHealthPoints(6, 2, 4)

    expect(character1Hp.value).toBe(16)
    expect(character2Hp.value).toBe(36)
  })
})
