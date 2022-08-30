import { Validator } from '@/validation/protocols'

export class ValidatorComposite implements Validator {
  readonly #validators: Validator[]

  constructor(...validators: Validator[]) {
    this.#validators = validators
  }

  validate(input: any): string[] {
    const validationsResults = this.#validators.map(validator => {
      return validator.validate(input)
    }).flat()

    const invalidFields = new Set(validationsResults.map(error => {
      return error.split(' ')[0]
    }))

    return [...invalidFields].map(key => {
      return validationsResults.filter(error => {
        return key === error.split(' ')[0]
      })
    }).flat()
  }
}
