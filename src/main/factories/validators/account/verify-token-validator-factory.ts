import { FieldsValidationComposite, ValidatorComposite } from '@/common/validation/composites/index.ts'

export function makeVerifyTokenValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({ token: 'string' })
  )
}