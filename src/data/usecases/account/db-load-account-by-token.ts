import { InvalidAccessTokenError } from '@/data/errors'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByToken, LoadAccountByTokenResult } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}
  
  async load(token: string): Promise<LoadAccountByTokenResult> {
    const accountData = await this.decrypter.decrypt(token)

    if (!accountData) {
      throw new InvalidAccessTokenError()
    }

    return Promise.resolve({}) as Promise<LoadAccountByTokenResult>
  }
}
