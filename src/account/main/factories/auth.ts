import { LoadAccountByTokenController } from '@/account/controllers/load-account-by-token-controller.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeJwtEncrypter } from '@/main/factories/services/index.js'
import { Controller } from '@/presentation/protocols/index.js'
import { AuthControllerDecorator } from '../decorators/auth-controller-decorator.js'

export function makeAuthDecorator(controller: Controller) {
  const loadAccountByToken = new LoadAccountByTokenController(
    makeJwtEncrypter(),
    makeKnexAccountRepository()
  )
  
  return new AuthControllerDecorator(loadAccountByToken, controller)
}
