import { Validator } from '@/validation/protocols/validator.js'
import { RequiredFieldsValidator, TypeValidator } from '@/validation/validators/index.js'

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
      if (this.#fields[key].endsWith('?') && !(input?.[key])) {
        return { ...acc }
      }

      return {
        ...acc,
        [key]: this.#fields[key].replace(/\?/g, '')
      }
    }, {})

    const typeValidator = new TypeValidator(fieldsTypes)

    const re = [
      ...requiredFieldsValidator.validate(input),
      ...typeValidator.validate(input)
    ]

    console.log({ input, fields: this.#fields, fieldsTypes, re })

    return re
  }
}
