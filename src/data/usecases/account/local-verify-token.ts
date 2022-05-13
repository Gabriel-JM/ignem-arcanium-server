import { InvalidAccessTokenError } from '@/data/errors'
import { EncryptionVerifier } from '@/data/protocols/cryptography'
import { VerifyToken } from '@/domain/usecases'

export class LocalVerifyToken implements VerifyToken {
  constructor(private readonly encryptionVerifier: EncryptionVerifier) {}
  
  verify(token: string): void {
    const isValid = this.encryptionVerifier.verify(token)

    if (!isValid) {
      throw new InvalidAccessTokenError()
    }
  }
}
