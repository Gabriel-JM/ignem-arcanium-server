import { Validator } from '@/validation/protocols'

export class OneOfValuesValidator implements Validator {
  constructor(
    private readonly fields: Record<string, unknown[]>
  ) {}
  
  validate(input: any): string[] {
    const invalidFields = Object
      .entries(this.fields)
      .filter(([field, options]) => {
        const fieldValue = input[field]

        return !options.some(option => option === fieldValue)
      })

    return invalidFields.map(([field, options]) => {
      return `${field} must be one of these values: ${options.join(', ')}`
    })
  }
}
