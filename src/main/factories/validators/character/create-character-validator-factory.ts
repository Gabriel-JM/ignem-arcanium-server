import { MinValueValidator, OneOfValuesValidator } from '@/common/validation/validators/index.js'
import {
  FieldsValidationComposite,
  ListValidationComposite,
  NestedObjectValidationComposite,
  ValidatorComposite
} from '@/common/validation/composites/index.js'

export function makeCreateCharacterValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({
      name: 'string',
      icon: 'string',
      level: 'number',
      gold: 'number',
      alignment: 'string',
      characterPoints: 'number',
      description: 'string?',
      strength: 'number',
      dexterity: 'number',
      constitution: 'number',
      intelligence: 'number',
      wisdom: 'number',
      charisma: 'number',
      equipment: 'object?',
      inventoryItems: 'array?'
    }),
    new MinValueValidator({
      level: 1,
      gold: 0,
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
    new NestedObjectValidationComposite(
      'equipment',
      new FieldsValidationComposite({
        leftHand: 'string?',
        rightHand: 'string?',
        armor: 'string?',
        accessory1: 'string?',
        accessory2: 'string?'
      })
    ),
    new ListValidationComposite(
      'inventoryItems',
      new FieldsValidationComposite({ itemId: 'string', quantity: 'number' }),
      new MinValueValidator({ quantity: 1 })
    )
  )
}
