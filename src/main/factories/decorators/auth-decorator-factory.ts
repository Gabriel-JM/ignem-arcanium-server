import { DbLoadAccountByToken } from '@/data/usecases/index.js'
import { AuthControllerDecorator } from '@/main/decorators/index.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeJwtEncrypter } from '@/main/factories/services/index.js'
import { Controller } from '@/presentation/protocols/index.js'

export function makeAuthDecorator(controller: Controller) {
  const jwtEncrypter = makeJwtEncrypter()
  const knexAccountRepository = makeKnexAccountRepository()
  const loadAccountByToken = new DbLoadAccountByToken(jwtEncrypter, knexAccountRepository)
  
  return new AuthControllerDecorator(loadAccountByToken, controller)
}
