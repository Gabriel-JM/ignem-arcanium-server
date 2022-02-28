import { badRequest, notFound, serverError } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'

interface ApplicationError extends Error {
  type: string
  details?: string[]
}

const errorTypesToResponseTypes: Record<string, (data: any) => HTTPResponse> = {
  Search: notFound,
  BusinessRule: badRequest,
  unknown: serverError
}

export class ErrorHandlerControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}
  
  async handle(params: any): Promise<HTTPResponse> {
    try {
      return await this.controller.handle(params)
    } catch(err) {
      const error = err as ApplicationError
      const errorClassName = error?.constructor
        ? error.constructor.name
        : 'UnknownError'

      process.env.SHOW_LOGS === 'true' && console.error(`[${errorClassName}]`, err)

      const responseType = errorTypesToResponseTypes[error.type]
        ?? errorTypesToResponseTypes.unknown

      return responseType({
        error: {
          name: error.name,
          details: error.details ?? [error.message]
        }
      })
    }
  }
}
