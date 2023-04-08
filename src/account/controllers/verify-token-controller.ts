import { InvalidAccessTokenError } from '@/data/errors/index.js'
import { EncryptionVerifier } from '@/data/protocols/cryptography/index.js'
import { noContent } from '@/presentation/helpers/index.js'
import { Controller } from '@/presentation/protocols/index.js'

export interface VerifyTokenParams {
  token: string
}

export class VerifyTokenController implements Controller {
  #encryptionVerifier: EncryptionVerifier

  constructor(encryptionVerifier: EncryptionVerifier) {
    this.#encryptionVerifier = encryptionVerifier
  }
  
  handle({ token }: VerifyTokenParams) {
    const isValid = this.#encryptionVerifier.verify(token)

    if (!isValid) {
      throw new InvalidAccessTokenError()
    }

    return Promise.resolve(noContent())
  }
}
