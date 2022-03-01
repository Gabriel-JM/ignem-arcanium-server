import { ValidatorComposite } from '@/validation/composites'
import { RequiredFieldsValidator, TypeValidator } from '@/validation/validators'
import { CustomValidator } from '@/validation/validators/custom-validator'

export function makeUpdateTorchRegistryValidator() {
  const validator = new ValidatorComposite([
    new RequiredFieldsValidator([
      'id'
    ]),
    new TypeValidator({
      id: 'string',
      torchCount: ['string', 'number'],
      torchCharge: ['string', 'number'],
      isLit: 'boolean'
    }),
    new CustomValidator({
      torchCharge: {
        message: 'torchCharge must be in between 0 and 6',
        validationFn(value) {
          if (typeof value === 'string') {
            value = Number(value.substring(1))
          }

          return value >= 0 && value <= 6
        }
      }
    })
  ])

  return validator
}
