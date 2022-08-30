import { ValidatorComposite } from '@/validation/composites'
import { RequiredFieldsValidator, TypeValidator } from '@/validation/validators'

export function makeVerifyTokenValidator() {
  return new ValidatorComposite([
    new RequiredFieldsValidator('token'),
    new TypeValidator({ token: 'string' })
  ])
}