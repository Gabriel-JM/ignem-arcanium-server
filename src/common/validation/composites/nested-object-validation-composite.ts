import { Validator } from '../protocols/validator.js'
import { ValidatorComposite } from './validator-composite.js'

export class NestedObjectValidationComposite implements Validator {
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
