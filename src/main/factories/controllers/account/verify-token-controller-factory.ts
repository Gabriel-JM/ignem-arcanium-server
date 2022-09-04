import { LocalVerifyToken } from '@/data/usecases/index.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeVerifyTokenValidator } from '@/main/factories/validators/index.js'
import { GenericController } from '@/presentation/controllers/index.js'
import { noContent } from '@/presentation/helpers/index.js'

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
