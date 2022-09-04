import { ValidatorComposite } from '@/validation/composites/index.js'
import {
  RegexValidator,
  RequiredFieldsValidator,
  TypeValidator
} from '@/validation/validators/index.js'

export function makeCreateAccountValidator() {
  return new ValidatorComposite(
    new RequiredFieldsValidator('name', 'email', 'password'),
    new TypeValidator({
      name: 'string',
      email: 'string',
      password: 'string'
    }),
    new RegexValidator({
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    })
  )
}
