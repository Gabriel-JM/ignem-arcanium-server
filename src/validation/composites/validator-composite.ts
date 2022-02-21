import { Validator } from '@/validation/protocols'

export class ValidatorComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(input: any): string[] {
    const validationsResults = this.validators.map(validator => {
      return validator.validate(input)
    })

    return validationsResults.flat()
  }
}
