import { Torch, TorchData } from '@/domain/entities/index.js'

const makeSut = ({
  count = 1,
  charge = 6,
  isLit = true
}: Partial<TorchData> = {}) => new Torch({
  count,
  charge,
  isLit
})

describe('Torch', () => {
  describe('addTorch()', () => {
    it('should increase the torch count by adding a torch', () => {
      const sut = makeSut()

      sut.addTorch(1)

      expect(sut.getValues()).toEqual({
        torchCount: 2,
        torchCharge: 6,
        isLit: true
      })
    })
  })

  describe('increaseCharge()', () => {
    it('should correct increase charge by the given amount', () => {
      const sut = makeSut({
        charge: 1
      })

      sut.increaseCharge(3)

      expect(sut.getValues()).toEqual({
        torchCount: 1,
        torchCharge: 4,
        isLit: true
      })
    })

    it('should not increase charge above 6', () => {
      const sut = makeSut({
        charge: 5
      })

      sut.increaseCharge(2)

      expect(sut.getValues()).toEqual({
        torchCount: 1,
        torchCharge: 6,
        isLit: true
      })
    })
  })

  describe('consumeCharge()', () => {
    it('should not decrease torch charge if torch is not lit', () => {
      const sut = makeSut({ isLit: false })

      sut.consumeCharge()

      expect(sut.getValues()).toEqual({
        torchCount: 1,
        torchCharge: 6,
        isLit: false
      })
    })

    it('should decrease torch charge if torch is lit', () => {
      const sut = makeSut()

      sut.consumeCharge()

      expect(sut.getValues()).toEqual({
        torchCount: 1,
        torchCharge: 5,
        isLit: true
      })
    })

    it('should decrease torch count and reset charge if torch charge is decreased to 0', () => {
      const sut = makeSut({ count: 2, charge: 1 })

      sut.consumeCharge()

      expect(sut.getValues()).toEqual({
        torchCount: 1,
        torchCharge: 6,
        isLit: false
      })
    })

    it('should not reset charge and set isLit to false if count is decreased to zero', () => {
      const sut = makeSut({ count: 1, charge: 1 })

      sut.consumeCharge()

      expect(sut.getValues()).toEqual({
        torchCount: 0,
        torchCharge: 0,
        isLit: false
      })
    })
  })

  describe('removeTorch()', () => {
    it('should not remove a torch below then zero', () => {
      const sut = makeSut()

      sut.removeTorch(2)

      expect(sut.getValues()).toEqual({
        torchCount: 0,
        torchCharge: 0,
        isLit: false
      })
    })

    it('should reset charge if torch count is greater then zero after remove', () => {
      const sut = makeSut({ count: 3 })

      sut.removeTorch()

      expect(sut.getValues()).toEqual({
        torchCount: 2,
        torchCharge: 6,
        isLit: false
      })
    })
  })
})
