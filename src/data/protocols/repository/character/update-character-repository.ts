import { UpdateCharacterParams } from '@/domain/usecases'

export type UpdateCharacterRepositoryParams = UpdateCharacterParams

export interface UpdateCharacterRepository {
  update(params: UpdateCharacterRepositoryParams): Promise<void>
}
