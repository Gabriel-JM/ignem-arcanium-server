import { Validator } from '@/validation/protocols/index.js'

export class RequiredFieldsValidator implements Validator {
  #fields: string[]

  constructor(...fields: string[]) {
    this.#fields = fields
  }
  
  validate(input: any): string[] {
    const missingFields = this.#fields.filter(field => {
      return !(field in input)
    })
    
    return missingFields.map(field => `${field} is required`)
  }
}
