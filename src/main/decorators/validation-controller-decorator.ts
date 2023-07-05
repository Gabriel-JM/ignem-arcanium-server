import { Validator } from '@/common/validation/protocols/validator.ts'
import { badRequest } from '@/presentation/helpers/index.ts'
import { Controller, ControllerFN, HTTPResponse } from '@/presentation/protocols/index.ts'

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

export function validationControllerFNDecorator(
  controllerFn: ControllerFN,
  validator: Validator
) {
  return new ValidationControllerDecorator(validator, {
    handle: controllerFn
  })
}
