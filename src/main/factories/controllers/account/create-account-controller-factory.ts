import { DbCreateAccount } from '@/data/usecases/index.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeBcryptHasher } from '@/main/factories/services/index.js'
import { makeCreateAccountValidator } from '@/main/factories/validators/index.js'
import { CreateAccountController } from '@/presentation/controllers/index.js'

export function makeCreateAccountController() {
  const jwtEncrypter = new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  const nanoIdGenerator = new NanoIdUniqueIdGenerator()
  const bcryptHashser = makeBcryptHasher()
  const accountRepository = makeKnexAccountRepository()

  const dbCreateAccount = new DbCreateAccount(
    accountRepository,
    nanoIdGenerator,
    bcryptHashser,
    accountRepository,
    jwtEncrypter
  )
  const controller = new CreateAccountController(dbCreateAccount)

  return applyErrorAndValidationDecorators(
    controller,
    makeCreateAccountValidator()
  )
}
