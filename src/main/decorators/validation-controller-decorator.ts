import { badRequest } from '@/presentation/helpers/index.js'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.js'
import { Validator } from '@/validation/protocols/index.js'

export class ValidationControllerDecorator implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly controller: Controller
  ) {}
  
  async handle(params: any): Promise<HTTPResponse> {
    const validationErrors = this.validator.validate(params)

    if (validationErrors.length) {
      return badRequest({
        error: {
          name: 'Validation Error',
          details: validationErrors
        }
      })
    }

    return await this.controller.handle(params)
  }
}
