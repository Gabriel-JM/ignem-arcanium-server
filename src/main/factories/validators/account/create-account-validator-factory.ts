import { ValidatorComposite } from '@/validation/composites'
import { RegexValidator, RequiredFieldsValidator, TypeValidator } from '@/validation/validators'

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
