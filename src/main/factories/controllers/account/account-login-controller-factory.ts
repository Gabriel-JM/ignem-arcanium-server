import { DbAccountLogin } from '@/data/usecases'
import { BcryptHasher, JwtEncrypter } from '@/infra/cryptography'
import { ErrorHandlerControllerDecorator, ValidationControllerDecorator } from '@/main/decorators'
import { makeKnexAccountRepository } from '@/main/factories/repositories'
import { makeAccountLoginValidator } from '@/main/factories/validators/account/account-login-validator-factory'
import { GenericController } from '@/presentation/controllers'

export function makeAccountLoginController() {
  const jwtEncrypter = new JwtEncrypter('secret')
  const salt = 12
  const bcryptHasher = new BcryptHasher(salt)
  const accountRepository = makeKnexAccountRepository()
  const dbAccountLogin = new DbAccountLogin(
    accountRepository,
    bcryptHasher,
    jwtEncrypter
  )

  const controller = new GenericController(
    dbAccountLogin.login.bind(dbAccountLogin)
  )

  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(
      makeAccountLoginValidator(),
      controller
    )
  )
}
