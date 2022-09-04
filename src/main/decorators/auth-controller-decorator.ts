import { InvalidAccessTokenError } from '@/data/errors/index.js'
import { LoadAccountByToken } from '@/domain/usecases/index.js'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.js'

interface AuthControllerDecoratorParams {
  authorization: string
}

export class AuthControllerDecorator implements Controller {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly controller: Controller
  ) {}

  async handle(params: AuthControllerDecoratorParams): Promise<HTTPResponse> {
    const { authorization } = params;

    if (!authorization?.startsWith('Bearer ')) {
      throw new InvalidAccessTokenError()
    }

    const token = authorization.substring('Bearer '.length)

    const account = await this.loadAccountByToken.load(token)

    return await this.controller.handle({
      ...params,
      accountId: account.id
    })
  }
}
