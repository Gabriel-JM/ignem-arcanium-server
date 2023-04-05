import { Validator } from '@/common/validation/protocols/index.js'

export class ValueInBetweenValidator implements Validator {
  #fields: Record<string, [number, number]>

  constructor(
    fields: Record<string, [number, number]>
  ) {
    this.#fields = fields
  }
  
  validate(input: any): string[] {
    const invalidFields = Object.keys(this.#fields).filter(field => {
      const [min, max] = this.#fields[field]
      const value = input[field]
      const isInBetween = value >= min && value <= max

      return !isInBetween
    })

    return invalidFields.map(field => {
      const [min, max] = this.#fields[field]
      return `${field} must be in between ${min} and ${max}`
    })
  }
}
