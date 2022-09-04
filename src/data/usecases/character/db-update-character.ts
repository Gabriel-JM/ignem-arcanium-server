import { UpdateCharacterRepository } from '@/data/protocols/repository/index.js'
import { UpdateCharacter, UpdateCharacterParams } from '@/domain/usecases/index.js'

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
