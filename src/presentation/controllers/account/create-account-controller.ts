import { CreateAccount } from '@/domain/usecases/index.js'
import { created } from '@/presentation/helpers/index.js'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.js'

export class CreateAccountController implements Controller {
  #createAccount: CreateAccount
  
  constructor(createAccount: CreateAccount) {
    this.#createAccount = createAccount
  }
  
  async handle(params: any): Promise<HTTPResponse> {
    const accessCredentials = await this.#createAccount.create({
      name: params.name,
      email: params.email,
      password: params.password
    })

    return created(accessCredentials)
  }
}
