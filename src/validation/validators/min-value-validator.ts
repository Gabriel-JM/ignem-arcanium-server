import { Validator } from '@/validation/protocols'

export class MinValueValidator implements Validator {
  constructor(
    private readonly minValue: number,
    private readonly fields: string[]
  ) {}
  
  validate(input: any): string[] {
    const invalidFields = this.fields.filter(field => {
      const inputValue = input[field]

      return inputValue < this.minValue
    })

    return invalidFields.map(field => {
      return `${field} must be greater or equal to ${this.minValue}`
    })
  }  
}
