import { InvalidAccessTokenError } from '@/data/errors/index.js'
import { Decrypter } from '@/data/protocols/cryptography/index.js'
import { FindAccountByIdRepository } from '@/data/protocols/repository/index.js'
import { LoadAccountByToken, LoadAccountByTokenResult } from '@/domain/usecases/index.js'

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
