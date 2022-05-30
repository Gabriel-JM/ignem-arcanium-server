import { DbLoadAccountByToken } from '@/data/usecases'
import { AuthControllerDecorator } from '@/main/decorators'
import { makeKnexAccountRepository } from '@/main/factories/repositories'
import { makeJwtEncrypter } from '@/main/factories/services'
import { Controller } from '@/presentation/protocols'

export function makeAuthDecorator(controller: Controller) {
  const jwtEncrypter = makeJwtEncrypter()
  const knexAccountRepository = makeKnexAccountRepository()
  const loadAccountByToken = new DbLoadAccountByToken(jwtEncrypter, knexAccountRepository)
  
  return new AuthControllerDecorator(loadAccountByToken, controller)
}
