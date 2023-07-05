import { InvalidAccessTokenError } from '@/data/errors/index.ts'
import { EncryptionVerifier } from '@/data/protocols/cryptography/index.ts'
import { noContent } from '@/presentation/helpers/index.ts'
import { Controller } from '@/presentation/protocols/index.ts'

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
