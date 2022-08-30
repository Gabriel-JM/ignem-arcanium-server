import { ValidatorComposite } from '@/validation/composites'
import {
  RequiredFieldsValidator,
  TypeValidator,
  ValueInBetweenValidator
} from '@/validation/validators'

export function makeCreateTorchRegistryValidator() {
  const validator = new ValidatorComposite([
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
  ])

  return validator
}
