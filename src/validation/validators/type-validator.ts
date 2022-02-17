import { Validator } from '@/validation/protocols'

export class TypeValidator implements Validator {
  constructor(private readonly fields: Record<string, string>) {}
  
  validate(input: any): string[] {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const value = input[field]
      const type = this.fields[field]

      if (type === 'array') {
        return !Array.isArray(value)
      }

      return !(typeof value === type)
    })

    return invalidFields.map(field => {
      const type = this.fields[field]

      return `${field} must be of type ${type}`
    })
  }
}
