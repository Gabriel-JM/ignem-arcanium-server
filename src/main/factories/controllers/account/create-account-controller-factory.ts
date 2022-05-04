import { DbCreateAccount } from '@/data/usecases'
import { JwtEncrypter } from '@/infra/cryptography'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators'
import { makeKnexAccountRepository } from '@/main/factories/repositories'
import { makeBcryptHasher } from '@/main/factories/services'
import { makeCreateAccountValidator } from '@/main/factories/validators'
import { CreateAccountController } from '@/presentation/controllers'

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
