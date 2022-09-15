import { CreateAccountController } from '@/presentation/controllers/index.js'
import { created } from '@/presentation/helpers/index.js'
import { mockCreateAccount } from '@/tests/unit/mocks/index.js'

function makeSut() {
  const createAccountSpy = mockCreateAccount()
  const sut = new CreateAccountController(createAccountSpy)

  return {
    sut,
    createAccountSpy
  }
}

describe('CreateAccountController', () => {
  const dummyCreateAccount = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call CreateAccount with correct values', async () => {
    const { sut, createAccountSpy } = makeSut()

    await sut.handle(dummyCreateAccount)

    expect(createAccountSpy.create).toHaveBeenCalledWith({
      name: dummyCreateAccount.name,
      email: dummyCreateAccount.email,
      password: dummyCreateAccount.password
    })
  })

  it('should return the access credentials on success', async () => {
    const { sut, createAccountSpy } = makeSut()

    const response = await sut.handle(dummyCreateAccount)

    expect(response).toEqual(created(createAccountSpy.result))
  })
})
