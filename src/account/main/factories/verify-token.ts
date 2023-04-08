import { VerifyTokenController } from '@/account/controllers/verify-token-controller.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeVerifyTokenValidator } from '@/main/factories/validators/index.js'

export function makeVerifyTokenController() {
  const controller = new VerifyTokenController(
    new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeVerifyTokenValidator()
  )
}
