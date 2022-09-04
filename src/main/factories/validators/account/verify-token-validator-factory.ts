import { ValidatorComposite } from '@/validation/composites/index.js'
import { RequiredFieldsValidator, TypeValidator } from '@/validation/validators/index.js'

export function makeVerifyTokenValidator() {
  return new ValidatorComposite(
    new RequiredFieldsValidator('token'),
    new TypeValidator({ token: 'string' })
  )
}