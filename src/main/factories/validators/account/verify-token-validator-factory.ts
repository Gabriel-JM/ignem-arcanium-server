import { FieldsValidationComposite, ValidatorComposite } from '@/validation/composites/index.js'

export function makeVerifyTokenValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({ token: 'string' })
  )
}