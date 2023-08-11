import { AccountLoginController } from '@/account/controllers/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeAccountLoginValidator } from '@/main/factories/validators/index.js'
import { makeBcryptHasher } from './bcrypt-hasher-factory.js'
import { makeJwtEncrypter } from './jwt-encrypter-factory.js'

export function makeAccountLoginController() {
  const jwtEncrypter = makeJwtEncrypter()
  const bcryptHasher = makeBcryptHasher()
  const accountRepository = makeKnexAccountRepository()
  const controller = new AccountLoginController(
    accountRepository,
    bcryptHasher,
    jwtEncrypter
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeAccountLoginValidator()
  )
}
