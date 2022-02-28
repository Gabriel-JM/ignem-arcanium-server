import { Validator } from '@/validation/protocols'

export interface CustomValidatorRecord {
  message: string
  validationFn: (value: any) => boolean
}

export class CustomValidator implements Validator {
  constructor(private readonly fields: Record<string, CustomValidatorRecord>) {}
  
  validate(input: any) {
    const invalidFields = Object.keys(this.fields).filter(field => {
      const { validationFn } = this.fields[field]
      const value = input[field]
      
      return !validationFn(value)
    })

    return invalidFields.map(field => this.fields[field].message)
  }
}
