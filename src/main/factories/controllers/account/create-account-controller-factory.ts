import { DbCreateAccount } from '@/data/usecases'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { ErrorHandlerControllerDecorator, ValidationControllerDecorator } from '@/main/decorators'
import { makeKnexAccountRepository } from '@/main/factories/repositories'
import { makeBcryptHasher } from '@/main/factories/services'
import { makeCreateAccountValidator } from '@/main/factories/validators'
import { CreateAccountController } from '@/presentation/controllers'

export function makeCreateAccountController() {
  const nanoIdGenerator = new NanoIdUniqueIdGenerator()
  const bcryptHashser = makeBcryptHasher()
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
