import { FieldsValidationComposite, ValidatorComposite } from '@/common/validation/composites/index.ts'
import { RegexValidator } from '@/common/validation/validators/index.ts'

export function makeAccountLoginValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({ email: 'string', password: 'string' }),
    new RegexValidator({ email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  )
}
