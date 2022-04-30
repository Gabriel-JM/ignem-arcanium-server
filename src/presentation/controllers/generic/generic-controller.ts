import { ok } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'

export class GenericController implements Controller {
  constructor(
    private readonly usecaseMethod: (...args: any[]) => Promise<unknown>,
    private readonly responseFunction = ok
  ) {}
  
  async handle(params: any): Promise<HTTPResponse> {
    const response = await this.usecaseMethod(params)

    return this.responseFunction(response)
  }
}
