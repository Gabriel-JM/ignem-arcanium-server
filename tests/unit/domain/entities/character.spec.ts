import { CharacterStatus } from '@/domain/entities/character/status.ts'
import { Character, CharacterProps } from '@/domain/entities/index.ts'
import { fakeAccessory, fakeArmor, fakeInventoryItem, fakeItem, fakeShield, fakeWeapon } from '@/tests/unit/mocks/items.ts'

const defaultLevel = 1
const defaultAttributes = {
  strength: 1,
  dexterity: 1,
  constitution: 1,
  intelligence: 1,
  wisdom: 1,
  charisma: 1
}
const defaultEquiments = {
  leftHand: fakeWeapon(),
  rightHand: fakeShield(),
  armor: fakeArmor(),
  accessory1: fakeAccessory()
}
const defaultInventoryItems = [fakeInventoryItem()]


function makeSut({
    level = defaultLevel,
    attributes = defaultAttributes,
    equipments = defaultEquiments,
    inventoryItems = defaultInventoryItems
}: Partial<CharacterProps> = {}) {
  const sut = new Character({
    level,
    attributes,
    equipments,
    inventoryItems
  })

  return sut
}

describe('Character', () => {
  it('should add Overloaded status if inventory weight exceed the limit', () => {
    const sut = makeSut({
      inventoryItems: [
        fakeInventoryItem(),
        { ...fakeItem(), weight: 200, quantity: 1 }
      ]
    })

    expect(sut.status).toEqual([CharacterStatus.OVERLOADED])
  })

  it('should return the hp and mp points value when requested', () => {
    const sut = makeSut()

    expect(sut.healthAndManaPoints).toEqual({
      hp: 12,
      mp: 11
    })
  })
})
