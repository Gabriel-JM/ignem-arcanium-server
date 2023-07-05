import { LoadAccountByTokenController } from '@/account/controllers/index.ts'
import { InvalidAccessTokenError } from '@/data/errors/index.ts'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.ts'

interface AuthControllerDecoratorParams {
  authorization: string
}

export class AuthControllerDecorator implements Controller {
  constructor(
    private readonly loadAccountByToken: LoadAccountByTokenController,
    private readonly controller: Controller
  ) {}

  async handle(params: AuthControllerDecoratorParams): Promise<HTTPResponse> {
    const { authorization } = params

    if (!authorization?.startsWith('Bearer ')) {
      throw new InvalidAccessTokenError()
    }

    const token = authorization.substring('Bearer '.length)

    const { body: account } = await this.loadAccountByToken.handle(token)

    return await this.controller.handle({
      ...params,
      accountId: account.id
    })
  }
}
