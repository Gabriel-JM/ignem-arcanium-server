import { DbAccountLogin } from '@/data/usecases'
import { JwtEncrypter } from '@/infra/cryptography'
import { ErrorHandlerControllerDecorator, ValidationControllerDecorator } from '@/main/decorators'
import { makeKnexAccountRepository } from '@/main/factories/repositories'
import { makeBcryptHasher } from '@/main/factories/services'
import { makeAccountLoginValidator } from '@/main/factories/validators/account/account-login-validator-factory'
import { GenericController } from '@/presentation/controllers'

export function makeAccountLoginController() {
  const jwtEncrypter = new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  const bcryptHasher = makeBcryptHasher()
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
