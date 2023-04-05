import { Validator } from '../protocols/validator.js'
import { RequiredFieldsValidator } from '../validators/required-fields-validator.js'
import { TypeValidator } from '../validators/type-validator.js'

export class FieldsValidationComposite implements Validator {
  #fields: Record<string, string>

  constructor(fields: Record<string, string>) {
    this.#fields = fields
  }
  
  validate(input: any): string[] {
    const requiredFields = Object
      .entries(this.#fields)
      .filter(([_, value]) => !value.endsWith('?'))
      .map(([key]) => key)

    const requiredFieldsValidator = new RequiredFieldsValidator(
      ...requiredFields
    )

    const fieldsTypes = Object.keys(this.#fields).reduce((acc, key) => {
      if (this.#fields[key].endsWith('?') && input?.[key] === undefined) {
        return { ...acc }
      }

      return {
        ...acc,
        [key]: this.#fields[key].replace(/\?/g, '')
      }
    }, {})

    const typeValidator = new TypeValidator(fieldsTypes)

    return [
      ...requiredFieldsValidator.validate(input),
      ...typeValidator.validate(input)
    ]
  }
}
