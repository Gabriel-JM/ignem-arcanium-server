import { AccountNotFoundError } from '@/data/errors'
import { FindAccountByEmailRepository } from '@/data/protocols/repository'
import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/usecases'

export class DbAccountLogin implements AccountLogin {
  constructor(
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository
  ) {}
  
  async login(params: AccountLoginParams): Promise<AccountLoginResult> {
    const account = await this.findAccountByEmailRepository.findByEmail(params.email)

    if (!account) {
      throw new AccountNotFoundError()
    }

    return {} as AccountLoginResult
  }
}
