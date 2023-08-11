import { InvalidAccessTokenError } from '@/data/errors/index.js'
import { Decrypter } from '@/data/protocols/cryptography/index.js'
import { FindAccountByIdRepository } from '@/data/protocols/repository/index.js'
import { ok } from '@/presentation/helpers/index.js'
import { Controller } from '@/common/presentation/protocols/index.js'

export class LoadAccountByTokenController implements Controller {
  #decrypter: Decrypter
  #findAccountByIdRepository: FindAccountByIdRepository

  constructor(
    decrypter: Decrypter,
    findAccountByIdRepository: FindAccountByIdRepository
  ) {
    this.#decrypter = decrypter
    this.#findAccountByIdRepository = findAccountByIdRepository
  }
  
  async handle(token: string) {
    const accountData = await this.#decrypter.decrypt<Record<'id', string>>(token)

    if (!accountData) {
      throw new InvalidAccessTokenError()
    }

    const account = await this.#findAccountByIdRepository.findById(accountData.id)

    if (!account) {
      throw new InvalidAccessTokenError()
    }

    return ok(account)
  }
}
