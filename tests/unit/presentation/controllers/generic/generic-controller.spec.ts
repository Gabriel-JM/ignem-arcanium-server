import { GenericController } from '@/presentation/controllers'
import { badRequest, ok } from '@/presentation/helpers'

function makeSut(responseFunction = ok) {
  const fakeUsecaseMethod = vi.fn(() => Promise.resolve({
    hello: 'world'
  }))
  const sut = new GenericController(fakeUsecaseMethod, responseFunction)

  return {
    sut,
    fakeUsecaseMethod
  }
}

describe('GenericController', () => {
  it('should call usecaseMethod with correct values', async () => {
    const { sut, fakeUsecaseMethod } = makeSut()

    await sut.handle({ data: 1 })

    expect(fakeUsecaseMethod).toHaveBeenCalledWith({ data: 1 })
  })

  it('should return a ok response by default', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ data: 1 })

    expect(response).toEqual(ok({ hello: 'world' }))
  })

  it('should return the correct injected response type', async () => {
    const { sut } = makeSut(badRequest)

    const response = await sut.handle({ data: 1 })

    expect(response).toEqual(badRequest({ hello: 'world' }))
  })
})
