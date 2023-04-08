import { AccountLoginController } from '@/account/controllers/index.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeBcryptHasher } from '@/main/factories/services/index.js'
import { makeAccountLoginValidator } from '@/main/factories/validators/index.js'

export function makeAccountLoginController() {
  const jwtEncrypter = new JwtEncrypter(process.env.ENCRYPTER_SECRET)
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
