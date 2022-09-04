import { UpdateCharacterParams } from '@/domain/usecases/index.js'

export type UpdateCharacterRepositoryParams = UpdateCharacterParams

export interface UpdateCharacterRepository {
  update(params: UpdateCharacterRepositoryParams): Promise<void>
}
