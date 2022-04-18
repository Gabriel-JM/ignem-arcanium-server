import { CreateAccountController } from '@/presentation/controllers'
import { mockCreateAccount } from '@/tests/unit/helpers'

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
})
