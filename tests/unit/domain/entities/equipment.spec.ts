import { Equipment } from '@/domain/entities/index.js'
import { InvalidEquipmentsError, TwoHandsInUseError } from '@/domain/errors/index.js'
import { ShieldOrArmor } from '@/domain/interfaces/index.js'
import { fakeItem, fakeArmor, fakeShield, fakeWeapon, fakeAccessory } from '@/tests/unit/mocks/items.js'

const defaultProps = {
  leftHand: fakeWeapon(),
  rightHand: fakeShield(),
  armor: fakeArmor(),
  accessory1: fakeAccessory(),
  accessory2: fakeAccessory()
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
        rightHand: { ...fakeShield(), type: 'CONSUMABLE' },
        accessory1: { ...fakeItem(), type: 'WEAPON' }
      })
    )
      .toThrowError(new InvalidEquipmentsError([
        {
          field: 'rightHand',
          slot: 'Right Hand',
          item: { ...fakeShield(), type: 'CONSUMABLE' }
        },
        {
          field: 'accessory1',
          slot: 'Accessory 1',
          item: { ...fakeItem(), type: 'WEAPON' }
        }
      ]))
  })

  it('should throw an TwoHandsInUseError if you equip a right hand with two hands already in use', () => {
    expect(
      () => makeSut({
        ...defaultProps,
        leftHand: { ...fakeWeapon(), properties: ['TWO_HANDS'] }
      })
    )
      .toThrowError(new TwoHandsInUseError({
        field: 'Left Hand',
        twoHandsWeapon: { ...fakeWeapon(), properties: ['TWO_HANDS'] },
        extraWeapon: defaultProps.rightHand
      }))
  })

  it('should throw an TwoHandsInUseError if you equip a left hand with two hands already in use', () => {
    expect(
      () => makeSut({
        ...defaultProps,
        rightHand: { ...fakeWeapon(), properties: ['TWO_HANDS'] } as unknown as ShieldOrArmor
      })
    )
      .toThrowError(new TwoHandsInUseError({
        field: 'Right Hand',
        twoHandsWeapon: { ...fakeWeapon(), properties: ['TWO_HANDS'] },
        extraWeapon: defaultProps.leftHand
      }))
  })
})
