import { NotFoundError } from '@/data/errors'
import { CheckCharacterRepository, DeleteCharacterRepository } from '@/data/protocols/repository'
import { DeleteCharacter, DeleteCharacterParams } from '@/domain/usecases'

export class DbDeleteCharacter implements DeleteCharacter {
  constructor (
    private readonly checkCharacterRepository: CheckCharacterRepository,
    private readonly deleteCharacterRepository: DeleteCharacterRepository
  ) {}
  
  async delete(params: DeleteCharacterParams): Promise<void> {
    const existsCharacter = await this.checkCharacterRepository.check({
      id: params.id,
      accountId: params.accountId
    })

    if (!existsCharacter) {
      throw new NotFoundError('Character')
    }

    await this.deleteCharacterRepository.delete({
      id: params.id,
      accountId: params.accountId
    })
  }
}
