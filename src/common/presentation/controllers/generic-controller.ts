import { ok } from '@/presentation/helpers/index.js'
import { Controller, HTTPResponse } from '../protocols/index.js'

export class GenericController implements Controller {
  #usecaseMethod: (...args: any[]) => Promise<unknown>
  #responseFunction: (data?: unknown) => { statusCode: number, body: unknown }
  
  constructor(
    usecaseMethod: (...args: any[]) => Promise<unknown>,
    responseFunction = ok
  ) {
    this.#usecaseMethod = usecaseMethod
    this.#responseFunction = responseFunction
  }
  
  async handle(params: any): Promise<HTTPResponse> {
    const response = await this.#usecaseMethod(params)

    return this.#responseFunction(response)
  }
}
