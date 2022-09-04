import { Validator } from '@/validation/protocols/index.js'

export interface CustomValidatorRecord {
  message: string
  validationFn: (value: any) => boolean
}

export class CustomValidator implements Validator {
  #fields: Record<string, CustomValidatorRecord>

  constructor(fields: Record<string, CustomValidatorRecord>) {
    this.#fields = fields
  }
  
  validate(input: any) {
    const invalidFields = Object.keys(this.#fields).filter(field => {
      const { validationFn } = this.#fields[field]
      const value = input[field]
      
      return !validationFn(value)
    })

    return invalidFields.map(field => this.#fields[field].message)
  }
}
