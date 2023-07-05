import { LoadAccountByTokenController } from '@/account/controllers/load-account-by-token-controller.ts'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.ts'
import { makeJwtEncrypter } from '@/main/factories/services/index.ts'
import { Controller } from '@/presentation/protocols/index.ts'
import { AuthControllerDecorator } from '../decorators/auth-controller-decorator.ts'

export function makeAuthDecorator(controller: Controller) {
  const loadAccountByToken = new LoadAccountByTokenController(
    makeJwtEncrypter(),
    makeKnexAccountRepository()
  )
  
  return new AuthControllerDecorator(loadAccountByToken, controller)
}
