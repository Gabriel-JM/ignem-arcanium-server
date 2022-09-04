import { InvalidAccessTokenError } from '@/data/errors/index.js'
import { EncryptionVerifier } from '@/data/protocols/cryptography/index.js'
import { VerifyToken, VerifyTokenParams } from '@/domain/usecases/index.js'

export class LocalVerifyToken implements VerifyToken {
  #encryptionVerifier: EncryptionVerifier

  constructor(encryptionVerifier: EncryptionVerifier) {
    this.#encryptionVerifier = encryptionVerifier
  }
  
  verify({ token }: VerifyTokenParams): void {
    const isValid = this.#encryptionVerifier.verify(token)

    if (!isValid) {
      throw new InvalidAccessTokenError()
    }
  }
}
