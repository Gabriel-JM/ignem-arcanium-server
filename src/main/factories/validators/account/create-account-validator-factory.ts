import { FieldsValidationComposite, ValidatorComposite } from '@/validation/composites/index.js'
import {
  RegexValidator,
  TypeValidator
} from '@/validation/validators/index.js'

export function makeCreateAccountValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({
      name: 'string',
      email: 'string',
      password: 'string'
    }),
    new RegexValidator({
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    })
  )
}
