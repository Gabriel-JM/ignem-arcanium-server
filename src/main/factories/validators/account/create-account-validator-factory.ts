import { FieldsValidationComposite, ValidatorComposite } from '@/common/validation/composites/index.ts'
import { RegexValidator } from '@/common/validation/validators/index.ts'

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
