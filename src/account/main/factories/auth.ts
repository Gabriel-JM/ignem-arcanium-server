import { LoadAccountByTokenController } from '@/account/controllers/load-account-by-token-controller.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { Controller } from '@/common/presentation/protocols/index.js'
import { AuthControllerDecorator } from '../decorators/auth-controller-decorator.js'
import { makeJwtEncrypter } from './jwt-encrypter-factory.js'

export function makeAuthDecorator(controller: Controller) {
  const loadAccountByToken = new LoadAccountByTokenController(
    makeJwtEncrypter(),
    makeKnexAccountRepository()
  )
  
  return new AuthControllerDecorator(loadAccountByToken, controller)
}
