import { CreateAccount } from '@/domain/usecases'
import { created } from '@/presentation/helpers'
import { Controller, HTTPResponse } from '@/presentation/protocols'

export class CreateAccountController implements Controller {
  constructor(private readonly createAccount: CreateAccount) {}
  
  async handle(params: any): Promise<HTTPResponse> {
    const accountId = await this.createAccount.create({
      name: params.name,
      email: params.email,
      password: params.password
    })

    
    
    return created({ accountId })
  }
}
