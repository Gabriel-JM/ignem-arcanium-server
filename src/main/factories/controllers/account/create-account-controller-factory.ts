import { DbCreateAccount } from '@/data/usecases'
import { BcryptHasher } from '@/infra/cryptography'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { ErrorHandlerControllerDecorator, ValidationControllerDecorator } from '@/main/decorators'
import { makeKnexAccountRepository } from '@/main/factories/repositories'
import { makeCreateAccountValidator } from '@/main/factories/validators'
import { CreateAccountController } from '@/presentation/controllers'

export function makeCreateAccountController() {
  const nanoIdGenerator = new NanoIdUniqueIdGenerator()
  const salt = 12
  const bcryptHashser = new BcryptHasher(salt)
  const accountRepository = makeKnexAccountRepository()

  const dbCreateAccount = new DbCreateAccount(
    nanoIdGenerator,
    bcryptHashser,
    accountRepository
  )
  const controller = new CreateAccountController(dbCreateAccount)

  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(
      makeCreateAccountValidator(),
      controller
    )
  )
}
