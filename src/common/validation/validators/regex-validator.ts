import { Validator } from '@/common/validation/protocols/index.ts'

export class RegexValidator implements Validator {
  #fields: Record<string, RegExp>

  constructor(fields: Record<string, RegExp>) {
    this.#fields = fields
  }

  validate(input: any): string[] {
    const invalidFields = Object.keys(this.#fields).filter(field => {
      const inputValue = input[field]
      const regex = this.#fields[field]

      return !regex.test(inputValue)
    })

    return invalidFields.map(field => {
      return `${field} has an invalid format`
    })
  }
}
