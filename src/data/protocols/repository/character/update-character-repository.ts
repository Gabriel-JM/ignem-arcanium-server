import { UpdateCharacterParams } from '@/domain/usecases/index.ts'

export type UpdateCharacterRepositoryParams = UpdateCharacterParams

export interface UpdateCharacterRepository {
  update(params: UpdateCharacterRepositoryParams): Promise<void>
}
