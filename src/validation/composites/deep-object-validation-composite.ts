import { ValidatorComposite } from '@/validation/composites/validator-composite.js'
import { Validator } from '@/validation/protocols/validator.js'

export class DeepObjectValidationComposite implements Validator {
  #pathName: string
  #validators: Validator[]

  constructor(pathName: string, ...validators: Validator[]) {
    this.#pathName = pathName
    this.#validators = validators
  }
  
  validate(input: any): string[] {
    const nestedInput = this.getValueByPath(input, this.#pathName)

    const result = new ValidatorComposite(...this.#validators)
      .validate(nestedInput)

    return result.map(message => `${this.#pathName}.${message}`)
  }

  getValueByPath(input: any, path: string) {
    return path
      .split('.')
      .reduce((acc, value) => acc[value], input)
  }
}
