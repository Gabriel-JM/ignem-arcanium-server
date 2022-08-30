import { ValidatorComposite } from '@/validation/composites'
import { RegexValidator, RequiredFieldsValidator, TypeValidator } from '@/validation/validators'

export function makeAccountLoginValidator() {
  return new ValidatorComposite([
    new RequiredFieldsValidator('email', 'password'),
    new TypeValidator({ email: 'string', password: 'string' }),
    new RegexValidator({ email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  ])
}
