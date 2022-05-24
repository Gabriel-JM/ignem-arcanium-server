import { InvalidAccessTokenError } from '@/data/errors'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { FindAccountByIdRepository } from '@/data/protocols/repository'
import { LoadAccountByToken, LoadAccountByTokenResult } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly findAccountByIdRepository: FindAccountByIdRepository
  ) {}
  
  async load(token: string): Promise<LoadAccountByTokenResult> {
    const accountData = await this.decrypter.decrypt<Record<'id', string>>(token)

    if (!accountData) {
      throw new InvalidAccessTokenError()
    }

    const account = await this.findAccountByIdRepository.findById(accountData.id)

    if (!account) {
      throw new InvalidAccessTokenError()
    }

    return account
  }
}
