import { Validator } from '@/common/validation/protocols/index.ts'

export class OneOfValuesValidator implements Validator {
  #fields: Record<string, unknown[]>
  
  constructor(
    fields: Record<string, unknown[]>
  ) {
    this.#fields = fields
  }
  
  validate(input: any): string[] {
    const invalidFields = Object
      .entries(this.#fields)
      .filter(([field, options]) => {
        const fieldValue = input[field]

        return !options.some(option => option === fieldValue)
      })

    return invalidFields.map(([field, options]) => {
      return `${field} must be one of these values: ${options.join(', ')}`
    })
  }
}
