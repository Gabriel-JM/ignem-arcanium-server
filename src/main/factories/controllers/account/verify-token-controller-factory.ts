import { LocalVerifyToken } from '@/data/usecases'
import { JwtEncrypter } from '@/infra/cryptography'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators'
import { makeVerifyTokenValidator } from '@/main/factories/validators/account/verify-token-validator-factory'
import { GenericController } from '@/presentation/controllers'
import { noContent } from '@/presentation/helpers'

export function makeVerifyTokenController() {
  const jwtEncrypter = new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  const verifyToken = new LocalVerifyToken(jwtEncrypter)
  const controller = new GenericController(
    (...args: [any]) => Promise.resolve(verifyToken.verify(...args)),
    noContent
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeVerifyTokenValidator()
  )
}
