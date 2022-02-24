import { badRequest, serverError } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'

export class ErrorHandlerControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}
  
  async handle(params: any): Promise<HTTPResponse> {
    try {
      return await this.controller.handle(params)
    } catch(err) {
      const error = err as Error
      const errorClassName = error?.constructor
        ? error.constructor.name
        : 'UnknownError'

      console.error(`[${errorClassName}]`, err)

      switch (errorClassName) {
        case 'InvalidTorchAdditionValueError':
          return badRequest({
            error: 'InvalidTorchAdditionValue',
            details: [error.message]
          })

        case 'NoTorchToBeLitError':
          return badRequest({
            error: 'NoTorchToBeLit',
            details: [error.message]
          })

        default:
          return serverError({
            error: 'InternalError',
            details: ['Unknown error']
          })
      }
    }
  }
}
