import { VerifyTokenController } from '@/account/controllers/verify-token-controller.ts'
import { JwtEncrypter } from '@/infra/cryptography/index.ts'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.ts'
import { makeVerifyTokenValidator } from '@/main/factories/validators/index.ts'

export function makeVerifyTokenController() {
  const controller = new VerifyTokenController(
    new JwtEncrypter(process.env.ENCRYPTER_SECRET)
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeVerifyTokenValidator()
  )
}
