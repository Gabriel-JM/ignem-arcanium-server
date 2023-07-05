import { FindSlotItemByIdRepository } from '@/data/protocols/repository/index.ts'
import { DbCreateCharacter } from '@/data/usecases/index.ts'
import {
  fakeArmor,
  fakeCreateCharacterParams,
  fakeWeapon,
  mockCreateCharacterRepository,
  mockFindManyItemsRepository,
  mockFindSlotItemByIdRepository,
  mockUniqueIdGenerator
} from '@/tests/unit/mocks/index.ts'

function makeSut() {
  const uniqueIdGeneratorSpy = mockUniqueIdGenerator()
  const createCharacterRepositorySpy = mockCreateCharacterRepository()
  const findSlotItemsRepositorySpy = mockFindSlotItemByIdRepository()
  findSlotItemsRepositorySpy.findSlotItemById.mockImplementation((params) => {
    return {
      ...params.leftHand && { leftHand: fakeWeapon() },
      ...params.rightHand && { rightHand: fakeWeapon() },
      ...params.armor && { armor: fakeArmor() }
    }
  })
  const findManyItemsRepositorySpy = mockFindManyItemsRepository()
  const sut = new DbCreateCharacter(
    uniqueIdGeneratorSpy,
    findSlotItemsRepositorySpy as FindSlotItemByIdRepository,
    findManyItemsRepositorySpy,
    createCharacterRepositorySpy
  )

  return {
    sut,
    uniqueIdGeneratorSpy,
    findSlotItemsRepositorySpy,
    findManyItemsRepositorySpy,
    createCharacterRepositorySpy
  }
}

describe('DbCreateCharacter', () => {
  const dummyCreateCharacterParams = fakeCreateCharacterParams()

  it('should call UniqueIdGenerator with correct values', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateCharacterParams)

    expect(uniqueIdGeneratorSpy.generate).toHaveBeenCalledWith('characters')
  })

  it('should call FindSlotItemByIdRepository with correct values', async () => {
    const { sut, findSlotItemsRepositorySpy } = makeSut()
    const fakeEquipment = {
      leftHand: 'left_hand_id',
      armor: 'armor_id'
    }

    await sut.create({
      ...dummyCreateCharacterParams,
      equipment: fakeEquipment
    })

    expect(findSlotItemsRepositorySpy.findSlotItemById)
      .toHaveBeenCalledWith(fakeEquipment)
  })

  it('should call FindManyItemsRepository with correct values', async () => {
    const { sut, findManyItemsRepositorySpy } = makeSut()

    await sut.create({
      ...dummyCreateCharacterParams,
      inventoryItems: [
        {
          itemId: 'any_item_id_1',
          quantity: 1
        },
        {
          itemId: 'any_item_id_2',
          quantity: 2
        }
      ]
    })

    expect(findManyItemsRepositorySpy.findMany).toHaveBeenCalledWith([
      'any_item_id_1',
      'any_item_id_2'
    ])
  })

  it('should call CreateCharacterRepository with correct values', async () => {
    const { sut, createCharacterRepositorySpy, uniqueIdGeneratorSpy } = makeSut()

    await sut.create(dummyCreateCharacterParams)

    expect(createCharacterRepositorySpy.create).toHaveBeenCalledWith({
      ...dummyCreateCharacterParams,
      id: uniqueIdGeneratorSpy.result,
      inventoryItems: [],
      statusEffects: [],
      hp: 12,
      mp: 12
    })
  })

  it('should return the id on success', async () => {
    const { sut, uniqueIdGeneratorSpy } = makeSut()

    const response = await sut.create(dummyCreateCharacterParams)

    expect(response).toEqual({ id: uniqueIdGeneratorSpy.result })
  })
})
