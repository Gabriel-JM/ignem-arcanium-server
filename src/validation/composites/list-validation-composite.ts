import { Validator } from '@/validation/protocols/index.js'

export class ListValidationComposite implements Validator {
  #listName: string
  #validators: Validator[]
  
  constructor(listName: string, ...validators: Validator[]) {
    this.#listName = listName
    this.#validators = validators
  }

  validate(input: any): string[] {
    const list = input[this.#listName]

    for (const inputIndex in list) {
      const input = list[inputIndex]

      const validationsResults = this.#validators.map(validator => {
        return validator.validate(input)
      }).flat()
  
      const invalidFields = new Set(validationsResults.map(error => {
        return error.split(' ')[0]
      }))

      if (invalidFields.size) {
        return [...invalidFields].map(key => {
          const errors = validationsResults.filter(error => {
            return key === error.split(' ')[0]
          })

          return errors.map(
            error => `${this.#listName}[${inputIndex}].${error}`
          )
        }).flat()
      }
    }

    return []
  }
}
