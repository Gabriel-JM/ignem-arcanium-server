import { ValidatorComposite } from '@/validation/composites/index.js'
import {
  RequiredFieldsValidator,
  TypeValidator,
  ValueInBetweenValidator
} from '@/validation/validators/index.js'

export function makeCreateTorchRegistryValidator() {
  const validator = new ValidatorComposite(
    new RequiredFieldsValidator(
      'characterName',
      'torchCount',
      'torchCharge',
      'isLit'
    ),
    new TypeValidator({
      characterName: 'string',
      torchCount: 'number',
      torchCharge: 'number',
      isLit: 'boolean'
    }),
    new ValueInBetweenValidator({
      torchCharge: [0, 6]
    })
  )

  return validator
}
