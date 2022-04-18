import { Validator } from '@/validation/protocols'

export class RegexValidator implements Validator {
  constructor(private readonly fields: Record<string, RegExp>) {}

  validate(input: any): string[] {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const inputValue = input[field]
      const regex = this.fields[field]

      return !regex.test(inputValue)
    })

    return invalidFields.map(field => {
      return `${field} has an invalid format`
    })
  }
}
