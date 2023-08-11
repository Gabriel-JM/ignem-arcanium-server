import { CreateAccountController } from '@/account/controllers/index.js'
import { JwtEncrypter } from '@/account/infra/cryptography/index.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeCreateAccountValidator } from '@/main/factories/validators/index.js'
import { makeBcryptHasher } from './bcrypt-hasher-factory.js'

export function makeCreateAccountController() {
  const jwtEncrypter = new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  const nanoIdGenerator = new NanoIdUniqueIdGenerator()
  const bcryptHashser = makeBcryptHasher()
  const accountRepository = makeKnexAccountRepository()

  const controller = new CreateAccountController(
    accountRepository,
    nanoIdGenerator,
    bcryptHashser,
    accountRepository,
    jwtEncrypter
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeCreateAccountValidator()
  )
}
