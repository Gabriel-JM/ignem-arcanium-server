import { Equipment } from '@/domain/entities/index.js'
import { InvalidEquipmentsError } from '@/domain/errors/index.js'
import { fakeItem, fakeShieldOrArmor, fakeWeapon } from '@/tests/unit/mocks/items.js'

const defaultProps = {
  leftHand: fakeWeapon(),
  rightHand: fakeShieldOrArmor(),
  armor: fakeShieldOrArmor(),
  accessory1: fakeItem(),
  accessory2: fakeItem()
}

function makeSut(props = defaultProps) {
  const sut = new Equipment(props)

  return sut
}

describe('Equipment', () => {
  it('should throw an InvalidEquipmentError if an invalid item is equipped', () => {
    expect(
      () => makeSut({
        ...defaultProps,
        leftHand: { ...fakeWeapon(), type: 'ARMOR' }
      })
    )
      .toThrowError(new InvalidEquipmentsError([
        {
          field: 'leftHand',
          slot: 'Left Hand',
          item: {
            ...fakeWeapon(),
            type: 'ARMOR'
          }
        }
      ]))
  })

  it('should throw an InvalidEquipmentError if an invalid items are equipped', () => {
    expect(
      () => makeSut({
        ...defaultProps,
        rightHand: { ...fakeShieldOrArmor(), type: 'CONSUMABLE' },
        accessory1: { ...fakeItem(), type: 'WEAPON' }
      })
    )
      .toThrowError(new InvalidEquipmentsError([
        {
          field: 'rightHand',
          slot: 'Right Hand',
          item: {
            ...fakeShieldOrArmor(),
            type: 'CONSUMABLE'
          }
        },
        {
          field: 'accessory1',
          slot: 'Accessory 1',
          item: { ...fakeItem(), type: 'WEAPON' }
        }
      ]))
  })
})
