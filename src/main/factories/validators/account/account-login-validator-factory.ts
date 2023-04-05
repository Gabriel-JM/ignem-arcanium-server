import { FieldsValidationComposite, ValidatorComposite } from '@/common/validation/composites/index.js'
import { RegexValidator } from '@/common/validation/validators/index.js'

export function makeAccountLoginValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({ email: 'string', password: 'string' }),
    new RegexValidator({ email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  )
}
