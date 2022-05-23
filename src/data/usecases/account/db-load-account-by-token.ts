import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByToken, LoadAccountByTokenResult } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}
  
  load(token: string): Promise<LoadAccountByTokenResult> {
    this.decrypter.decrypt(token)

    return Promise.resolve({}) as Promise<LoadAccountByTokenResult>
  }
}
