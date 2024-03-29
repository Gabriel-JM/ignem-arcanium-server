import { Controller, ControllerFN, HTTPResponse } from '@/common/presentation/protocols/index.js'
import { badRequest, notFound, serverError } from '@/presentation/helpers/index.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index.js'

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
      const [errorClassName, error] = this.#sanitizeErrorDetails(err as Error)

      if (process.env.SHOW_LOGS === 'true') {
        this.#logError(errorClassName, error)
      }

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

  #sanitizers: Record<string, (err: Error) => void> = {
    DatabaseError(err: Error) {
      const error = err as Error & { detail: string, details: string[] }

      error.name = 'DataError'
      error.details = [error.detail]
    },
    [PrismaClientKnownRequestError.name](err: PrismaClientKnownRequestError & ApplicationError) {
      const cause = String(err.meta?.cause ?? '')

      if (cause.includes('not exist') || cause.includes('not found')) {
        err.name = 'NotFoundError'
        err.type = 'Search'
        err.details = ['Register not found']
        return
      }

      err.name = 'InternalError'
      err.details = ['Internal error. Try again later']
    }
  }

  #sanitizeErrorDetails(err: Error): [string, ApplicationError] {
    const errorClassName = err?.constructor
      ? err.constructor.name
      : 'UnknownError'

    if ((errorClassName in this.#sanitizers)) {
      this.#sanitizers[errorClassName](err)
    }

    return [errorClassName, err as ApplicationError]
  }

  #logError(className: string, err: Error) {
    const { stack, ...errData } = err

    Reflect.deleteProperty(errData, 'type')

    const [
      message = 'No message',
      at = 'at ?'
    ] = stack?.split('\n') ?? []

    console.log(`[${className}]`, message)
    console.log(` ${at}`, errData)
  }
}

export function errorHandlerControllerFNDecorator(controllerFn: ControllerFN) {
  return new ErrorHandlerControllerDecorator({
    handle: controllerFn
  })
}
