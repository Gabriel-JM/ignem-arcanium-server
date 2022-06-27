import { UpdateCharacterRepository } from '@/data/protocols/repository'
import { UpdateCharacter, UpdateCharacterParams } from '@/domain/usecases'

export class DbUpdateCharacter implements UpdateCharacter {
  constructor(private readonly updateCharacterRepository: UpdateCharacterRepository) {}
  
  async update(params: UpdateCharacterParams): Promise<void> {
    await this.updateCharacterRepository.update({
      ...params
    })
  }
}
