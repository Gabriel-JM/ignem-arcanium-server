import { ValidatorComposite } from '@/validation/composites/index.js'
import { MinValueValidator, RequiredFieldsValidator, TypeValidator } from '@/validation/validators/index.js'

export function makeUpdateCharacterValidator() {
  return new ValidatorComposite(
    new RequiredFieldsValidator('accountId'),
    new TypeValidator({
      accountId: 'string',
      name: 'string',
      icon: 'string',
      level: 'number',
      gold: 'number',
      hp: 'number',
      mp: 'number',
      strength: 'number',
      dexterity: 'number',
      constitution: 'number',
      intelligence: 'number',
      wisdom: 'number',
      charism: 'number'
    }),
    new MinValueValidator({
      level: 1,
      gold: 0,
      hp: 10,
      mp: 10,
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charism: 1
    })
  )
}
