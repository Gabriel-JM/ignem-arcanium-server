import { CreateAccountController } from '@/account/controllers/index.ts'
import { JwtEncrypter } from '@/infra/cryptography/index.ts'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.ts'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.ts'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.ts'
import { makeBcryptHasher } from '@/main/factories/services/index.ts'
import { makeCreateAccountValidator } from '@/main/factories/validators/index.ts'

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
