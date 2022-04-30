import { AccountNotFoundError } from '@/data/errors'
import { HashComparer } from '@/data/protocols/cryptography'
import { FindAccountByEmailRepository } from '@/data/protocols/repository'
import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/usecases'

export class DbAccountLogin implements AccountLogin {
  constructor(
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}
  
  async login(params: AccountLoginParams): Promise<AccountLoginResult> {
    const account = await this.findAccountByEmailRepository.findByEmail(params.email)

    if (!account) {
      throw new AccountNotFoundError()
    }

    const isEqual = await this.hashComparer.compare(params.password, account.password)

    if (!isEqual) {
      throw new AccountNotFoundError()
    }

    return {} as AccountLoginResult
  }
}
