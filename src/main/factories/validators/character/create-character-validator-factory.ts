import { ValidatorComposite } from '@/validation/composites'
import { RequiredFieldsValidator, TypeValidator } from '@/validation/validators'

export function makeCreateCharacterValidator() {
  return new ValidatorComposite([
    new RequiredFieldsValidator([
      'name',
      'icon',
      'level',
      'gold',
      'hp',
      'mp',
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charism'
    ]),
    new TypeValidator({
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
  ])
}
