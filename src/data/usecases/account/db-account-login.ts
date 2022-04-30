import { FindAccountByEmailRepository } from '@/data/protocols/repository'
import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/usecases'

export class DbAccountLogin implements AccountLogin {
  constructor(private readonly findAccountByEmailRepository: FindAccountByEmailRepository) {}
  
  async login(params: AccountLoginParams): Promise<AccountLoginResult> {
    await this.findAccountByEmailRepository.findByEmail(params.email)

    return {} as AccountLoginResult
  }
}
