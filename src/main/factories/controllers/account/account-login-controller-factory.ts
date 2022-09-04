import { DbAccountLogin } from '@/data/usecases/index.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexAccountRepository } from '@/main/factories/repositories/index.js'
import { makeBcryptHasher } from '@/main/factories/services/index.js'
import { makeAccountLoginValidator } from '@/main/factories/validators/index.js'
import { GenericController } from '@/presentation/controllers/index.js'

export function makeAccountLoginController() {
  const jwtEncrypter = new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  const bcryptHasher = makeBcryptHasher()
  const accountRepository = makeKnexAccountRepository()
  const dbAccountLogin = new DbAccountLogin(
    accountRepository,
    bcryptHasher,
    jwtEncrypter
  )

  const controller = new GenericController(
    dbAccountLogin.login.bind(dbAccountLogin)
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeAccountLoginValidator()
  )
}
