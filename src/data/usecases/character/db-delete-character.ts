import { NotFoundError } from '@/data/errors/index.ts'
import { CheckCharacterRepository, DeleteCharacterRepository } from '@/data/protocols/repository/index.ts'
import { DeleteCharacter, DeleteCharacterParams } from '@/domain/usecases/index.ts'

export class DbDeleteCharacter implements DeleteCharacter {
  #checkCharacterRepository: CheckCharacterRepository
  #deleteCharacterRepository: DeleteCharacterRepository  
  
  constructor (
    checkCharacterRepository: CheckCharacterRepository,
    deleteCharacterRepository: DeleteCharacterRepository
  ) {
    this.#checkCharacterRepository = checkCharacterRepository
    this.#deleteCharacterRepository = deleteCharacterRepository
  }
  
  async delete(params: DeleteCharacterParams): Promise<void> {
    const existsCharacter = await this.#checkCharacterRepository.check({
      id: params.id,
      accountId: params.accountId
    })

    if (!existsCharacter) {
      throw new NotFoundError('Character')
    }

    await this.#deleteCharacterRepository.delete({
      id: params.id,
      accountId: params.accountId
    })
  }
}
