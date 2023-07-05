import { AccountLoginController } from '@/account/controllers/index.ts'
import { JwtEncrypter } from '@/infra/cryptography/index.ts'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.ts'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.ts'
import { makeBcryptHasher } from '@/main/factories/services/index.ts'
import { makeAccountLoginValidator } from '@/main/factories/validators/index.ts'

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
