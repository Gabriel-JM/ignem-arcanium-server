import { UpdateCharacterRepository } from '@/data/protocols/repository/index.ts'
import { UpdateCharacter, UpdateCharacterParams } from '@/domain/usecases/index.ts'

export class DbUpdateCharacter implements UpdateCharacter {
  #updateCharacterRepository: UpdateCharacterRepository

  constructor(updateCharacterRepository: UpdateCharacterRepository) {
    this.#updateCharacterRepository = updateCharacterRepository
  }
  
  async update(params: UpdateCharacterParams): Promise<void> {
    await this.#updateCharacterRepository.update({
      ...params
    })
  }
}
