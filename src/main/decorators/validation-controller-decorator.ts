import { badRequest } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'
import { Validator } from '@/validation/protocols'

export class ValidationControllerDecorator implements Controller {
  constructor(
    private readonly validator: Validator,
    private readonly controller: Controller
  ) {}
  
  async handle(params: any): Promise<HTTPResponse> {
    const validationErrors = this.validator.validate(params)

    if (validationErrors.length) {
      return badRequest({
        error: 'Validation Error',
        details: validationErrors
      })
    }

    return await this.controller.handle(params)
  }
}
