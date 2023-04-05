import { FieldsValidationComposite, ValidatorComposite } from '@/common/validation/composites/index.js'

export function makeVerifyTokenValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({ token: 'string' })
  )
}