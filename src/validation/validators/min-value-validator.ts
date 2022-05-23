import { Validator } from '@/validation/protocols'

export class MinValueValidator implements Validator {
  constructor(
    private readonly fields: Record<string, number>
  ) {}
  
  validate(input: any): string[] {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const inputValue = input[field]
      const minValue = this.fields[field]

      return inputValue < minValue
    })

    return invalidFields.map(field => {
      return `${field} must be greater or equal to ${this.fields[field]}`
    })
  }  
}
