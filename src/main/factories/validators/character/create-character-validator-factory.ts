import { ValidatorComposite } from '@/validation/composites'
import { MinValueValidator, RequiredFieldsValidator, TypeValidator } from '@/validation/validators'

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
  ])
}
