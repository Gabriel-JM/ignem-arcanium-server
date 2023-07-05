import { CreateCharacterController } from '@/presentation/controllers/index.ts'
import { created } from '@/presentation/helpers/http.ts'
import { fakeCreateCharacterParams } from '@/tests/unit/mocks/character.ts'
import { fakeArmor, fakeItem, fakeWeapon } from '@/tests/unit/mocks/items.ts'

function makeSut() {
  const createCharacterSpy = {
    result: { id: 'any_character_id' },
    create: vi.fn(() => Promise.resolve({ id: 'any_character_id' }))
  }
  const sut = new CreateCharacterController(createCharacterSpy)

  return {
    sut,
    createCharacterSpy
  }
}

describe('CreateCharacterController', () => {
  const fakeParams = fakeCreateCharacterParams()

  it('should call CreateCharacter with correct required values', async () => {
    const { sut, createCharacterSpy } = makeSut()

    await sut.handle({
      ...fakeParams,
      equipment: undefined,
      inventoryItems: undefined
    })

    expect(createCharacterSpy.create).toHaveBeenCalledWith({
      ...fakeParams,
      equipment: {},
      inventoryItems: []
    })
  })

  it('should call CreateCharacter with correct values when all is passed', async () => {
    const { sut, createCharacterSpy } = makeSut()
    const params = {
      ...fakeParams,
      equipment: {
        rightHand: 'any_right_hand_id',
        armor: 'any_armor_id'
      },
      inventoryItems: [{
        itemId: 'any_item_id',
        quantity: 1
      }]
    }

    await sut.handle(params)

    expect(createCharacterSpy.create).toHaveBeenCalledWith(params)
  })

  it('should return the created character id with created response', async () => {
    const { sut, createCharacterSpy } = makeSut()

    const response = await sut.handle(fakeParams)
    
    expect(response).toEqual(created(createCharacterSpy.result))
  })
})
