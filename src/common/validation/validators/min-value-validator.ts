import { Validator } from '@/common/validation/protocols/index.js'

export class MinValueValidator implements Validator {
  #fields: Record<string, number>
  
  constructor(
    fields: Record<string, number>
  ) {
    this.#fields = fields
  }
  
  validate(input: any): string[] {
    const invalidFields = Object.keys(this.#fields).filter(field => {
      const inputValue = input[field]
      const minValue = this.#fields[field]

      return inputValue < minValue
    })

    return invalidFields.map(field => {
      return `${field} must be greater or equal to ${this.#fields[field]}`
    })
  }  
}
