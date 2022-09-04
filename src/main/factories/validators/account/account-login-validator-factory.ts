import { ValidatorComposite } from '@/validation/composites/index.js'
import {
  RegexValidator,
  RequiredFieldsValidator,
  TypeValidator
} from '@/validation/validators/index.js'

export function makeAccountLoginValidator() {
  return new ValidatorComposite(
    new RequiredFieldsValidator('email', 'password'),
    new TypeValidator({ email: 'string', password: 'string' }),
    new RegexValidator({ email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  )
}
