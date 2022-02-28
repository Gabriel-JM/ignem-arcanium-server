import { Validator } from '@/validation/protocols'

export class TypeValidator implements Validator {
  constructor(private readonly fields: Record<string, string | string[]>) {}
  
  validate(input: any): string[] {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const value = input[field]
      const fieldValue = this.fields[field]
      const types = !Array.isArray(fieldValue) ? [fieldValue] : fieldValue

      const isInvalid = types.every(type => {
        if (type === 'array') {
          return !Array.isArray(value)
        }
  
        return !(typeof value === type)
      })

      return isInvalid
    })

    return invalidFields.map(field => {
      const fieldValue = this.fields[field]
      const isArray = Array.isArray(fieldValue)
      const types = isArray ? fieldValue.join(', ') : fieldValue

      return `${field} must be ${isArray ? 'one of types:' : 'of type'} ${types}`
    })
  }
}
