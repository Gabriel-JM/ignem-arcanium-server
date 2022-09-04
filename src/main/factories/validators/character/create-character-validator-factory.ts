import { ListValidationComposite, ValidatorComposite } from '@/validation/composites/index.js'
import {
  MinValueValidator,
  OneOfValuesValidator,
  RequiredFieldsValidator,
  TypeValidator
} from '@/validation/validators/index.js'

export function makeCreateCharacterValidator() {
  return new ValidatorComposite(
    new RequiredFieldsValidator(
      'name',
      'icon',
      'level',
      'gold',
      'alignment',
      'characterPoints',
      'hp',
      'mp',
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charism'
    ),
    new TypeValidator({
      name: 'string',
      icon: 'string',
      level: 'number',
      gold: 'number',
      alignment: 'string',
      characterPoints: 'number',
      description: 'string',
      hp: 'number',
      mp: 'number',
      strength: 'number',
      dexterity: 'number',
      constitution: 'number',
      intelligence: 'number',
      wisdom: 'number',
      charism: 'number',
      inventoryItems: 'array'
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
    }),
    new OneOfValuesValidator({
      alignment: [
        'Lawful Good',
        'Lawful Neutral',
        'Lawful Evil',
        'Neutral Good',
        'Neutral',
        'Neutral Evil',
        'Chaotic Good',
        'Chaotic Neutral',
        'Chaotic Evil'
      ]
    }),
    new ListValidationComposite(
      'inventoryItems',
      new RequiredFieldsValidator('itemId', 'quantity'),
      new TypeValidator({ itemId: 'string', quantity: 'number' }),
      new MinValueValidator({ quantity: 1 })
    )
  )
}
